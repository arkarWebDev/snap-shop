import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { loginSchema } from "@/types/login-schema";
import { eq } from "drizzle-orm";
import { accounts, users } from "./schema";
import bcrypt from "bcrypt";
import Stripe from "stripe";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db) as any,
  secret: process.env.NEXTAUTH_SECRET!,
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (session && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }
      if (session) {
        session.user.isTwofactorEnabled = token.isTwofactorEnabled as boolean;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.isOauth = token.isOauth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, token.sub),
      });
      if (!existingUser) return token;
      const existingAccount = await db.query.accounts.findFirst({
        where: eq(accounts.userId, existingUser.id),
      });

      token.isOauth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;
      token.role = existingUser.role;
      token.isTwofactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      authorize: async (credentials) => {
        const validatedData = loginSchema.safeParse(credentials);

        if (validatedData.success) {
          const { email, password } = validatedData.data;

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (!user || !password) return null;

          const isMatch = await bcrypt.compare(password, user.password!);

          if (isMatch) return user;
        }
        return null;
      },
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      console.log("auth event log");

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2024-11-20.acacia",
      });
      const customer = await stripe.customers.create({
        email: user.email!,
        name: user.name!,
      });
      await db
        .update(users)
        .set({ customerId: customer.id })
        .where(eq(users.id, user.id!));
    },
  },
});

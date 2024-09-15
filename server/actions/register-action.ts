"use server";

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "./safe-action";

import bcrypt from "bcrypt";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVericificationToken } from "./tokens";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    // check user exist
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        // generate verification token for email expxires in 30 minutes
        const verificationToken = await generateEmailVericificationToken(email);
        // send verification email

        return { success: "Email verification resent." };
      }
      return { error: "Email is already exists." };
    }

    // record user
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    // generate verification token for email expxires in 30 minutes
    const verificationToken = await generateEmailVericificationToken(email);
    // send verification email
    console.log(verificationToken);

    // send verification email
    return { success: "Email verification sent." };
  });

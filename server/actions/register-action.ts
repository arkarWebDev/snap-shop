"use server";

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "./safe-action";

import bcrypt from "bcrypt";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // check user exist
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        // send verification email

        return { success: "Email verification sent" };
      }
      return { error: "Email is already exists." };
    }

    // create user

    // send verification email
    return { success: "Email verification sent to your email." };
  });

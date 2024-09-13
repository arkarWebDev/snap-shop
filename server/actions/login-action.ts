"use server";

import { loginSchema } from "@/types/login-schema";
import { actionClient } from "./safe-action";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    console.log("i am server action => ", email, password);

    return {
      success: { email, password },
    };
  });

"use server";

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "./safe-action";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    console.log(email, password, name);

    return {
      success: { email, password, name },
    };
  });

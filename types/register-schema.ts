import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(4, {
    message: "Please enter a valid name.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

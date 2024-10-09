import * as z from "zod";

export const settingsSchema = z.object({
  name: z.string().min(4, {
    message: "Please enter at least 4 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export const twoFactorSchema = z.object({
  isTwoFactorEnabled: z.boolean(),
  email: z.string().email(),
});

export const avatarSchema = z.object({
  image: z
    .string()
    .url({
      message: "Please enter a valid image url.",
    })
    .optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

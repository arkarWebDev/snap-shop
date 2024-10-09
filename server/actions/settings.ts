"use server";

import {
  avatarSchema,
  settingsSchema,
  twoFactorSchema,
} from "@/types/settings-schema";
import { actionClient } from "./safe-action";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { revalidatePath } from "next/cache";

export const updateDisplayName = actionClient
  .schema(settingsSchema)
  .action(async ({ parsedInput: { name, email } }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return { error: "User not found" };
    }
    await db.update(users).set({ name }).where(eq(users.email, email));
    revalidatePath("/dashboard/settings");
    return { success: "Display name updated" };
  });

export const twoFactorToogler = actionClient
  .schema(twoFactorSchema)
  .action(async ({ parsedInput: { isTwoFactorEnabled, email } }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return { error: "Something went wrong" };
    }

    await db
      .update(users)
      .set({ isTwoFactorEnabled })
      .where(eq(users.email, email));

    revalidatePath("/dashboard/settings");
    return { success: "2FA Setting Saved" };
  });

export const profileAvatarUpdate = actionClient
  .schema(avatarSchema)
  .action(async ({ parsedInput: { image, email } }) => {
    if (!image) {
      return { error: "Image is required" };
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return { error: "Something went wrong" };
    }

    await db.update(users).set({ image }).where(eq(users.email, email));

    revalidatePath("/dashboard/settings");
    return { success: "Profile image updated" };
  });

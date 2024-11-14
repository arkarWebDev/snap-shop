"use server";

import { VariantSchema } from "@/types/variant-schema";
import { actionClient } from "./safe-action";
import { db } from "..";
import {
  products,
  productVariants,
  variantImages,
  variantTags,
} from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createVariant = actionClient
  .schema(VariantSchema)
  .action(
    async ({
      parsedInput: {
        color,
        tags,
        id,
        variantImages: vImgs,
        editMode,
        productID,
        productType,
      },
    }) => {
      try {
        if (editMode && id) {
          console.log("update variant");
        }

        if (!editMode) {
          const variant = await db
            .insert(productVariants)
            .values({
              color,
              productType,
              productID,
            })
            .returning();
          const product = await db.query.products.findFirst({
            where: eq(products.id, productID),
          });
          await db.insert(variantTags).values(
            tags.map((tag) => {
              return {
                tag,
                variantID: variant[0].id,
              };
            })
          );
          await db.insert(variantImages).values(
            vImgs.map((img, index) => {
              return {
                image_url: img.url,
                size: img.size.toString(),
                name: img.name,
                variantID: variant[0].id,
                order: index,
              };
            })
          );
          revalidatePath("/dashboard/products");
          return { success: `${product?.title}'s variants added.` };
        }
      } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
      }
    }
  );

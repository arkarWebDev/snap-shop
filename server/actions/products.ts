import { ProductSchema } from "@/types/product-schema";
import { actionClient } from "./safe-action";
import { db } from "@/server";
import { products } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateProduct = actionClient
  .schema(ProductSchema)
  .action(async ({ parsedInput: { id, description, price, title } }) => {
    try {
      if (id) {
        const existingProduct = await db.query.products.findFirst({
          where: eq(products.id, id),
        });
        if (!existingProduct) return { error: "Product not found" };

        await db
          .update(products)
          .set({ description, price, title })
          .where(eq(products.id, id));
        revalidatePath("/dashboard/products");
        return { success: `${title} updated successfully.` };
      } else {
        const product = await db
          .insert(products)
          .values({ description, price, title })
          .returning();
        revalidatePath("/dashboard/products");

        return { success: `${product[0].title} created successfully.` };
      }
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong" };
    }
  });
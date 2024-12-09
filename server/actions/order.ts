"use server";

import { careateOrderSchema } from "@/types/order-schema";
import { actionClient } from "./safe-action";
import { auth } from "../auth";
import { db } from "..";
import { orderProduct, orders } from "../schema";

export const createOrder = actionClient
  .schema(careateOrderSchema)
  .action(async ({ parsedInput: { products, totalPrice, status } }) => {
    const session = await auth();
    if (!session) return { error: "You need to be logged in" };

    const order = await db
      .insert(orders)
      .values({
        status,
        total: totalPrice,
        userID: session.user.id as string,
      })
      .returning();

    products.map(async ({ productId, quantity, variantId }) => {
      await db.insert(orderProduct).values({
        quantity,
        productID: productId,
        productVariantID: variantId,
        orderID: order[0].id,
      });
    });
    return { success: "Order added." };
  });

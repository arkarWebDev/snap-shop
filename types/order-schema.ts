import * as z from "zod";

export const careateOrderSchema = z.object({
  totalPrice: z.number(),
  status: z.enum(["pending", "completed", "cancelled"]),
  paymentId: z.string(),
  products: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number(),
      variantId: z.number(),
    })
  ),
});

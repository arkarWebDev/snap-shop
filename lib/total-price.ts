import { CartItem } from "@/store/cart-store";

export const totalPriceCalc = (cartItem: CartItem[]): number => {
  return cartItem.reduce((tot, item) => {
    const price = Number(item.price);
    const total = price * item.variant.quantity;
    return tot + total;
  }, 0);
};

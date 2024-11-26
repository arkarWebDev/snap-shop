import { create } from "zustand";

export type Variant = {
  variantId: number;
  quantity: number;
};
export type CartItem = {
  id: number;
  name: string;
  image: string;
  price: string;
  variant: Variant;
};

export type CartType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
};

export const useCartStore = create<CartType>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (citem) => citem.variant.variantId === item.variant.variantId
      );
      if (existingItem) {
        const updatedCart = state.cart.map((citem) => {
          if (citem.variant.variantId === item.variant.variantId) {
            return {
              ...citem,
              variant: {
                ...citem.variant,
                quantity: citem.variant.quantity + item.variant.quantity,
              },
            };
          }
          return citem;
        });
        return { cart: updatedCart };
      } else {
        return {
          cart: [
            ...state.cart,
            {
              ...item,
              variant: {
                variantId: item.variant.variantId,
                quantity: item.variant.quantity,
              },
            },
          ],
        };
      }
    }),
  removeFromCart: (item) =>
    set((state) => {
      const updatedCart = state.cart.map((citem) => {
        if (citem.variant.variantId === item.variant.variantId) {
          return {
            ...citem,
            variant: {
              ...citem.variant,
              quantity: citem.variant.quantity - 1,
            },
          };
        }
        return citem;
      });
      return {
        cart: updatedCart.filter((citem) => citem.variant.quantity > 0),
      };
    }),
}));

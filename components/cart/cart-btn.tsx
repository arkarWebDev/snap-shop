"use client";
import React from "react";
import CartDrawer from "./cart-drawer";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

const CartBtn = ({ isLoggedIn }: { isLoggedIn?: boolean }) => {
  const cartLength = useCartStore((state) => state.cart.length);
  return (
    <CartDrawer isLoggedIn={isLoggedIn}>
      <div className="relative p-2 bg-slate-100/80 hover:bg-slate-200 text-slate-800 rounded-full transition-colors cursor-pointer group">
        <ShoppingCart size={22} strokeWidth={2.5} className="group-hover:scale-110 transition-transform duration-300" />
        {cartLength > 0 && (
          <span className="absolute top-0 right-0 translate-x-1 -translate-y-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold leading-none text-white bg-slate-900 rounded-full ring-2 ring-white shadow-sm">
            {cartLength}
          </span>
        )}
      </div>
    </CartDrawer>
  );
};

export default CartBtn;

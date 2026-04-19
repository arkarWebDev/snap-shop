import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { PartyPopper } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

const Success = () => {
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  const cartPosition = useCartStore((state) => state.cartPosition);
  const clearCart = useCartStore((state) => state.clearCart);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setTimeout(() => {
      setCartPosition("Order");
      clearCart();
    }, 3000);

    if (cartPosition === "Success" && cart.length === 0) {
      setCartPosition("Order");
    }

    if (cartPosition !== "Checkout" && cart.length === 0) {
      setCartPosition("Order");
    }
  }, []);
  return (
    <main className="max-w-md mx-auto my-16 text-center flex flex-col items-center justify-center p-8 bg-emerald-50/50 rounded-3xl border border-emerald-100">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-200">
        <PartyPopper size={36} className="text-emerald-600 animate-bounce" />
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3">Payment Successful!</h2>
      <p className="text-base font-medium text-slate-500 mb-8 max-w-[250px]">
        Thank you for your premium purchase with iStore.
      </p>
      <Button className="w-full rounded-full py-6 text-base font-bold shadow-md bg-emerald-600 hover:bg-emerald-700 transition-all active:scale-[0.98]" asChild>
        <Link href="/dashboard/orders">View Your Order Status</Link>
      </Button>
    </main>
  );
};

export default Success;

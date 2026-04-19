import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Box, Minus, ShoppingCart, Ticket } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CartStatus = ({ isLoggedIn }: { isLoggedIn?: boolean }) => {
  const router = useRouter();
  const cartPosition = useCartStore((state) => state.cartPosition);
  const setCartPosition = useCartStore((state) => state.setCartPosition);

  return (
    <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
      <div 
        onClick={() => setCartPosition("Order")}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer shadow-sm",
          cartPosition === "Order" || cartPosition === "Checkout" || cartPosition === "Success"
            ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
        )}>
        <ShoppingCart size={18} />
      </div>
      <div className={cn("h-1 w-12 rounded-full transition-all duration-500", cartPosition === "Checkout" || cartPosition === "Success" ? "bg-slate-900" : "bg-slate-200")} />
      
      <div 
        onClick={() => {
          if (!isLoggedIn) {
            router.push("/auth/login");
            return;
          }
          setCartPosition("Checkout");
        }}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer shadow-sm",
          cartPosition === "Checkout" || cartPosition === "Success"
            ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
        )}>
        <Ticket size={18} />
      </div>
      <div className={cn("h-1 w-12 rounded-full transition-all duration-500", cartPosition === "Success" ? "bg-slate-900" : "bg-slate-200")} />
      
      <div 
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-sm",
          cartPosition === "Success"
            ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
        )}>
        <Box size={18} />
      </div>
    </div>
  );
};

export default CartStatus;

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CartItem from "./cart-item";
import CartStatus from "./cart-status";
import { useCartStore } from "@/store/cart-store";
import Payment from "./payment";
import Success from "./success";

type CartDrawerProps = {
  children: React.ReactNode;
  isLoggedIn?: boolean;
};
const CartDrawer = ({ children, isLoggedIn }: CartDrawerProps) => {
  const cartPosition = useCartStore((state) => state.cartPosition);
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="bg-white/95 backdrop-blur-3xl border-t border-slate-200 shadow-2xl">
          <DrawerHeader className="pb-8 pt-6 border-b border-slate-100 bg-slate-50/50">
            <DrawerTitle className="text-center text-3xl font-extrabold tracking-tight text-slate-900">Your Shopping Cart</DrawerTitle>
            <DrawerDescription className="text-center font-medium text-slate-500 mt-1 mb-8">
              Review your items and complete your premium checkout.
            </DrawerDescription>
            <CartStatus isLoggedIn={isLoggedIn} />
          </DrawerHeader>
          {cartPosition === "Order" && <CartItem isLoggedIn={isLoggedIn} />}
          {cartPosition === "Checkout" && <Payment />}
          {cartPosition === "Success" && <Success />}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;

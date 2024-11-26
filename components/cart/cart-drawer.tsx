import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CartItem from "./cart-item";

type CartDrawerProps = {
  children: React.ReactNode;
};
const CartDrawer = ({ children }: CartDrawerProps) => {
  return (
    <>
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Your Cart</DrawerTitle>
            <DrawerDescription>Stay home.Stay safe.</DrawerDescription>
          </DrawerHeader>
          <CartItem />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;

"use client";

import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import React from "react";
import EmptyCartImg from "@/public/empty-cart.png";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatCurrency from "@/lib/formatCurrency";
import { Button } from "../ui/button";
import { totalPriceCalc } from "@/lib/total-price";

type CartItemProps = {
  isLoggedIn?: boolean;
};

const CartItem = ({ isLoggedIn }: CartItemProps) => {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  return (
    <main className="lg:w-1/2 mx-auto">
      {cart.length === 0 ? (
        <div className="flex items-center justify-center flex-col">
          <Image src={EmptyCartImg} alt="empty cart" width={300} height={300} />
          <p className="text-center mb-10 font-mono font-medium">
            Your cart is empty.
          </p>
        </div>
      ) : (
        <div>
          <Table className="my-6">
            <TableHeader className="bg-slate-50 border-b border-slate-100">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-slate-600 rounded-tl-xl">Product</TableHead>
                <TableHead className="font-semibold text-slate-600">Image</TableHead>
                <TableHead className="font-semibold text-slate-600">Quantity</TableHead>
                <TableHead className="text-right font-semibold text-slate-600 rounded-tr-xl">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((citem) => (
                <TableRow key={citem.id} className="border-b border-slate-100/60 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-bold text-slate-800">{citem.name}</TableCell>
                  <TableCell>
                    <div className="w-14 h-14 relative bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <Image
                        className="object-cover"
                        fill
                        src={citem.image}
                        alt={citem.name}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex bg-slate-100 border border-slate-200 rounded-full w-fit p-1 shadow-inner items-center">
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        className="h-7 w-7 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all font-semibold"
                        onClick={() => {
                          removeFromCart({
                            ...citem,
                            variant: {
                              variantId: citem.variant.variantId,
                              quantity: 1,
                            },
                          });
                        }}
                      >
                        -
                      </Button>
                      <p className="text-sm font-bold text-slate-900 w-8 text-center tabular-nums">
                        {citem.variant.quantity}
                      </p>
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        className="h-7 w-7 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all font-semibold"
                        onClick={() => {
                          addToCart({
                            ...citem,
                            variant: {
                              variantId: citem.variant.variantId,
                              quantity: 1,
                            },
                          });
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-slate-700">
                    {formatCurrency(Number(citem.price))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-transparent border-t-2 border-slate-200">
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={3} className="font-bold text-slate-800 text-base py-6">Total Due</TableCell>
                <TableCell className="text-right font-extrabold text-xl text-slate-900">
                  {formatCurrency(totalPriceCalc(cart))}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Button
            size={"lg"}
            className="w-full mt-2 mb-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-7 text-lg shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all"
            onClick={() => {
              if (!isLoggedIn) {
                router.push("/auth/login");
                return;
              }
              setCartPosition("Checkout");
            }}
          >
            {isLoggedIn ? "Continue to Payment" : "Login to Checkout"}
          </Button>
        </div>
      )}
    </main>
  );
};

export default CartItem;

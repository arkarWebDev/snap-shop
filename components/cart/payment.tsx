"use client";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cart-store";
import React, { useEffect } from "react";
import stripeInit from "@/lib/stripe-init";
import { totalPriceCalc } from "@/lib/total-price";
import PaymentForm from "./payment-form";

const stripe = stripeInit();

const Payment = () => {
  const cart = useCartStore((state) => state.cart);
  const setCartPosition = useCartStore((state) => state.setCartPosition);

  useEffect(() => {
    if (cart.length === 0) setCartPosition("Order");
  }, []);

  return (
    <div className="px-4">
      <Elements
        stripe={stripe}
        options={{
          mode: "payment",
          currency: "usd",
          amount: totalPriceCalc(cart),
        }}
      >
        <PaymentForm totalPrice={totalPriceCalc(cart)} />
      </Elements>
    </div>
  );
};

export default Payment;

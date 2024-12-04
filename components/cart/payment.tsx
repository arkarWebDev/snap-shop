"use client";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cart-store";
import React from "react";
import stripeInit from "@/lib/stripe-init";
import { totalPriceCalc } from "@/lib/total-price";
import PaymentForm from "./payment-form";

const stripe = stripeInit();

const Payment = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <div>
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

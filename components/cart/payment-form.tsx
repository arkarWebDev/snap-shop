"use client";
import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { processPaymant } from "@/server/actions/payment";
import { useCartStore } from "@/store/cart-store";
import { useAction } from "next-safe-action/hooks";
import { createOrder } from "@/server/actions/order";
import { toast } from "sonner";

type PaymentFormProps = {
  totalPrice: number;
};
const PaymentForm = ({ totalPrice }: PaymentFormProps) => {
  const cart = useCartStore((state) => state.cart);
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const { execute } = useAction(createOrder, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success(data.success);
        setCartPosition("Success");
      }
    },
  });

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setLoading(false);
      setErrorMsg(submitError.message || "Something went wrong");
      return;
    }

    const repsonse = await processPaymant({
      amount: totalPrice * 100,
      currency: "usd",
      cart: cart.map((ci) => ({
        quantity: ci.variant.quantity,
        productId: ci.id,
        title: ci.name,
        price: Number(ci.price),
        image: ci.image,
      })),
    });

    if (repsonse?.data?.error) {
      setErrorMsg(repsonse?.data?.error);
      setLoading(false);
      return;
    }

    if (repsonse?.data?.success) {
      const paymentResponse = await stripe.confirmPayment({
        elements,
        clientSecret: repsonse.data.success.clientSecretId!,
        redirect: "if_required",
        confirmParams: {
          return_url: "http://localhost:3000/success",
          receipt_email: repsonse.data.success.user_email,
        },
      });

      if (paymentResponse.error) {
        setErrorMsg(paymentResponse.error.message!);
        setLoading(false);
        return;
      } else {
        setLoading(false);
        execute({
          paymentId: repsonse.data.success.paymentIntentId,
          totalPrice,
          status: "pending",
          products: cart.map((ci) => ({
            productId: ci.id,
            quantity: ci.variant.quantity,
            variantId: ci.variant.variantId,
          })),
        });
      }
    }
  };

  return (
    <main className="max-w-4xl mx-auto">
      <form onSubmit={onSubmitHandler}>
        <PaymentElement />
        <Button
          disabled={loading || !stripe || !elements}
          className="w-full my-4"
        >
          Pay
        </Button>
      </form>
    </main>
  );
};

export default PaymentForm;

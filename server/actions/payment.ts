"use server";

import { paymentSchema } from "@/types/payment-schema";
import { actionClient } from "./safe-action";
import { auth } from "../auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const processPaymant = actionClient
  .schema(paymentSchema)
  .action(async ({ parsedInput: { amount, currency, cart } }) => {
    const user = await auth();
    if (!user) return { error: "You need to be logged in" };
    if (!amount) return { error: "No products in cart" };

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        cart: JSON.stringify(cart),
      },
    });

    return {
      success: {
        paymentIntentId: paymentIntent.id,
        clientSecretId: paymentIntent.client_secret,
        user_email: user.user.email,
      },
    };
  });

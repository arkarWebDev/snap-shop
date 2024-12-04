import { loadStripe, Stripe } from "@stripe/stripe-js";

let sripePromise: Promise<Stripe | null>;
const stripeInit = () => {
  if (!sripePromise) {
    sripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return sripePromise;
};

export default stripeInit;

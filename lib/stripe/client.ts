import Stripe from "stripe";

/**
 * SERVER-ONLY Stripe client. Never import this into a Client Component —
 * it requires the secret key, which must stay off the browser bundle.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2024-06-20",
  typescript: true,
});

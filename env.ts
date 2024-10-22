import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Create a schema for pricing plan IDs
const stripePriceIdSchema = z.string().min(1).startsWith("price_");

export const env = createEnv({
  server: {
    STREAM_SECRET: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    BREVO_API_KEY: z.string().min(1),
    GOOGLE_ANALYTICS_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_STREAM_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_WEBSITE_URL: z.string().min(1),
    NEXT_PUBLIC_CRISP_WEBSITE_ID: z.string().min(1),
    // Stripe Price IDs for Eclipse Plan
    NEXT_PUBLIC_STRIPE_ECLIPSE_MONTHLY_PRICE_ID: stripePriceIdSchema,
    NEXT_PUBLIC_STRIPE_ECLIPSE_ANNUAL_PRICE_ID: stripePriceIdSchema,
    // Stripe Price IDs for Moon Plan
    NEXT_PUBLIC_STRIPE_MOON_MONTHLY_PRICE_ID: stripePriceIdSchema,
    NEXT_PUBLIC_STRIPE_MOON_ANNUAL_PRICE_ID: stripePriceIdSchema,
    // Stripe Price IDs for Sun Plan
    NEXT_PUBLIC_STRIPE_SUN_MONTHLY_PRICE_ID: stripePriceIdSchema,
    NEXT_PUBLIC_STRIPE_SUN_ANNUAL_PRICE_ID: stripePriceIdSchema,
  },
  runtimeEnv: {
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    STREAM_SECRET: process.env.STREAM_SECRET,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    GOOGLE_ANALYTICS_KEY: process.env.GOOGLE_ANALYTICS_KEY,
    NEXT_PUBLIC_STREAM_KEY: process.env.NEXT_PUBLIC_STREAM_KEY,
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    // Stripe Price IDs for Eclipse Plan
    NEXT_PUBLIC_STRIPE_ECLIPSE_MONTHLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_ECLIPSE_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_ECLIPSE_ANNUAL_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_ECLIPSE_ANNUAL_PRICE_ID,
    // Stripe Price IDs for Moon Plan
    NEXT_PUBLIC_STRIPE_MOON_MONTHLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_MOON_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_MOON_ANNUAL_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_MOON_ANNUAL_PRICE_ID,
    // Stripe Price IDs for Sun Plan
    NEXT_PUBLIC_STRIPE_SUN_MONTHLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_SUN_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_SUN_ANNUAL_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_SUN_ANNUAL_PRICE_ID,
    NEXT_PUBLIC_CRISP_WEBSITE_ID: process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID,
  },
});

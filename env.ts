import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

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
  },
});

// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://8cfa4bff2ee46ea3c643e00d60748e9c@o4508014230568960.ingest.us.sentry.io/4508014238433280",

  // Adjust sampling rates based on environment
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,

  // Only for client config (sentry.client.config.ts)
  replaysSessionSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
  replaysOnErrorSampleRate: process.env.NODE_ENV === "production" ? 1.0 : 1,

  // Disable debug mode in production
  debug: process.env.NODE_ENV !== "production",
});

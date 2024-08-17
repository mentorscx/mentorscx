import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/blog",
  "/blog/(.*)",
  "/waitlist",
  "/support",
  "/docs/(.*)",
  "/dashboard/profile/(.*)",
  "/privacy",
  "/about",
  "/pricing",
  "/application/mentor",
  "/application/mentor/(.*)",
]);

const isWaitlistRoute = createRouteMatcher(["/waitlist"]);
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isMentorRoute = createRouteMatcher(["/mentor(.*)"]);
const isMentorApplicationRoute = createRouteMatcher([
  "/application/mentor",
  "/application/mentor/(.*)",
]);
const isAPIRoute = createRouteMatcher([
  "/api/webhook",
  "/api/chatgpt",
  "/api/uploadthing",
  "/api/liveblocks-auth",
]);

export default clerkMiddleware(async (auth, req) => {
  // Only protect non-public routes
  const { userId, sessionClaims, redirectToSignIn } = auth();

  // For users visiting /onboarding, don't try to redirect
  if (
    isWaitlistRoute(req) ||
    isMentorApplicationRoute(req) ||
    isAPIRoute(req)
  ) {
    return NextResponse.next();
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req)) return redirectToSignIn();

  // Apply additional protection based on routes
  if (!isPublicRoute(req)) auth().protect();

  // Catch users who do not have `hasAccess: true` in their publicMetadata
  const claims = sessionClaims as any;
  if (!userId || !claims?.metadata?.hasAccess) {
    const waitlistUrl = new URL("/waitlist", req.url);
    return NextResponse.redirect(waitlistUrl);
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhook",
  "/api/chatgpt",
  "/blog",
  "/blog/(.*)",
  "/waitlist",
  "/support",
  "/docs/(.*)",
  "/dashboard/profile/(.*)",
  "/privacy",
  "/about",
  "/pricing",
  "/api/uploadthing",
  "/application/mentor",
  "/application/mentor/(.*)",
]);

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isMentorRoute = createRouteMatcher(["/mentor(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Only protect non-public routes
  if (!isPublicRoute(req)) {
    // Apply additional protection based on routes

    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

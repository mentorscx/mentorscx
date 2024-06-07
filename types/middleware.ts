import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",
    "/api/chatgpt",
    "/blog",
    "/blog/(.*)",
    "/subscribe",
    "/support",
    "/docs/(.*)",
    "/dashboard/profile/(.*)",
    "/privacy",
    "/about",
    "/pricing",
    "/api/uploadthing",
    "/onboard/mentor/(.*)",
  ],
  ignoredRoutes: ["/api/webhook", "/api/chatgpt", "/", "/subscribe"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

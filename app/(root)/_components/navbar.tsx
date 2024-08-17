import { NavbarRoutes } from "@/components/navbar-routes";

import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="flex h-14 items-center border-b px-4 lg:h-16 lg:px-6 bg-background">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

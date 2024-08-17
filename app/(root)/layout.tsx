import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

import React from "react";

export const dynamic = "force-dynamic";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen h-full">
      <div className="fixed inset-0 h-16 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-48 md:pt-16 lg:w-64 flex-col fixed inset-0 z-50">
        <Sidebar />
      </div>
      <div className="h-full mx-auto md:pl-48 lg:pl-64">{children}</div>
    </div>
  );
};

export default DashboardLayout;

"use client";

import { SidebarRoutes } from "./sidebar-routes";

import { useIsClient } from "usehooks-ts";

export const Sidebar = () => {
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-muted border-r">
      <div className="flex flex-col w-full justify-between h-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

"use client";

import Link from "next/link";
import Image from "next/image";
import { SidebarRoutes } from "./sidebar-routes";
import { useState, useEffect } from "react";
import { Sheet } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { useIsClient } from "usehooks-ts";
import SidebarFooter from "./sidebar-footer";

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

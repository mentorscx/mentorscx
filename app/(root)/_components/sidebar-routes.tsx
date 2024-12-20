"use client";

import {
  Layout,
  Settings,
  CalendarClock,
  Clock,
  Presentation,
  MessageSquarePlusIcon,
  LayoutDashboard,
  CalendarCheck,
  User2,
  Search,
  CreditCardIcon,
  GiftIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

import { Montserrat } from "next/font/google";
import SidebarFooter from "./sidebar-footer";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

const guestRoutes = [
  {
    icon: Search,
    label: "Search",
    href: "/search",
    color: "text-blue-500",
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
    color: "text-neutral-600",
  },
  {
    icon: Clock,
    label: "Sessions",
    href: "/sessions",
    color: "text-green-500",
  },
  {
    icon: MessageSquarePlusIcon,
    label: "Messaging",
    href: "/chats",
    color: "text-blue-500",
  },
  {
    icon: User2,
    label: "Profile",
    href: "/profile",
    color: "text-neutral-600",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    color: "text-neutral-600",
  },
  {
    icon: CreditCardIcon,
    label: "Billing",
    href: "/billing",
    color: "text-blue-600",
  },
];

const mentorRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/mentor/dashboard",
    color: "text-neutral-600",
  },
  {
    icon: CalendarClock,
    label: "Schedule",
    href: "/mentor/schedule",
    color: "text-neutral-600",
  },
  {
    icon: Presentation,
    label: "Sessions",
    href: "/mentor/sessions",
    color: "text-neutral-600",
  },
  {
    icon: MessageSquarePlusIcon,
    label: "Messaging",
    href: "/mentor/chats",
    color: "text-neutral-600",
  },
  {
    icon: CalendarCheck,
    label: "Calendar",
    href: "/mentor/calendar",
    color: "text-neutral-600",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/mentor/settings",
    color: "text-neutral-600",
  },
  {
    icon: User2,
    label: "Profile",
    href: "/mentor/profile",
    color: "text-neutral-600",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isMentorPage = pathname?.includes("/mentor");

  const routes = isMentorPage ? mentorRoutes : guestRoutes;

  return (
    <div className="h-full  flex flex-col justify-between">
      {/* <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <h1
            className={cn(
              "text-3xl font-semibold tracking-tight",
              poppins.className
            )}
          >
            Mentors
          </h1>
          <div className="relative h-16 w-16 ml-2">
            <Image fill alt="Logo" src="/mentors-cx.svg" className="invert" />
          </div>
        </Link>
      </div> */}
      <div>
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
            color={route.color}
          />
        ))}
      </div>

      <div>
        <SidebarFooter />
      </div>
    </div>
  );
};

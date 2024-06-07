"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        " group flex px-3 py-3.5 w-full justify-start font-medium cursor-pointer  hover:bg-blue-100 hover:text-primary-600 rounded-lg transition",
        isActive ? "text-primary-600 bg-blue-100" : "text-neutral-600"
      )}
    >
      <div className="flex items-center flex-1">
        <Icon className={cn("h-5 w-5 mr-3")} />
        {label}
      </div>
    </Link>
  );
};

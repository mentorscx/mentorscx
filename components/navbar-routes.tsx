"use client";

import Link from "next/link";
import { LogInIcon, LogOut } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Montserrat } from "next/font/google";

import { Button } from "@/components/ui/button";
import { cn } from "@nextui-org/react";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isMentorPage = pathname?.includes("/mentor");

  return (
    <>
      <div className="hidden h-16 md:flex items-center">
        <Link
          href="/"
          className="py-6 flex space-x-1 items-center justify-center"
        >
          <h1
            className={cn(
              "text-3xl font-semibold tracking-tight",
              poppins.className
            )}
          >
            Mentors
          </h1>
          <div className="relative h-16 w-16 ml-2">
            <Image fill alt="Logo" src="/mentors-cx.svg" />
          </div>
        </Link>
      </div>
      <div className="h-16 flex items-center md:invisible">
        <Link href="/" className="flex space-x-1 items-center justify-center">
          <span className="text-2xl">Mentors</span>
          <Image src="/mentors-cx.svg" alt="Mentors" width={45} height={45} />
        </Link>
      </div>
      <div className="flex gap-x-2 ml-auto">
        {isMentorPage ? (
          <Link href="/dashboard/search">
            <Button size="sm" variant="ghost">
              <LogInIcon className="h-4 w-4 mr-2" />
              Mentee Mode
            </Button>
          </Link>
        ) : (
          <Link href="/mentor/dashboard">
            <Button size="sm" variant="ghost">
              <LogInIcon className="h-4 w-4 mr-2" />
              Mentor mode
            </Button>
          </Link>
        )}
        <UserButton
          afterSignOutUrl="/"
          userProfileProps={{
            additionalOAuthScopes: {
              google: ["https://www.googleapis.com/auth/calendar.events"],
            },
          }}
        />
      </div>
    </>
  );
};

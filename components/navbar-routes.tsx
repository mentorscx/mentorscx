"use client";

import Link from "next/link";
import { LogInIcon, LogOut } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Montserrat } from "next/font/google";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Notifications from "@/components/notifications";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isMentorPage = pathname?.includes("/mentor");

  // TODO: Test this component, Add proper Mechanism
  // TODO: Add the Loader to the Clerk component
  return (
    <>
      <div className="hidden h-full md:flex items-center">
        <Link
          href="/"
          className="py-6 flex space-x-1 items-center justify-center"
        >
          <h1
            className={cn(
              "text-xl font-semibold tracking-tight",
              poppins.className
            )}
          >
            Mentors
          </h1>
          <div className="relative h-12 w-12 ml-2">
            <Image
              fill
              alt="Logo"
              src="/mentors-cx.svg"
              quality={100}
              priority
              className="object-contain"
            />
          </div>
        </Link>
      </div>
      <div className="h-16 flex items-center md:invisible">
        <Link href="/" className="flex space-x-1 items-center justify-center">
          <Image src="/mentors-cx.svg" alt="CX" width={45} height={45} />
        </Link>
      </div>

      <div className="flex gap-x-3 ml-auto items-center">
        {isMentorPage ? (
          <Link href="/search">
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
        <Notifications />

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

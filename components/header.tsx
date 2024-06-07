"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Logo from "./logo";
import Dropdown from "@/components/utils/dropdown";
import MobileMenu from "./mobile-menu";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { Button } from "./ui/button";
import { SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "bg-white backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <Link href="/" className="hidden items-center space-x-1 md:flex ">
            <span className="hidden font-bold sm:inline-block text-lg">
              {siteConfig.name}
            </span>
            <Image
              src="/mentors-cx.png"
              width={42}
              height={42}
              alt="CX"
              className="ml-3"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Blog
                </Link>
              </li>
              {/* 1st level: hover */}
              {/* 2nd level: hover */}
              {/* <li>
                  <Link
                    href="/documentation"
                    className="font-medium text-sm text-gray-600 hover:text-gray-900 flex py-2 px-5 leading-tight"
                  >
                    Documentation
                  </Link>
                </li> */}
              <li>
                <Link
                  href="/support"
                  className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Support center
                </Link>
              </li>
            </ul>

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center space-x-3">
              <li>
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className="font-medium text-gray-600 hover:text-gray-900  py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    <Button
                      variant="outline"
                      className="border-primary text-primary rounded-full"
                    >
                      Sign In
                    </Button>
                  </Link>
                </SignedOut>
              </li>
              <li>
                <Link href="/dashboard/search">
                  <Button variant="default" className="rounded-full">
                    Search Mentors
                  </Button>
                </Link>
              </li>
              <li>
                <UserButton />
              </li>
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

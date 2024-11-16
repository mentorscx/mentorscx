"use client";

import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="flex md:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && "active"}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-6 h-6 fill-current text-gray-900"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" />
          <rect y="11" width="24" height="2" />
          <rect y="18" width="24" height="2" />
        </svg>
      </button>

      {/* Mobile navigation */}
      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="px-5 py-2">
            <li>
              <Link
                href="/"
                className="flex text-gray-600 hover:text-gray-900 py-2 items-center"
                onClick={() => setMobileNavOpen(false)}
              >
                <span className="font-bold sm:inline-block text-lg text-black">
                  Mentors
                </span>
                <Image
                  src="/mentors-cx.png"
                  width={42}
                  height={42}
                  alt="CX"
                  className="ml-1"
                />
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="flex text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="flex text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="flex text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/support"
                className="flex text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                Support center
              </Link>
            </li>
            {/* <li className="py-2 my-2 border-y border-gray-200">
              <span
                className="flex text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                Resources
              </span>
              <ul className="pl-4">
                <li>
                  <Link
                    href="/documentation"
                    className="text-sm flex font-medium text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-sm flex font-medium text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Support center
                  </Link>
                </li>
              </ul>
            </li> */}

            <li>
              <Link
                href="/search"
                className="btn-sm text-gray-200 bg-primary hover:bg-gray-800 w-full my-2"
                onClick={() => setMobileNavOpen(false)}
              >
                <span>Search Mentors</span>
              </Link>
            </li>
            <li>
              <Link
                href="/sign-in"
                className="flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center"
                onClick={() => setMobileNavOpen(false)}
              >
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary"
                >
                  Sign In
                </Button>
              </Link>
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  );
}

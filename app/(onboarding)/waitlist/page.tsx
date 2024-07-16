"use client";
import Image from "next/image";

import { SubscribeForm } from "@/components/subscribe-form";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

export default function AuthenticationPage() {
  return (
    <>
      <div className="relative min-h-screen h-full flex-col items-center justify-center md:grid md:max-w-none md:grid-cols-2 sm:px-0 max-md:mb-10">
        <div className="relative h-[1/3] flex-col items-center justify-center bg-muted text-white dark:border-r flex md:h-full max-md:mb-3">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="flex">
            <Image
              src="/mentors-cx.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className="invert"
            />
          </div>
        </div>
        <div className="max-md:container sm:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-4 ">
              <h1 className="text-2xl font-bold text-start tracking-tight sm:text-3xl">
                The CX community that grows your career
              </h1>
              <p className="text-sm text-muted-foreground text-start">
                Whether you&apos;re a seasoned professional eager to share your
                knowledge or someone hungry for insights, our customer
                experience mentorship platform is your gateway to a community
                that thrives on learning and growth.
              </p>
              <p className="text-sm font-bold text-start">
                Join the waitlist now and be part of the CX transformative wave.
              </p>
            </div>
            <SubscribeForm />
            <Button className="text-center" variant="link" asChild>
              <Link
                href="https://www.youtube.com/watch?v=NB8sdAsc0rM"
                target="_blank"
              >
                Are you curious? Watch this short demo{" "}
                <VideoIcon className="w-6 h-6 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

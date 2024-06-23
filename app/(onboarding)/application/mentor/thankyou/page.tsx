"use client";
import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import ShimmerButton from "@/components/ui/shimmer-button";

import { ArrowRightIcon, Loader2Icon } from "lucide-react";

const ThankyouPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    router.push("/");
  };

  return (
    <div className="bg-background">
      <div className="min-h-screen max-w-5xl mx-auto p-3 w-full flex items-center justify-center flex-col ">
        <div className="w-[250px] h-[250px]">
          <Image
            className=" object-cover"
            src="/assets/thank-you.svg"
            alt="thankyou"
            width={250}
            height={250}
          />
        </div>

        <h3 className="h3 mt-8 text-muted-foreground px-6">
          Thank you! Your response has been saved! We will get back to you
          shortly!
        </h3>

        <ShimmerButton
          className="shadow-2xl mt-8"
          onClick={handleClick}
          disabled={isLoading}
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg">
            Continue to Website
          </span>
          <span>
            {isLoading ? (
              <Loader2Icon className="animate-spin h-5 w-5 ml-2" />
            ) : (
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            )}
          </span>
        </ShimmerButton>
      </div>
    </div>
  );
};

export default ThankyouPage;

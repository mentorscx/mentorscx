"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ShimmerButton from "@/components/ui/shimmer-button";
import Link from "next/link";

const ThankyouPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="bg-background">
      <div className="min-h-screen max-w-5xl mx-auto p-3 w-full flex items-center justify-center flex-col ">
        <div className="w-48 h-48 ">
          <Image
            className=" object-cover"
            src="/assets/thank-you.svg"
            alt="thankyou"
            width={150}
            height={150}
          />
        </div>
        <h2 className="h2-bold mb-6">
          Thank you! Your response has been saved!
        </h2>
        <h3 className="h3 mb-6">We will get back to you shortly!</h3>

        <ShimmerButton className="shadow-2xl" onClick={handleClick}>
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg">
            Continue to Website
          </span>
        </ShimmerButton>
      </div>
    </div>
  );
};

export default ThankyouPage;

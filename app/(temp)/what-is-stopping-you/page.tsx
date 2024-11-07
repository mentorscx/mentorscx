import React from "react";
import EnhancedStoryAnimations from "./_components/enhanced-story-animations";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "What is stopping you? | London 2024 | Elevate CX",
  description:
    "Join Angel Funes at Elevate CX London 2024 to discover what's holding you back and how to overcome it.",
  robots: "noindex",
  openGraph: {
    title: "What is stopping you? | London 2024 | Elevate CX",
    description:
      "Join Angel Funes at Elevate CX London 2024 to discover what's holding you back and how to overcome it.",
    images: [
      {
        url: "/images/what-is-stopping-you-cover.jpg",
        width: 1200,
        height: 630,
        alt: "What is stopping you cover",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is stopping you? | London 2024 | Elevate CX",
    description:
      "Join Angel Funes at Elevate CX London 2024 to discover what's holding you back and how to overcome it.",
    images: ["/images/what-is-stopping-you-cover.jpg"],
  },
};

const WhatIsStoppingYouPage = () => {
  return (
    <div>
      <BackgroundBeamsWithCollision>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black font-sans tracking-tight">
            What is stopping you?{" "}
          </h2>
          <div className="text-5xl relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <div className="">Angel Funes</div>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <div className="">Angel Funes</div>
            </div>
          </div>

          <p className="text-3xl relative mx-auto inline-block">
            Elevate CX | London 2024{" "}
          </p>
        </div>
      </BackgroundBeamsWithCollision>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <Button
          variant="ghost"
          className="w-16 h-16 rounded-full transition-transform hover:translate-y-1 animate-bounce"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-8 w-8 text-purple-700" />
        </Button>
      </div>

      <EnhancedStoryAnimations />
    </div>
  );
};

export default WhatIsStoppingYouPage;

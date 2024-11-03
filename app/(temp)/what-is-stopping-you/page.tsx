import React from "react";
import EnhancedStoryAnimations from "./_components/enhanced-story-animations";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is stopping you? | London 2024 | Elevate CX",
  description: "a",
  robots: "noindex",
  openGraph: {
    title: "What is stopping you? | London 2024 | Elevate CX",
    description: "a",
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
    description: "a",
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

      <EnhancedStoryAnimations />
    </div>
  );
};

export default WhatIsStoppingYouPage;

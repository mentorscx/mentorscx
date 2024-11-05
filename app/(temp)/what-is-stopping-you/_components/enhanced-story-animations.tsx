"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { useState } from "react";

import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Meteors } from "@/components/ui/meteors";

export function MeteorsCTA() {
  const [isCopied, setIsCopied] = useState(false);
  const promoCode = "HORATIOXELEVATE100";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setIsCopied(true);
      toast.success("Code copied to clipboard!");

      // Reset copy state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  return (
    <div className="p-4">
      <div className=" w-full relative max-w-7xl mx-auto my-16">
        <div className="max-w-7xl mx-auto relative shadow-xl rounded bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden flex flex-col justify-end items-start">
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          <div className="w-full mx-auto flex items-center justify-center flex-col gap-4">
            <h1 className="font-bold text-5xl text-white mb-4 relative z-50 text-center w-full">
              Sponsored by Horatio
            </h1>

            <p className="font-normal  text-3xl text-slate-400 mb-4 relative z-50 w-full text-center">
              Claim your code now for two free months of access to Mentors CX!
            </p>

            <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <code className="font-mono text-lg text-blue-50">
                {promoCode}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-50 hover:text-white hover:bg-white/20"
                onClick={handleCopy}
              >
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy code</span>
              </Button>
            </div>
          </div>

          {/* Meaty part - Meteor effect */}
          <Meteors number={25} />
        </div>
      </div>
    </div>
  );
}

export default function Component() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-100px",
    once: false,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background to-primary/10 overflow-hidden"
      ref={targetRef}
    >
      <div className="container mx-auto px-4 py-12 space-y-12 relative">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-30"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 20,
            }}
          />
        </div>

        {/* Video Section */}
        <motion.div
          ref={ref}
          className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl"
          animate={{
            opacity: isInView ? 1 : 0,
            scale: isInView ? 1 : 0.6,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          whileHover={{ scale: 1.05 }}
        >
          <iframe
            src="https://www.youtube.com/embed/PC_1t7lNU9c"
            title="What is stopping you?"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        </motion.div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-8 pt-16 max-w-5xl mx-auto">
          <motion.div
            className="flex flex-col justify-center space-y-4 p-4"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: "spring",
              bounce: 0.2,
            }}
          >
            <h3 className="text-2xl font-bold text-blue-950">
              Behind "Truffle Pig"
            </h3>
            <p className="text-muted-foreground">
              Read the story behind Truffle Pig, and how a $50 budget + iPhone
              made it possible to produce from idea to distribution in ~1 week.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="secondary" size="lg">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium"
                >
                  Read more
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="max-md:mt-4 relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: "spring",
              bounce: 0.2,
              delay: 0.1,
            }}
          >
            <motion.div
              className="w-full h-full"
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, -20]),
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="/hero.png"
                alt="Truffle Pig product"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </motion.div>
        </div>
        {/* Presentation Download Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.8,
              type: "spring",
              bounce: 0.2,
            }}
            className="bg-[#E85D3D] rounded-lg overflow-hidden shadow-lg aspect-[4/3] flex items-center"
          >
            <div className="p-8 space-y-4 text-white">
              <h2 className="text-3xl font-bold">
                Making Presentations That Stick
              </h2>
              <p className="text-lg">A guide by CX</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: "spring",
              bounce: 0.2,
              delay: 0.5, // Slight delay for second element
            }}
            className="flex flex-col justify-center space-y-4 p-4"
          >
            <h3 className="text-2xl font-bold">
              Get the slides to my presentation
            </h3>
            <p className="text-muted-foreground">
              Yes, the one you saw in the Elevate CX London 2024 edition.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="secondary" size="lg">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium"
                >
                  Download now
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <MeteorsCTA />
    </div>
  );
}

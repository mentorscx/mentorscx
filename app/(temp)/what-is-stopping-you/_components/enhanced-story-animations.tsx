"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useState } from "react";

import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

function CTAComponent() {
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
    <section className="w-full bg-gradient-to-br from-blue-600 to-blue-700 py-16 text-white mt-16">
      <div className="container flex flex-col items-center justify-center space-y-6 px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Sponsored by Horatio
        </h2>

        <h3 className="text-3xl font-semibold">
          {" "}
          Claim your code now for two free months of access to Mentors CX!
        </h3>

        <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <code className="font-mono text-lg text-blue-50">{promoCode}</code>
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
    </section>
  );
}

export default function Component() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
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
          className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
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
          <div className="flex flex-col justify-center space-y-4">
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
                  href="#" // Replace with actual download link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium"
                >
                  Read more
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -20]),
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/hero.png"
              alt="Truffle Pig product"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Presentation Download Section */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-[#E85D3D] rounded-lg overflow-hidden shadow-lg aspect-[4/3] flex items-center">
            <div className="p-8 space-y-4 text-white">
              <h2 className="text-3xl font-bold">
                Making Presentations That Stick
              </h2>
              <p className="text-lg">A guide by CX</p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-2xl font-bold">
              Get the slides to my presentation
            </h3>
            <p className="text-muted-foreground">
              Yes, the one you saw in the Elevate CX London 2024 edition.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="secondary" size="lg">
                <a
                  href="#" // Replace with actual download link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium"
                >
                  Download now
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Sponsorship Section */}
      <div className="max-w-7xl p-6 mx-auto mb-24">
        <CTAComponent />
      </div>
    </div>
  );
}

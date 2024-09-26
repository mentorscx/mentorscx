import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

import { env } from "@/env";
import { Providers } from "./providers";
import "./globals.css";
import { ModalProvider } from "@/components/providers/modal-provider";
import CrispProvider from "@/components/providers/crisp-provider";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} bg-[#F5F6F8] tracking-tight text-gray-900 antialiased`}
        >
          <Providers>
            <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:text-clip">
              {children}
              <Toaster richColors />
              <CrispProvider />
            </div>
          </Providers>
          <ModalProvider />
        </body>
        <GoogleAnalytics gaId={env.GOOGLE_ANALYTICS_KEY} />
      </html>
    </ClerkProvider>
  );
}

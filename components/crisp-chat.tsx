"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

/**
 * CrispChat component for initializing Crisp customer chat functionality.
 * This component should be rendered once in your application, typically in a layout file.
 */
export const CrispChat = () => {
  useEffect(() => {
    const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

    if (!CRISP_WEBSITE_ID) {
      console.error(
        "NEXT_PUBLIC_CRISP_WEBSITE_ID is not set in environment variables."
      );
      return;
    }

    try {
      Crisp.configure(CRISP_WEBSITE_ID);
    } catch (error) {
      console.error("Failed to configure Crisp chat:", error);
    }
  }, []);

  return null;
};

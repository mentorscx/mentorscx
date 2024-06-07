"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("0fa6487a-c74d-4174-ae2a-a7e8bb3b907a");
  }, []);

  return null;
};

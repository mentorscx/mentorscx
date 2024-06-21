"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ConfettiSideCannons } from "../magicui/ConfettiSideCannons";
import { updateUser } from "@/lib/actions/user.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type OnboardingCompleteButtonProps = {
  userId: string;
};

const OnboardingCompleteButton = ({
  userId,
}: OnboardingCompleteButtonProps) => {
  const router = useRouter();
  const handleClick = async () => {
    try {
      await updateUser({
        id: userId,
        isActivated: true,
      });
      toast.success("Profile Activated");
      router.refresh();
    } catch (error) {
      console.log("Error in activating the profile", error);
      toast.error("Error , Please try again");
    }
  };
  return (
    <>
      <ConfettiSideCannons
        name="Finish onboarding"
        onhandleClick={handleClick}
      />
    </>
  );
};

export default OnboardingCompleteButton;

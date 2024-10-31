"use client";
import React, { useState } from "react";

import { ConfettiSideCannons } from "../magicui/ConfettiSideCannons";
import { updateUser } from "@/lib/actions/user.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";
import useInitializeChatClient from "../chats/useInitializeChatClient";

type OnboardingCompleteButtonProps = {
  userId: string;
  isActivated: boolean;
  role: Role;
};

// TODO: Show activation button only if it not activated
// TODO: Create get stream account when click on activate Button

const OnboardingCompleteButton = ({
  userId,
  isActivated = false,
  role,
}: OnboardingCompleteButtonProps) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  // Only initialize chat client for MENTOR role
  const chatClient = role === Role.MENTOR ? useInitializeChatClient() : null;

  const handleClick = async () => {
    try {
      setIsVisible(false);
      // For mentors, validate chat client availability first
      if (role === Role.MENTOR && !chatClient) {
        toast.error("Profile activated failed, Please try again!");
        return;
      }

      if (role === Role.MENTOR) {
        await updateUser({
          id: userId,
          isActivated: true,
        });
      }

      toast.success(
        role === Role.MENTOR
          ? "Mentor profile activated successfully!"
          : "Profile activated successfully!"
      );
      router.refresh();
    } catch (error) {
      console.log("Error in activating the profile", error);
      toast.error("Error , Please try again");
      setIsVisible(true);
    }
  };

  if (isActivated || role === Role.MENTEE) return null;

  return (
    <>
      <ConfettiSideCannons
        name="Finish onboarding"
        onhandleClick={handleClick}
        isVisible={isVisible}
      />
    </>
  );
};

export default OnboardingCompleteButton;

"use client";
import React from "react";
import { ChevronRight, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";

interface OnboardingChecklistActionsProps {
  profileId: string;
  dataType: string;
  route?: string;
  children: React.ReactNode;
  isChecked: boolean;
}

export const OnboardingChecklistActions = ({
  profileId,
  dataType,
  route,
  children,
  isChecked,
}: OnboardingChecklistActionsProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const handleClick = async () => {
    if (isChecked) {
      return;
    }

    if (route === "mentor/dashboard") {
      await router.push(`/mentor/profile`);
    } else if (route === "/dashboard") {
      await router.push(`/profile`);
    }

    if (dataType === "industry") {
      onOpen("addIndustry");
    } else if (dataType === "expertise") {
      onOpen("addExpertise");
    } else if (dataType === "experience") {
      onOpen("addExperience");
    } else if (dataType === "tool") {
      onOpen("addTool");
    } else if (dataType === "bio") {
      onOpen("editBio", {
        user: {
          id: profileId,
        },
      });
    } else if (dataType === "profession") {
      onOpen("editProfession", {
        user: {
          id: profileId,
        },
      });
    } else if (dataType === "availability") {
      await router.push(`/mentor/schedule`);
    } else if (dataType === "meeting") {
      await router.push(`/mentor/settings`);
    }
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="link"
        size="lg"
        className="text-white hover:no-underline"
        asChild
      >
        {children}
      </Button>
    </div>
  );
};

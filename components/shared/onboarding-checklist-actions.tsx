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
}

export const OnboardingChecklistActions = ({
  profileId,
  dataType,
  route,
}: OnboardingChecklistActionsProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const handleClick = async () => {
    if (route !== "profile") {
      await router.push(`/dashboard/profile/${profileId}`);
    }
    if (dataType === "industry") onOpen("addIndustry");
    else if (dataType === "expertise") onOpen("addExpertise");
    else if (dataType === "experience") onOpen("addExperience");
    else if (dataType === "tool") onOpen("addTool");
    else if (dataType === "bio") onOpen("editBio");
    else if (dataType === "profession") onOpen("editProfession");
    else if (dataType === "availability") {
      router.push(`/mentor/schedule`);
    }
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="link"
        size="sm"
        className="text-white"
      >
        <ChevronRight className="w-5 h-5 p-0" />
      </Button>
    </div>
  );
};

"use client";
import React from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useEditProfileStore } from "@/hooks/use-edit-profile-store";

interface AddItemActionProps {
  dataType: string;
}

const AddItemAction = ({ dataType }: AddItemActionProps) => {
  const { onOpen } = useModal();
  const { isActive, toggleActive } = useEditProfileStore();
  const hadleClick = () => {
    if (dataType === "industry") onOpen("addIndustry");
    else if (dataType === "expertise") onOpen("addExpertise");
    else if (dataType === "experience") onOpen("addExperience");
    else if (dataType === "tool") onOpen("addTool");
  };

  if (!isActive) return null;

  return (
    <div>
      <Button size="sm" variant="outline" onClick={hadleClick}>
        <PlusIcon className="w-4 h-4 mr-1" /> Add
      </Button>
    </div>
  );
};

export default AddItemAction;

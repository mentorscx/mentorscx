"use client";

import React from "react";
import { useState } from "react";
import {
  CopyIcon,
  Loader2Icon,
  MoreVerticalIcon,
  PencilIcon,
  PhoneIcon,
  TrashIcon,
  VideoIcon,
} from "lucide-react";
import { redirect, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useModal } from "@/hooks/use-modal-store";
import { Experience, Expertise, Tool, Industry } from "@prisma/client";
import { useEditProfileStore } from "@/hooks/use-edit-profile-store";
import { toast } from "sonner";
import { getUserSubscription } from "@/lib/actions/helper.action";
import { isProUser } from "@/lib/utils";
import SubscribeProModal from "@/components/modals/subscribe-pro-modal";

interface ProfileItemActionProps {
  data: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  };
  dataType: string;
}

export default function ProfileItemAction({
  data,
  dataType,
}: ProfileItemActionProps) {
  const { onOpen } = useModal();
  const { isActive, toggleActive } = useEditProfileStore();

  const handleEdit = () => {
    if (dataType === "industry") {
      onOpen("editIndustry", {
        industry: data,
      });
    } else if (dataType === "tool") {
      onOpen("editTool", {
        tool: data,
      });
    } else if (dataType === "expertise") {
      onOpen("editExpertise", {
        expertise: data,
      });
    } else if (dataType === "experience") {
      onOpen("editExperience", {
        experience: data,
      });
    }
  };

  const handleDelete = () => {
    if (dataType === "industry") {
      onOpen("deleteIndustry", {
        industry: data,
      });
    } else if (dataType === "tool") {
      onOpen("deleteTool", {
        tool: data,
      });
    } else if (dataType === "expertise") {
      onOpen("deleteExpertise", {
        expertise: data,
      });
    } else if (dataType === "experience") {
      onOpen("deleteExperience", {
        experience: data,
      });
    }
  };
  if (!isActive) {
    return null;
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVerticalIcon className="w-4 h-4 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex items-center flex-col">
          <DropdownMenuItem
            className="flex gap-1 items-center cursor-pointer"
            onClick={handleEdit}
          >
            <div className="flex gap-1 text-primary items-center cursor-pointer">
              <PencilIcon className="w-4 h-4 mr-1" />
              Edit
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-[1px]" />
          <DropdownMenuItem
            className="flex gap-1 items-center cursor-pointer"
            onClick={handleDelete}
          >
            <div className="flex gap-1 text-red-600 items-center cursor-pointer">
              <TrashIcon className="w-4 h-4 mr-1" />
              Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface RequestCallButtonProps {
  id: string;
  currentUserClerkId: string | null;
  otherUserClerkId: string;
}
export function RequestCallButton({
  id,
  currentUserClerkId,
  otherUserClerkId,
}: RequestCallButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isDisabled = currentUserClerkId === otherUserClerkId;

  const handleClose = () => setIsDialogOpen(!isDialogOpen);

  const handleClick = async () => {
    setIsLoading(true);
    const user = await getUserSubscription();

    if (!user) {
      redirect("/sign-in");
    }

    const proUser = isProUser(user.Subscription);

    if (!proUser) {
      setIsDialogOpen(true);
      setIsLoading(false);
      return;
    }

    router.push(`/calendar/${id}`);
  };

  return (
    <>
      {" "}
      <SubscribeProModal isDialogOpen={isDialogOpen} onClose={handleClose} />
      <Button
        className="rounded-full"
        onClick={handleClick}
        disabled={isDisabled}
      >
        {isLoading ? (
          <Loader2Icon className="w-5 h-5 mr-1 animate-spin" />
        ) : (
          <VideoIcon className="w-5 h-5 mr-1" />
        )}
        Request session
      </Button>
    </>
  );
}

interface CopyToClipboardButtonProps {
  value: string;
}

export function CopyToClipboardButton({ value }: CopyToClipboardButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Link copied");
  };
  return (
    <Button variant="secondary" onClick={handleCopy}>
      <CopyIcon className="w-4 h-4 " />
    </Button>
  );
}

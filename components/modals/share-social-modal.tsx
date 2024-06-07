"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

import { ShareButton } from "@/components/shared/profile/profile-share";
import { Input } from "../ui/input";
import { Copy, CopyIcon } from "lucide-react";
import { CopyToClipboardButton } from "../shared/profile/profile-item-action";

export const ShareSocialModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "socialShare";

  const shareDetails = data?.socialShare;

  if (!shareDetails) return null;

  const handleClose = () => {
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader className="flex flex-col items-center ">
          <DialogTitle>Share in a Post</DialogTitle>
          <DialogDescription>
            Please select your social provider
          </DialogDescription>
        </DialogHeader>
        <ShareButton property={{}} />

        <div className="py-4 flex items-center justify-center gap-4">
          <Input value={shareDetails.url} />
          <CopyToClipboardButton value={shareDetails.url} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

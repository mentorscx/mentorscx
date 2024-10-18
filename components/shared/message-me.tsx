"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Loader2Icon, MessageCircleIcon } from "lucide-react";
import useConversationStore from "@/hooks/use-conversation-store";
import { redirect, useRouter } from "next/navigation";
import { useIsClient } from "usehooks-ts";
import { getUserSubscription } from "@/lib/actions/helper.action";
import { isProUser } from "@/lib/utils";
import SubscribeProModal from "../modals/subscribe-pro-modal";

type MessageMeProps = {
  currentUserClerkId: string | null;
  otherUserClerkId: string;
  redirectUrl: string;
};

const MessageMe = (props: MessageMeProps) => {
  const router = useRouter();
  const isClient = useIsClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isDisabled =
    isLoading || props.currentUserClerkId === props.otherUserClerkId;

  const setActiveUsers = useConversationStore((state) => state.activeUsers);

  if (!props.currentUserClerkId) {
    redirect("/sign-in");
  }

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

    if (props.currentUserClerkId !== null) {
      setActiveUsers([props.currentUserClerkId, props.otherUserClerkId]);
    }
    router.push(props.redirectUrl);
  };

  if (!isClient) return null;

  return (
    <div>
      <SubscribeProModal isDialogOpen={isDialogOpen} onClose={handleClose} />
      <Button
        className="rounded-full"
        variant="outline"
        onClick={handleClick}
        disabled={isDisabled}
      >
        {isLoading ? (
          <Loader2Icon className="w-5 h-5 mr-1 animate-spin" />
        ) : (
          <MessageCircleIcon className="w-5 h-5 mr-1" />
        )}
        Message me
      </Button>
    </div>
  );
};

export default MessageMe;

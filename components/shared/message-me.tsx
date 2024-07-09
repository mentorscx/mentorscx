"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Loader2Icon, MessageCircleIcon } from "lucide-react";
import useConversationStore from "@/hooks/use-conversation-store";
import { redirect, useRouter } from "next/navigation";

type MessageMeProps = {
  currentUserClerkId: string | null;
  otherUserClerkId: string;
  redirectUrl: string;
};

const MessageMe = (props: MessageMeProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled =
    isLoading || props.currentUserClerkId === props.currentUserClerkId;

  const setActiveUsers = useConversationStore((state) => state.activeUsers);

  if (!props.currentUserClerkId) {
    redirect("/sign-in");
  }

  const handleClick = async () => {
    setIsLoading(true);
    if (props.currentUserClerkId !== null) {
      setActiveUsers([props.currentUserClerkId, props.otherUserClerkId]);
    }
    router.push(props.redirectUrl);
  };

  return (
    <div>
      <Button
        className="rounded-full"
        variant="outline"
        onClick={handleClick}
        disabled={isDisabled}
      >
        {isLoading ? (
          <Loader2Icon className="w-5 h-5 mr-1" />
        ) : (
          <MessageCircleIcon className="w-5 h-5 mr-1" />
        )}
        Message me
      </Button>
    </div>
  );
};

export default MessageMe;

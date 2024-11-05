"use client";
import React, { useState } from "react";
import { Loader2Icon, VideoIcon } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { isProUser } from "@/lib/utils";
import { getUserSubscription } from "@/lib/actions/helper.action";
import SubscribeProModal from "../modals/subscribe-pro-modal";

type RequestSessionButtonProps = {
  mentorId: string;
};

const RequestSessionButton = (props: RequestSessionButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => setIsDialogOpen(!isDialogOpen);

  const handleClick = async () => {
    try {
      setIsLoading(true);

      const user = await getUserSubscription();

      if (!user) {
        router.push("/sign-in");
        return;
      }

      const proUser = isProUser(user.Subscription);

      const selfUser = user.id === props.mentorId;
      if (selfUser) {
        withReactContent(Swal).fire({
          title: "You cannot book a session with yourself!",
          text: "Please try booking a session with another mentor.",
          icon: "warning",
          confirmButtonText: "Got it!",
          confirmButtonColor: "#3b82f6",
        });
        setIsLoading(false);
        return;
      }

      if (!proUser) {
        setIsDialogOpen(true);
        setIsLoading(false);
        return;
      }

      router.push(`/calendar/${props.mentorId}`);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <SubscribeProModal isDialogOpen={isDialogOpen} onClose={handleClose} />
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? (
          <Loader2Icon className="w-5 h-5 mr-1 animate-spin" />
        ) : (
          <VideoIcon className="w-5 h-5 mr-1" />
        )}
        Book session
      </Button>
    </>
  );
};

export default RequestSessionButton;

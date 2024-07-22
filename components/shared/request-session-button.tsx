"use client";
import React, { useState } from "react";
import { Loader2Icon, VideoIcon } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { redirect, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { hasPremiumAccess } from "@/lib/actions/helper.action";

type RequestSessionButtonProps = {
  mentorId: string;
};
const RequestSessionButton = (props: RequestSessionButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Disable if the user is self
  // Check if the user has premium access
  // Pop up the pricing modal if the user tries to book the call
  // If try to book call with himself, throw a dialog

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const user = (await hasPremiumAccess()) as any;

      if (!user) {
        redirect("/sign-in");
      }

      const selfUser = user?.id === props.mentorId ? true : false;
      if (selfUser) {
        withReactContent(Swal).fire({
          title: "You cannot book self session!",
          text: "Please try booking session with the other mentors",
          icon: "warning",
          confirmButtonText: "Got it!",
          confirmButtonColor: "#3b82f6",
        });
        return;
      }
      router.push(`/dashboard/calendar/${props.mentorId}`);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleClick}>
      <>
        {isLoading ? (
          <Loader2Icon className="w-5 h-5 mr-1" />
        ) : (
          <VideoIcon className="w-5 h-5 mr-1" />
        )}
        Book session
      </>
    </Button>
  );
};

export default RequestSessionButton;

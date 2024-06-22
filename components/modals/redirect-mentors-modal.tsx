"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useIsClient } from "usehooks-ts";
import Image from "next/image";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Loader2Icon } from "lucide-react";

type MentorRedirectDialogProps = {
  isOpen: boolean;
};

export const MentorRedirectDialog = ({
  isOpen = false,
}: MentorRedirectDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);
  const [isLoading, setIsLoading] = useState(false);
  const isClient = useIsClient();

  const router = useRouter();

  const handleClose = async () => {
    setIsLoading(true);
    router.push("/mentor/dashboard");
  };

  if (!isDialogOpen || !isClient) return null;

  return (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogContent
        autoFocus={false}
        className="sm:max-w-[475px] rounded-lg"
      >
        <AlertDialogHeader className="flex flex-col items-center ">
          <AlertDialogDescription className="mt-4">
            <div className="max-w-[250px] max-h-[250px]">
              <Image
                src="/assets/work_in_progress.svg"
                width={200}
                height={200}
                alt="work in Progress"
                className="object-fit"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="text-center">
          <h4 className="h4">Thanks for your interest ❤️</h4>

          <p className="text-muted-foreground">
            Page in progress. You'll be able to access it soon!
          </p>
        </div>
        <AlertDialogFooter className="w-full pt-4 flex items-center justify-center">
          <AlertDialogAction
            type="submit"
            className="mx-auto animate-buttonheartbeat"
            onClick={handleClose}
            disabled={isLoading}
          >
            Go to my dashboard
            {isLoading ? (
              <Loader2Icon className="animate-spin w-4 h-4 ml-1" />
            ) : (
              <DashboardIcon className="h-4 w-4 ml-1" />
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MentorRedirectDialog;

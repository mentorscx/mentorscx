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
import { Check, Loader2Icon } from "lucide-react";
import { UserButton, UserProfile } from "@clerk/nextjs";

type ConnectGoogleCalendarModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ConnectGoogleCalendarModal = ({
  isOpen,
  onClose,
}: ConnectGoogleCalendarModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isClient = useIsClient();

  const handleClose = () => onClose();

  if (!isClient) return null;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent autoFocus={false} className="rounded-lg  p-0">
        <AlertDialogHeader className="w-full flex flex-col items-center p-0 overflow-hidden">
          <AlertDialogDescription className="w-full p-0">
            <Image
              src="/assets/google_calendar_sync.gif"
              layout={"responsive"}
              width={450}
              height={200}
              alt="work in Progress"
              className="object-fit w-full rounded-lg h-1/2"
              unoptimized={true}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="w-full pt-4 flex flex-row items-center justify-center p-3">
          <div className="px-4">
            <h4 className="text-xl mb-4">Google Calendar Sync checklist ❤️</h4>

            <ol className="text-muted-foreground list-decimal space-y-2">
              <li>
                Click on your{" "}
                <span className="font-semibold">profile icon</span> in the top
                right corner
              </li>
              <li>
                Click on <span className="font-semibold">manage account</span>
              </li>
              <li>
                Add your desired calendar under{" "}
                <span className="font-semibold"> connected accounts</span>
              </li>
              <li>
                Follow the Google prompt (
                <span className="font-semibold">authorize </span>
                view and edit access)
              </li>
            </ol>
            <AlertDialogAction
              type="submit"
              className="mx-auto w-full mt-4"
              disabled={isLoading}
              onClick={handleClose}
            >
              Sounds good
              {isLoading ? (
                <Loader2Icon className="animate-spin w-4 h-4 ml-1" />
              ) : (
                <Check className="h-4 w-4 ml-1" />
              )}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConnectGoogleCalendarModal;

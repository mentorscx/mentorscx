"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useIsClient } from "usehooks-ts";

const SubscribeProModal = ({
  isDialogOpen = false,
  onClose,
}: {
  isDialogOpen?: boolean;
  onClose?: () => void;
}) => {
  const router = useRouter();

  const isClient = useIsClient();

  if (!isClient) return null;

  const handleCancelClick = () => {
    if (onClose) {
      onClose();
    } else {
      router.push("/search");
    }
  };

  return (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <Image
            src="/assets/stacked-coins.png"
            alt="credit coins"
            width={462}
            height={150}
          />

          <AlertDialogTitle className="large text-dark-600">
            Looks like you don&#39;t have Pro access!
          </AlertDialogTitle>

          <AlertDialogDescription className="p-16-regular py-3">
            No worries, though - you can keep enjoying our services by grabbing
            a Pro membership.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full" onClick={handleCancelClick}>
            No, Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-full"
            onClick={() => router.push("/billing")}
          >
            Yes, Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubscribeProModal;

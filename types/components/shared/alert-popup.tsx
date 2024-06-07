"use client";

import { useState } from "react";
import { useIsClient } from "usehooks-ts";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { is } from "immutable";
import { on } from "events";
import { open } from "fs";
import { title } from "process";

interface AlertPopupProps {
  title: string;
  description: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function AlertPopup({
  title,
  description,
  open,
  onConfirm,
  onCancel,
}: AlertPopupProps) {
  console.log(open);
  const isClient = useIsClient();

  const handleContinue = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  if (!isClient) {
    return null;
  }

  console.log(isClient);
  console.log(open);
  console.log("just above");

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

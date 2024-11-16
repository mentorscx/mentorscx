"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Infinity, Battery, InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditStoreProps {
  currentBookings: number;
  bookingsLimit: number;
  currentSessions: number;
  sessionLimit: number;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/*
  Here Booking means the current booked sessions
  session means the total number of sessions
*/
export default function CreditsDialog({
  currentBookings,
  bookingsLimit,
  currentSessions,
  sessionLimit,
  isOpen: controlledIsOpen,
  onOpenChange,
}: CreditStoreProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  useEffect(() => {
    if (isControlled) {
      setInternalIsOpen(controlledIsOpen);
    }
  }, [isControlled, controlledIsOpen]);

  const setIsOpen = (open: boolean) => {
    if (isControlled) {
      onOpenChange?.(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  const isUnlimited = sessionLimit > 100;
  const creditPercentage = Math.min(
    100,
    (currentSessions / (sessionLimit as number)) * 100
  );

  const remainingBookings = Math.max(0, bookingsLimit - currentBookings);
  const remainingSessions = Math.max(0, sessionLimit - currentSessions);

  const queuePercentage =
    sessionLimit === 0
      ? 0
      : Math.min(100, (currentBookings / bookingsLimit) * 100);

  const handleConfirm = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-slate-500">
          <InfoIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Credit Store</DialogTitle>
          <DialogDescription>
            Your current available to queue and available sessions.
          </DialogDescription>
        </DialogHeader>
        <Card className="w-full border-0 shadow-none">
          <CardContent className="pt-4 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold ">Available to Queue</span>
                <span className=" text-lg font-semibold flex items-center justify-between gap-2">
                  {bookingsLimit === 0 ? (
                    <Battery className="h-6 w-6 " />
                  ) : (
                    `Limit: ${bookingsLimit}`
                  )}
                </span>
              </div>
              <Progress
                value={queuePercentage}
                className={cn(
                  "h-3 bg-blue-100",
                  queuePercentage === 100 && "!bg-red-100"
                )}
              />
              <p
                className={cn(
                  "mt-2 text-sm text-gray-600",
                  remainingBookings === 0 && "!text-red-600"
                )}
              >
                {remainingBookings === 0
                  ? "You have 0 calls left to queue."
                  : `You can queue ${remainingBookings} more session${
                      currentBookings !== 1 ? "s" : ""
                    }.`}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold">Credits</span>
                <span className="text-lg font-semibold flex items-center gap-2">
                  {isUnlimited ? (
                    <>
                      Unlimited
                      <Infinity className="h-6 w-6 text-blue-600" />
                    </>
                  ) : (
                    <>
                      {sessionLimit !== 0 ? (
                        `Limit: ${sessionLimit}`
                      ) : (
                        <Battery className="h-6 w-6 text-blue-600" />
                      )}
                    </>
                  )}
                </span>
              </div>
              <Progress
                value={creditPercentage}
                className={cn(
                  "h-3 bg-blue-100",
                  remainingSessions === 0 && "!bg-red-100"
                )}
              />
              {sessionLimit !== 0 ? (
                <p
                  className={cn(
                    "mt-2 text-sm text-gray-600",
                    !isUnlimited && creditPercentage === 100 && "!text-red-600"
                  )}
                >
                  {isUnlimited
                    ? "You have unlimited credits available."
                    : `You have ${remainingSessions} out of ${sessionLimit} credits available.`}
                </p>
              ) : (
                <p className="mt-2 text-sm text-red-600">
                  You have no credits.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <DialogFooter>
          <Button
            onClick={handleConfirm}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Yes, I get it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

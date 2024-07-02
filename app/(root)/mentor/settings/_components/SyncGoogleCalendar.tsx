"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";

import { useIsClient } from "usehooks-ts";

import { redirect, useRouter } from "next/navigation";

const ClerkProfileDialog = (props: { isGoogleCalendarConnected: boolean }) => {
  const isClient = useIsClient();
  const router = useRouter();

  const handleClick = () => {
    router.push("/sign-in");
    redirect("/login");
  };

  if (!isClient) return null;

  return (
    <>
      {props.isGoogleCalendarConnected ? (
        <Button variant="outline" disabled={true}>
          Google calendar connected
        </Button>
      ) : (
        <Button onClick={handleClick} variant="secondary">
          Permissions to Calendar
        </Button>
      )}
    </>
  );
};

const SyncGoogleCalendar = (props: { isGoogleCalendarConnected: boolean }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>Sync your google calendar</CardTitle>
        <CardDescription>connect your google calender</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <ClerkProfileDialog
          isGoogleCalendarConnected={props.isGoogleCalendarConnected}
        />
      </CardContent>
    </Card>
  );
};

export default SyncGoogleCalendar;

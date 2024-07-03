"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import ConnectGoogleCalendarModal from "@/components/modals/connect-google-calendar-modal";

const SyncGoogleCalendar = (props: { isGoogleCalendarConnected: boolean }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => setIsDialogOpen(!isDialogOpen);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>Sync your Google Calendar</CardTitle>
        <CardDescription>You can connect your Google Calender</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <ConnectGoogleCalendarModal
          isOpen={isDialogOpen}
          onClose={handleClick}
        />
        {props.isGoogleCalendarConnected ? (
          <Button variant="outline" disabled={true}>
            Google Calendar connected
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleClick}>
            Connect Google Calendar
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SyncGoogleCalendar;

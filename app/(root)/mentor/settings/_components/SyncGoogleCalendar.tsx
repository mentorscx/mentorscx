"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import ConnectGoogleCalendarModal from "@/components/modals/connect-google-calendar-modal";
import { isConnectedWithGoogleEvents } from "@/lib/actions/helper.action";

const SyncGoogleCalendar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] =
    useState(false);

  useEffect(() => {
    const checkGoogleCalendarConnection = async () => {
      const connected = await isConnectedWithGoogleEvents();
      setIsGoogleCalendarConnected(connected);
    };

    checkGoogleCalendarConnection();
  }, []);

  const handleClick = useCallback(() => setIsDialogOpen((prev) => !prev), []);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>Sync your Google Calendar</CardTitle>
        <CardDescription>You can connect your Google Calendar</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <ConnectGoogleCalendarModal
          isOpen={isDialogOpen}
          onClose={handleClick}
        />
        {isGoogleCalendarConnected ? (
          <Button variant="outline" disabled>
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

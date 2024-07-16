"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowBigUpDashIcon, ArrowUpRight, LightbulbIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/shared/heading";
import { Card } from "@/components/ui/card";

import ConnectGoogleCalendarModal from "@/components/modals/connect-google-calendar-modal";

const MentorCalendarHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClick = () => setIsDialogOpen(!isDialogOpen);

  return (
    <>
      <ConnectGoogleCalendarModal isOpen={isDialogOpen} onClose={handleClick} />

      <Card className="mt-4 p-3 md:pl-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Heading
            title="My Schedule"
            description="Manage your availability"
            imageUrl="/assets/schedule_tab.svg"
          />
          <Button variant="link" onClick={handleClick}>
            <span>Sync your Google calendar</span>
            <LightbulbIcon className="inline-block ml-1" />
          </Button>
        </div>
      </Card>
    </>
  );
};

export default MentorCalendarHeader;

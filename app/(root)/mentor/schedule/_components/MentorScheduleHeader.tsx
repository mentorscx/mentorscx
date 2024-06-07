import React from "react";
import Link from "next/link";
import { ArrowBigUpDashIcon, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/shared/heading";

const MentorCalendarHeader = () => {
  return (
    <div className="mt-4 p-3 border shadow rounded bg-background md:pl-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Heading
          title="My Schedule"
          description="Manage your availability"
          imageUrl="/assets/schedule_tab.svg"
        />
        <Button asChild variant="link">
          <Link href="/">
            <span>Sync your Google or Microsoft calendar</span>
            <ArrowBigUpDashIcon className="inline-block ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MentorCalendarHeader;

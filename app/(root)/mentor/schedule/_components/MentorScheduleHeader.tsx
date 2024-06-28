import React from "react";
import Link from "next/link";
import { ArrowBigUpDashIcon, ArrowUpRight, LightbulbIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/shared/heading";
import { Card } from "@/components/ui/card";
import { LightBulbIcon } from "@heroicons/react/24/outline";

const MentorCalendarHeader = () => {
  return (
    <Card className="mt-4 p-3 md:pl-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Heading
          title="My Schedule"
          description="Manage your availability"
          imageUrl="/assets/schedule_tab.svg"
        />
        <Button asChild variant="link">
          <Link href="/">
            <span>Sync your Google or Microsoft calendar</span>
            <LightbulbIcon className="inline-block ml-1" />
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default MentorCalendarHeader;

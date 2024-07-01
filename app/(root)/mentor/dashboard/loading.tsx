import React from "react";

import { DashboardFeedbackForm } from "./_components/dashboard-feedback-form";

import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardCardSkelton,
  DashboardProfileSkelton,
  DashboardSessionSkeleton,
} from "./_components/dashboard-skelton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto pt-[80px] p-3">
      {/* PAGE TITLE */}
      <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* WELCOME  AND STATS*/}
        <Card className="w-full mt-4 p-3 border shadow rounded-lg bg-background md:pl-6 col-start-1 col-span-2">
          <Skeleton>
            <span className="invisible">Welcome super hero!</span>
          </Skeleton>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 my-4 md:px-4">
            <DashboardCardSkelton />

            <DashboardCardSkelton />

            <DashboardCardSkelton />
          </div>
        </Card>

        {/* PROFILE AND SHARE DETAILS */}
        <div className="col-span-1">
          <DashboardProfileSkelton />
        </div>
      </div>

      {/* SESSIONS REQUESTS */}
      <DashboardSessionSkeleton />

      <DashboardSessionSkeleton />

      {/* FEATURE REQUEST FORM */}
      <div className="w-full col-span-3">
        <DashboardFeedbackForm userId="1234" />
      </div>
    </div>
  );
}

import React from "react";
import { Suspense } from "react";

import MentorScheduleMain from "./_components/MentorScheduleMain";
import MentorCalendarHeader from "./_components/MentorScheduleHeader";
import ScheduleSkeleton from "@/components/shared/skeletons/ScheduleSkeleton";

const MentorSchedulePage = async () => {
  return (
    <div className="max-w-5xl mx-auto pt-[80px] p-3">
      <MentorCalendarHeader />
      <Suspense fallback={<ScheduleSkeleton />}>
        <MentorScheduleMain />
      </Suspense>
    </div>
  );
};

export default MentorSchedulePage;

import { db } from "@/lib/db";
import { BookingCalendar } from "./_components/booking-calendar";
import React from "react";

import { getSelf } from "@/lib/actions/user.action";
import { getAllSessions } from "@/lib/actions/session.action";
import Heading from "@/components/shared/heading";

interface SchedulePageProps {
  params: {
    scheduleId: string;
  };
}

const SchedulePage = async ({ params }: SchedulePageProps) => {
  const { scheduleId } = params;
  const sessions = await getAllSessions(scheduleId);

  const mentor = await db.user.findUnique({
    where: {
      id: scheduleId,
    },
  });

  console.log("Mentor exists", mentor ? "Yes" : "No");

  return (
    <div className="max-w-5xl mx-auto">
      <div className="my-4 lg:my-8 p-3 border shadow rounded bg-background md:pl-6">
        <Heading
          title="Schedule"
          description="Book your session"
          imageUrl="/assets/schedule_tab.svg"
        />
      </div>
      <div className="my-4 p-3 border shadow rounded bg-background">
        <BookingCalendar
          sessions={JSON.stringify(sessions)}
          mentor={JSON.stringify(mentor)}
        />
      </div>
    </div>
  );
};

export default SchedulePage;

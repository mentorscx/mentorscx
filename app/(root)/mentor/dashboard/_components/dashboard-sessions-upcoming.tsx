import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { db } from "@/lib/db";
import { SessionCard } from "@/components/shared/sessions/session-card";

type TDashBoardSessionsUpcoming = {
  userId: string;
};

const DashboardSessionsUpcoming = async ({
  userId,
}: TDashBoardSessionsUpcoming) => {
  const sessionRequests = await db.session.findMany({
    where: {
      mentorId: userId,
      status: "ACCEPTED",
      start: {
        gte: new Date(),
      },
    },
    include: {
      mentor: {
        select: {
          id: true,
          role: true,
          timeZone: true,
        },
      },
      mentee: {
        select: {
          username: true,
          imageUrl: true,
        },
      },
    },
  });

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-2xl">Upcoming sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full grid grid-cols-1 gap-4">
          {sessionRequests.length === 0 && (
            <div className="flex justify-center items-center h-[150px] border-1 bg-gray-100/50 rounded">
              <p className="text-xl font-light">No upcoming sessions</p>
            </div>
          )}
          {sessionRequests.map((session) => (
            <div key={session.id}>
              <SessionCard
                session={session}
                currUser={session.mentor}
                otherUser={session.mentee}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardSessionsUpcoming;

import React from "react";

import { db } from "@/lib/db";

import { SessionCard } from "@/components/shared/sessions/session-card";

type TDashBoardSessionsRequest = {
  userId: string;
};

const DashboardSessionsRequest = async ({
  userId,
}: TDashBoardSessionsRequest) => {
  const sessionRequests = await db.session.findMany({
    where: {
      mentorId: userId,
      status: "AWAITING_HOST",
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
    <section className="my-4 p-3 border shadow rounded-lg bg-background">
      <h3 className="text-2xl font-semibold ml-3">Requested sessions</h3>
      <div className="w-full grid grid-cols-1 gap-4 my-4 md:px-6">
        {sessionRequests.length === 0 && (
          <div className="flex justify-center items-center h-[150px] border-1 bg-gray-100/50 rounded">
            <p className="text-xl font-light">No Awaiting Requests</p>
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
    </section>
  );
};

export default DashboardSessionsRequest;

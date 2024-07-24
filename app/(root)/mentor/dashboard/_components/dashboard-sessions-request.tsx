import React from "react";

import { db } from "@/lib/db";

import { Card, CardContent } from "@/components/ui/card";

import { SessionCard } from "@/components/shared/sessions/session-card";
import Image from "next/image";

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
    <div className="space-y-3 mt-4 md:mt-8">
      <h3 className="text-2xl font-semibold">Requested sessions</h3>

      <div className="w-full grid grid-cols-1 gap-4">
        {sessionRequests.length === 0 && (
          <Card className="flex flex-col justify-center items-center ">
            <CardContent className="flex flex-col items-center gap-3">
              <Image
                src="/no_data.svg"
                alt="avatar"
                width={100}
                height={100}
                className="object-cover mt-3"
              />
              <p className="text-muted-foreground">
                No recent requested sessions
              </p>
            </CardContent>
          </Card>
        )}
        {sessionRequests.map((session) => (
          <div key={session.id}>
            <SessionCard
              session={session}
              currentUser={session.mentor}
              otherUser={session.mentee}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSessionsRequest;

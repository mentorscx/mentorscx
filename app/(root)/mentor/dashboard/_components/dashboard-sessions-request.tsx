import React from "react";

import { db } from "@/lib/db";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-2xl">Requested sessions</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="w-full grid grid-cols-1 gap-4">
          {sessionRequests.length === 0 && (
            <div className="flex justify-center items-center min-h-[150px] border-1 bg-gray-100/50 rounded">
              <div className="my-3 flex flex-col items-center gap-3">
                <Image
                  src="/no_data.svg"
                  alt="avatar"
                  width={100}
                  height={100}
                  className="object-fit"
                />
                <p className="text-muted-foreground">
                  No recent requested sessions
                </p>
              </div>
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

export default DashboardSessionsRequest;

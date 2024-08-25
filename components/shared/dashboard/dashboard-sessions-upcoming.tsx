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
import Image from "next/image";
import { Role, SessionStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type TDashBoardSessionsUpcoming = {
  userId: string;
  role: Role;
};

// Fetch sessions based on the user role with appropriate include clauses
const fetchSessions = async (userId: string, role: Role) => {
  const whereClause =
    role === Role.MENTEE
      ? {
          menteeId: userId,
          status: SessionStatus.ACCEPTED,
          start: { gte: new Date() },
        }
      : {
          mentorId: userId,
          status: SessionStatus.ACCEPTED,
          start: { gte: new Date() },
        };

  // Common selection for mentor and mentee
  const userSelection = {
    select: {
      id: true,
      role: true,
      timeZone: true,
      username: true,
      imageUrl: true,
    },
  };

  return await db.session.findMany({
    where: whereClause,
    include: {
      mentee: userSelection,
      mentor: userSelection,
    },
  });
};

const DashboardSessionsUpcoming = async ({
  userId,
  role,
}: TDashBoardSessionsUpcoming) => {
  const sessions = await fetchSessions(userId, role);

  return (
    <div className="space-y-3 mt-4 md:mt-8">
      <h3 className="text-2xl font-semibold">Upcoming sessions</h3>

      <div className="w-full grid grid-cols-1 gap-4">
        {sessions.length === 0 && (
          <Card className="flex flex-col justify-center items-center ">
            <CardContent className="flex flex-col items-center gap-3">
              <Image
                src="/no_data.svg"
                alt="avatar"
                width={100}
                height={100}
                quality={100}
                layout="fixed"
                className="object-contain mt-3"
              />
              <p className="text-muted-foreground">No upcoming sessions</p>
              {role === Role.MENTEE && (
                <Button variant="secondary" asChild>
                  <Link href="/dashboard/search">
                    Browse for mentors and request call
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
        {sessions.map((session) => (
          <div key={session.id}>
            <SessionCard
              session={session}
              currentUser={
                role === Role.MENTOR ? session.mentor : session.mentee
              }
              otherUser={role === Role.MENTOR ? session.mentee : session.mentor}
              currentView={role}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSessionsUpcoming;

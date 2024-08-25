import { db } from "@/lib/db";
import DashboardInfoCard from "./dashboard-info-card";
import { SessionStatus } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const fetchQueuedSessions = async (userId: string) => {
  const queuedSessions = await db.session.findMany({
    where: {
      status: SessionStatus.ACCEPTED || SessionStatus.AWAITING_HOST,
      start: {
        gte: new Date(),
      },
      menteeId: userId,
    },
  });

  return queuedSessions.length;
};

export const DashBoardQueueLimit = async ({
  planName,
  userId,
}: {
  planName: string | undefined;
  userId: string;
}) => {
  // Determine the booking limit and icon based on the plan name

  const queuedSessionsCount = await fetchQueuedSessions(userId);
  const { bookingLimit } = (() => {
    switch (planName) {
      case "Moon":
        return { bookingLimit: 2 };
      case "Eclipse":
        return { bookingLimit: 4 };
      case "Sun":
        return { bookingLimit: 4 };
      default:
        return { bookingLimit: 0 };
    }
  })();

  return (
    <section>
      <DashboardInfoCard
        title="Available to Queue"
        displayValue={`${queuedSessionsCount}/${bookingLimit}`}
        footer="calls"
      />
    </section>
  );
};

export const DashboardProfileLevel = () => {
  // TODO: complete the levels
  return (
    <section>
      <Card className="min-w-[100px]">
        <CardHeader className="pb-1">
          <CardDescription className="font-semibold">You're a</CardDescription>
          <CardTitle className="flex gap-1 text-lg">Hunab Learner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground flex items-center justify-start">
            Next Level: 7/8 calls
            <Button variant="ghost">
              <InfoIcon />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

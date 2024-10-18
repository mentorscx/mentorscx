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
import { getCompletedSessionsCount } from "@/lib/actions/helper.action";
import { MenteeLevelsDialog } from "@/components/modals/dashboard-levels-modal";

export async function fetchQueuedSessionsCount(
  userId: string
): Promise<number> {
  const queuedSessions = await db.session.count({
    where: {
      menteeId: userId,
      status: {
        in: [
          SessionStatus.ACCEPTED,
          SessionStatus.AWAITING_HOST,
          SessionStatus.AWAITING_REVIEW,
          SessionStatus.DONE,
        ],
      },
    },
  });

  return queuedSessions;
}

export const DashBoardQueueLimit = async ({
  planName,
  userId,
}: {
  planName: string | undefined;
  userId: string;
}) => {
  const queuedSessionsCount = (await fetchQueuedSessionsCount(userId)) || 0;
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

export const DashboardProfileLevel = async ({ userId }: { userId: string }) => {
  const ranks = [
    { name: "Hunab Learner", icon: "🌞", minReviews: 0, maxReviews: 7 },
    { name: "Chaak Seeker", icon: "🌀", minReviews: 8, maxReviews: 21 },
    { name: "Balam Explorer", icon: "🐆", minReviews: 22, maxReviews: 44 },
    { name: "Itzamna Scholar", icon: "🦅", minReviews: 45, maxReviews: 79 },
    {
      name: "K'inich Ahau Achiever",
      icon: "☀️",
      minReviews: 80,
      maxReviews: Infinity,
    },
  ];

  const completedSessions = (await getCompletedSessionsCount(userId)) || 0;

  // Calculate current rank based on completed sessions
  const currentRank = ranks.find(
    (rank) =>
      completedSessions >= rank.minReviews &&
      completedSessions <= rank.maxReviews
  ) || { name: "Unknown", icon: "❓" };

  // Calculate next rank information (if any)
  const nextLevel = ranks.find((rank) => completedSessions < rank.minReviews);
  const nextLevelInfo = nextLevel
    ? {
        nextLevelName: nextLevel.name,
        nextLevelThreshold: nextLevel.minReviews,
      }
    : { nextLevelName: "Max Level", nextLevelThreshold: completedSessions }; // If no next level, user is at max

  return (
    <section>
      <Card className="min-w-[100px]">
        <CardHeader className="pb-1">
          <CardDescription className="font-semibold">You're a</CardDescription>
          <CardTitle className="flex gap-1 text-base">
            {currentRank.icon} {currentRank.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground flex items-center justify-start">
            Next Level: {completedSessions}/{nextLevelInfo.nextLevelThreshold}{" "}
            calls
            <MenteeLevelsDialog />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

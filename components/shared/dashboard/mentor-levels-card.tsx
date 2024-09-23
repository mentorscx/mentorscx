import { MentorLevelsDialog } from "@/components/modals/dashboard-levels-modal";
import {
  CardDescription,
  CardTitle,
  CardContent,
  CardHeader,
  Card,
} from "@/components/ui/card";
import { getCompletedSessionsCount } from "@/lib/actions/helper.action";

export const MentorLevelsCard = async ({ mentorId }: { mentorId: string }) => {
  const ranks = [
    { name: "Ixchel Initiate", icon: "🌙", minReviews: 0, maxReviews: 7 },
    { name: "Chilan Apprentice", icon: "📜", minReviews: 8, maxReviews: 21 },
    { name: "Nacom Advisor", icon: "💎", minReviews: 22, maxReviews: 44 },
    { name: "Ah Kin Master", icon: "☀️", minReviews: 45, maxReviews: 79 },
    { name: "K'uhul Sage", icon: "🏔️", minReviews: 80, maxReviews: Infinity },
  ];

  const completedSessions = (await getCompletedSessionsCount(mentorId)) || 0;

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
            <MentorLevelsDialog />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

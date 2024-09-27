import React, { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { db } from "@/lib/db";

import { DashboardFeedbackForm } from "@/components/shared/dashboard/dashboard-feedback-form";
import { MenteeDashBoardProfileCard } from "@/components/shared/dashboard/dashboard-profile-card";
import DashBoardProfileViews from "@/components/shared/dashboard/dashboard-profile-views";
import DashBoardSessionCount from "@/components/shared/dashboard/dashbord-session-count";
import DashBoardUsersBooked from "@/components/shared/dashboard/dashboard-users-booked";
import DashboardSessionsUpcoming from "@/components/shared/dashboard/dashboard-sessions-upcoming";
import DashboardSessionsRequest from "@/components/shared/dashboard/dashboard-sessions-request";
import { OnboardingChecklist } from "@/components/shared/onboarding-checklist";
import { Role } from "@prisma/client";

import {
  DashboardCardSkelton,
  DashboardProfileSkelton,
  DashboardSessionSkeleton,
} from "@/components/shared/dashboard/dashboard-skelton";
import { Card } from "@/components/ui/card";
import { pricingPlans } from "@/constants/data";
import {
  DashboardProfileLevel,
  DashBoardQueueLimit,
} from "@/components/shared/dashboard/mentee-profile-cards";

export const metadata: Metadata = {
  title: "Dashboard | Mentors CX",
  description:
    "Access your Mentors CX dashboard. Manage your mentorship activities and track your progress.",
};

type MenteeDashboardPageProps = {
  id: string;
  imageUrl: string;
  username: string;
};

const MenteeDashboardPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      expertise: true,
      experiences: true,
      toolkit: true,
      industries: true,
      Subscription: true,
    },
  });

  if (!user) return null;

  if (!user.isOnboarded) redirect("/onboard/1");

  const { id, imageUrl, username } = user;

  const planName = pricingPlans.find(
    (plan) =>
      plan.monthlyPriceId === user.Subscription?.planId ||
      plan.annualPriceId === user.Subscription?.planId
  )?.name;

  return (
    <div className="max-w-5xl mx-auto pt-16 p-3">
      {/* PAGE TITLE */}

      <div className="w-full flex flex-col lg:flex-row gap-4 mt-4">
        {/* WELCOME BACK AND STATS*/}
        <Card className="w-full p-3 border shadow rounded-lg bg-background col-start-1 col-span-2">
          <h1 className="text-2xl font-semibold">Welcome {username}!</h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 my-4 md:px-4">
            <Suspense fallback={<DashboardCardSkelton />}>
              <DashBoardQueueLimit planName={planName} userId={id} />
            </Suspense>
            <Suspense fallback={<DashboardCardSkelton />}>
              <DashBoardSessionCount userId={id} />
            </Suspense>
            <Suspense fallback={<DashboardCardSkelton />}>
              <DashboardProfileLevel userId={userId} />
            </Suspense>
          </div>
        </Card>
        {/* PROFILE AND SHARE DETAILS */}
        <div className="col-span-1">
          <Suspense fallback={<DashboardProfileSkelton />}>
            <MenteeDashBoardProfileCard
              userId={id}
              userImage={imageUrl}
              userName={username}
              planName={planName}
            />
          </Suspense>
        </div>
      </div>

      {/* ONBOARDING CHECKLIST */}
      <OnboardingChecklist user={user} route="/dashboard/dashboard" />

      {/* SESSIONS REQUESTS */}
      <Suspense fallback={<DashboardSessionSkeleton />}>
        <DashboardSessionsRequest userId={id} role={Role.MENTEE} />
      </Suspense>
      <Suspense fallback={<DashboardSessionSkeleton />}>
        <DashboardSessionsUpcoming userId={id} role={Role.MENTEE} />
      </Suspense>

      {/* FEATURE REQUEST FORM */}
      <div className="w-full col-span-3">
        <DashboardFeedbackForm userId={id} />
      </div>
    </div>
  );
};

export default MenteeDashboardPage;

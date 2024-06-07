import React, { Suspense } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { db } from "@/lib/db";

import { DashboardFeedbackForm } from "./_components/dashboard-feedback-form";
import DashBoardProfileCard from "./_components/dashboard-profile-card";
import DashBoardProfileViews from "./_components/dashboard-profile-views";
import DashBoardSessionCount from "./_components/dashbord-session-count";
import DashBoardUsersBooked from "./_components/dashboard-users-booked";
import DashboardSessionsUpcoming from "./_components/dashboard-sessions-upcoming";
import DashboardSessionsRequest from "./_components/dashboard-sessions-request";
import { OnboardingChecklist } from "@/components/shared/onboarding-checklist";
import { Role } from "@prisma/client";
import { Skeleton } from "@nextui-org/react";
import {
  DashboardCardSkelton,
  DashboardProfileSkelton,
  DashboardSessionSkeleton,
} from "./_components/dashboard-skelton";

export const metadata: Metadata = {
  title: "Dashboard | Mentors CX",
  description:
    "Access your Mentors CX dashboard. Manage your mentorship activities and track your progress.",
};

type MentorDashboardPageProps = {
  id: string;
  imageUrl: string;
  username: string;
};

const MentorDashboardPage = async () => {
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
    },
  });

  if (!user) return null;

  // Redirect if the user is not MENTOR
  if (user.role !== Role.MENTOR) {
    redirect("/dashboard/search");
  }

  const { id, imageUrl, username } = user;

  return (
    <div className="max-w-5xl mx-auto pt-[80px] p-3">
      {/* PAGE TITLE */}
      <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* WELCOME BACK AND STATS*/}
        <section className="w-full mt-4 p-3 border shadow rounded-lg bg-background md:pl-6 col-start-1 col-span-2">
          <h1 className="text-2xl font-semibold">Welcome back {username}!</h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 my-4 md:px-4">
            <Suspense fallback={<DashboardCardSkelton />}>
              <DashBoardProfileViews userId={id} />
            </Suspense>
            <Suspense fallback={<DashboardCardSkelton />}>
              <DashBoardUsersBooked userId={id} />
            </Suspense>
            <Suspense fallback={<DashboardCardSkelton />}>
              <DashBoardSessionCount userId={id} />
            </Suspense>
          </div>
        </section>

        {/* PROFILE AND SHARE DETAILS */}
        <div className="col-span-1">
          <Suspense fallback={<DashboardProfileSkelton />}>
            <DashBoardProfileCard
              userId={id}
              userImage={imageUrl}
              userName={username}
              rating={4.51}
              sessions={345}
              reviews={342}
            />
          </Suspense>
        </div>
      </div>

      {/* ONBOARDING CHECKLIST */}
      <OnboardingChecklist user={user} route="dashboard" />

      {/* SESSIONS REQUESTS */}
      <Suspense fallback={<DashboardSessionSkeleton />}>
        <DashboardSessionsRequest userId={id} />
      </Suspense>
      <Suspense fallback={<DashboardSessionSkeleton />}>
        <DashboardSessionsUpcoming userId={id} />
      </Suspense>

      {/* FEATURE REQUEST FORM */}
      <div className="w-full col-span-3">
        <DashboardFeedbackForm userId={id} />
      </div>
    </div>
  );
};

export default MentorDashboardPage;

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { Role } from "@prisma/client";

import { db } from "@/lib/db";
import { ProfileDisplayPage } from "@/components/shared/profile/profile-display";

export const metadata: Metadata = {
  title: "Profile | Mentors CX",
  description:
    "Update and personalize your Mentors CX profile. Ensure your information is up-to-date.",
};

const MentorProfilePage = async () => {
  const { userId } = auth();

  // If the user is not authenticated, redirect to sign-in page immediately
  if (!userId) {
    redirect("/sign-in");
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
      languages: true,
    },
  });

  // If the user profile is not found, return an appropriate message
  if (!user) {
    return <div>Profile not found</div>;
  }

  // Redirect if the user is not MENTOR
  if (user.role !== Role.MENTOR) {
    redirect("/dashboard/search");
  }

  return (
    <div className="pt-[80px]">
      <ProfileDisplayPage user={user} profileId={user.id} />
    </div>
  );
};

export default MentorProfilePage;

"use router";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { ProfileDisplayPage } from "@/components/shared/profile/profile-display";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile | Mentors CX",
  description:
    "Update and personalize your Mentors CX profile. Ensure your information is up-to-date.",
};

const MenteeProfilePage = async () => {
  const { userId } = auth();

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

  if (!user) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="pt-[80px]">
      <ProfileDisplayPage user={user} profileId={user.id} />
    </div>
  );
};

export default MenteeProfilePage;

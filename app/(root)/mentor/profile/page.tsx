import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

import { Role } from "@prisma/client";

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

  const currUser = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      role: true,
    },
  });

  // If the user profile is not found, return an appropriate message
  if (!currUser) {
    return <div>Profile not found</div>;
  }

  // Redirect if the user is not MENTOR
  if (currUser.role !== Role.MENTOR) {
    redirect("/dashboard/search");
  }

  if (currUser) {
    redirect(`/mentor/profile/${currUser.id}`);
  }

  return <div>Profile Page</div>;
};

export default MentorProfilePage;

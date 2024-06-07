import React from "react";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import Onboarding01 from "./_components/profile-form";

const Onboarding01Page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      position: true,
      organization: true,
      shortBio: true,
      bio: true,
      portfolioWebsite: true,
    },
  });

  return (
    <div>
      <Onboarding01 user={JSON.stringify(user)} />
    </div>
  );
};

export default Onboarding01Page;

import React from "react";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import Onboarding04 from "./_components/profile-form";

const Onboarding04Page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findFirst({
    where: {
      clerkId: userId,
    },
    include: {
      expertise: true,
    },
  });

  return (
    <div>
      <Onboarding04 user={JSON.stringify(user)} />
    </div>
  );
};

export default Onboarding04Page;

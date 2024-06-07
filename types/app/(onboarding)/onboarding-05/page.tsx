import React from "react";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import Onboarding05 from "./_components/profile-form";

const Onboarding05Page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      toolkit: true,
    },
  });

  return (
    <div>
      <Onboarding05 user={JSON.stringify(user)} />
    </div>
  );
};

export default Onboarding05Page;

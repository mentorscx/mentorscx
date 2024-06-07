import React from "react";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import Onboarding03 from "./_components/profile-form";

const Onboarding03Page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findFirst({
    where: {
      clerkId: userId,
    },
    include: {
      industries: true,
    },
  });

  return (
    <div>
      <Onboarding03 user={JSON.stringify(user)} />
    </div>
  );
};

export default Onboarding03Page;

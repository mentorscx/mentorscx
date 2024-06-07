import React from "react";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import Onboarding02 from "./_components/profile-form";

const Onboarding02Page = async () => {
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
      city: true,
      role: true,
      country: true,
      languages: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div>
      <Onboarding02 user={JSON.stringify(user)} />
    </div>
  );
};

export default Onboarding02Page;

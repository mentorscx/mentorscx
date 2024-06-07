import React from "react";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import Onboarding06 from "./_components/profile-form";

const Onboarding06Page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  return (
    <div>
      <Onboarding06
        user={JSON.stringify({
          id: user && user.id,
          duration: user && user.duration?.toString(),
          price: user && user.price?.toString(),
        })}
      />
    </div>
  );
};

export default Onboarding06Page;

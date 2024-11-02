import PartnerShowcase from "@/components/rewards/partnerships";
import React from "react";
import { redirect } from "next/navigation";

import { ProAccessWrapper } from "@/components/wrappers/ProAccessWrapper";
import { auth } from "@clerk/nextjs/server";

import { isProUser } from "@/lib/utils";

import { db } from "@/lib/db";

const getCurrentUser = async () => {
  const { userId: clerkId } = await auth();

  if (!clerkId) redirect("/sign-in");

  const dbUser = await db.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      Subscription: true,
    },
  });

  return dbUser;
};

const RewardsPage = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  const proUser = isProUser(user?.Subscription);

  return (
    <div className="max-w-5xl mx-auto pt-16 p-3">
      <ProAccessWrapper active={proUser}>
        <PartnerShowcase />
      </ProAccessWrapper>
    </div>
  );
};

export default RewardsPage;

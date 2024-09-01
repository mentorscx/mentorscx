import { Suspense } from "react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import ChatLayout from "@/components/chats/ChatLayout";
import { ProAccessWrapper } from "@/components/wrappers/ProAccessWrapper";
import { auth } from "@clerk/nextjs/server";
import Loading from "../loading";
import { isProUser } from "@/lib/utils";

interface User {
  clerkId: string;
  Subscription?: Subscription;
}

interface Subscription {
  currentPeriodEnd: number;
  credits: number;
  status: string;
}

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

const ChatsPage = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  const proUser = isProUser(user?.Subscription);

  return (
    <ProAccessWrapper active={proUser}>
      <ChatLayout />
    </ProAccessWrapper>
  );
};

const ChatsPageWithSuspense = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ChatsPage />
    </Suspense>
  );
};

export default ChatsPageWithSuspense;

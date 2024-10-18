import type { Metadata } from "next";
import ChatLayout from "@/components/chats/ChatLayout";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { MenteeLevelsDialog } from "@/components/modals/dashboard-levels-modal";
import MentorSubscribeModal from "@/components/modals/mentor-membership-modal";

export const metadata: Metadata = {
  title: "Messaging | Mentors CX",
  description:
    "Communicate with your mentors and mentees. Use the Mentors CX messaging system for seamless interaction.",
};

const ChatsPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      role: true,
    },
  });

  if (!user) return null;
  if (user.role !== Role.MENTOR)
    return <MentorSubscribeModal isDialogOpen={true} />;

  return <ChatLayout />;
};

export default ChatsPage;

import type { Metadata } from "next";
import ChatLayout from "@/components/chats/ChatLayout";
import React from "react";

export const metadata: Metadata = {
  title: "Messaging | Mentors CX",
  description:
    "Communicate with your mentors and mentees. Use the Mentors CX messaging system for seamless interaction.",
};

const ChatsPage = () => {
  return <ChatLayout />;
};

export default ChatsPage;

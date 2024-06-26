import ChatLayout from "@/components/chats/ChatLayout";
import React from "react";
import MentorRedirectDialog from "@/components/modals/redirect-mentors-modal";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Messaging | Mentors CX",
  description:
    "Communicate with your mentors and mentees. Use the Mentors CX messaging system for seamless interaction.",
};

const ChatsPage = () => {
  return <MentorRedirectDialog isOpen={true} />;
  // return <ChatLayout />;
};

export default ChatsPage;

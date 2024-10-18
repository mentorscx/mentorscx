import SessionChatLayout from "@/components/chats/SessionChatLayout";
import React from "react";

const SessionChat = (props: { otherUserId: string }) => {
  return <SessionChatLayout otherUserId={props.otherUserId} />;
};

export default SessionChat;

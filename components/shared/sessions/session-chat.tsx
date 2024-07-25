import SessionChatLayout from "@/components/chats/SessionChatLayout";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const SessionChat = (props: { otherId: string }) => {
  return (
    <Card className="mt-4 pt-3 h-[800px]">
      <CardContent className="h-full">
        <SessionChatLayout otherId={props.otherId} />
      </CardContent>
    </Card>
  );
};

export default SessionChat;

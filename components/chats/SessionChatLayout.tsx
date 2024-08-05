"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import useInitializeChatChannel from "./useInitializeChatChannel";
import { Loader2Icon, MessageCircleIcon } from "lucide-react";

const LoadingState = (props: { message: string }) => (
  <Card className="mt-4 pt-3 h-[200px]">
    <CardContent className="h-full">
      <div className="w-full h-full flex items-center justify-center flex-col">
        <Loader2Icon className="h-12 w-12 animate-spin text-primary-500" />
        <div>{props.message}</div>
      </div>
    </CardContent>
  </Card>
);

const NoMessagesState = () => (
  <Card className="mt-4 pt-3 h-[200px]">
    <CardContent className="h-full">
      <div className="w-full h-full flex items-center justify-center flex-col">
        <MessageCircleIcon className="h-12 w-12 text-primary-500" />
        <div>No Messages</div>
      </div>
    </CardContent>
  </Card>
);

const SessionChatLayout = (props: { otherUserId: string }) => {
  const [chatClient, channel] = useInitializeChatChannel(props.otherUserId);

  if (!chatClient) {
    return <LoadingState message="Loading the chat..." />;
  }

  if (chatClient._user?.id === props.otherUserId) {
    return <NoMessagesState />;
  }

  if (!channel) {
    return <LoadingState message="Setting up the channel..." />;
  }

  return (
    <Card className="mt-4 pt-3 h-[600px]">
      <CardContent className="h-full">
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </CardContent>
    </Card>
  );
};

export default SessionChatLayout;

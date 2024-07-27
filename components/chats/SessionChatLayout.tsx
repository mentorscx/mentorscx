"use client";
import React from "react";

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
import { Loader2Icon } from "lucide-react";

const SessionChatLayout = (props: { otherId: string }) => {
  const [chatClient, channel] = useInitializeChatChannel(props.otherId);

  if (!chatClient) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col">
        <div>
          <Loader2Icon className="h-12 w-12 animate-spin text-primary-500" />
        </div>
        <div>Loading the chat...</div>
      </div>
    );
  }
  if (!channel) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col">
        <div>
          <Loader2Icon className="h-12 w-12 animate-spin text-primary-500" />
        </div>
        <div>setting up the channel...</div>
      </div>
    );
  }

  return (
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
  );
};

export default SessionChatLayout;

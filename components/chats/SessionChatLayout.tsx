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

const SessionChatLayout = (props: { otherId: string }) => {
  const [chatClient, channel] = useInitializeChatChannel(props.otherId);

  if (!chatClient) return <div>Setting up connection...</div>;
  if (!channel) return <div>setting up channel...</div>;

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

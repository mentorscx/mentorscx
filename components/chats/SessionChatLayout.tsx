"use client";
import React from "react";

import { useState, useEffect } from "react";
import type { User, Channel as StreamChannel } from "stream-chat";
import useInitializeChatClient from "./useInitializeChatClient";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

const SessionChatLayout = (props: { otherId: string }) => {
  const chatClient = useInitializeChatClient();
  const [channel, setChannel] = useState<StreamChannel>();

  useEffect(() => {
    if (!chatClient) return;

    const currentUserID = chatClient._user?.id;
    const otherUserID = props.otherId;
    if (!currentUserID) return;
    const members = [currentUserID, otherUserID];

    const channel = chatClient.channel("messaging", {
      members: members,
    });
    setChannel(channel);
  }, [chatClient]);

  if (!chatClient) return <div>Setting up connection...</div>;

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

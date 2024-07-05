import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import useConversationStore from "@/hooks/use-conversation-store";
import { channel } from "diagnostics_channel";

interface ChatChannelProps {
  show: boolean;
  hideChannelOnThread: boolean;
}

const ActiveChannelSetter = () => {
  const { client, setActiveChannel } = useChatContext();
  const activeUsers = useConversationStore((state) => state.users);

  useEffect(() => {
    const channel = client.channel("messaging", {
      members: activeUsers,
    });
    setActiveChannel(channel);
  }, []);

  return null;
};

export default function ChatChannel({
  show,
  hideChannelOnThread,
}: ChatChannelProps) {
  const { client, setActiveChannel } = useChatContext();

  const activeUsers = useConversationStore((state) => state.users);

  useEffect(() => {
    if (activeUsers.length > 1) {
      const channel = client.channel("messaging", {
        members: activeUsers,
      });

      setActiveChannel?.(channel);
    }
  }, []);

  return (
    <div className={`h-full w-full ${show ? "block" : "hidden"}`}>
      <ActiveChannelSetter />
      <Channel>
        <Window hideOnThread={hideChannelOnThread}>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
  );
}

"use client";
import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import useConversationStore from "@/hooks/use-conversation-store";

interface ChatChannelProps {
  show: boolean;
  hideChannelOnThread: boolean;
}

const ActiveChannelSetter = () => {
  const { client, setActiveChannel } = useChatContext();
  const activeUsers = useConversationStore((state) => state.users);
  const clearUsers = useConversationStore((state) => state.clearUsers);

  useEffect(() => {
    if (activeUsers.length > 1) {
      const channel = client.channel("messaging", {
        members: activeUsers,
      });
      setActiveChannel(channel);
    }

    return () => {
      clearUsers();
    };
  }, []);

  return null;
};

export default function ChatChannel({
  show,
  hideChannelOnThread,
}: ChatChannelProps) {
  return (
    <div className={`h-full w-full ${show ? "block" : "hidden"}`}>
      <Channel>
        <ActiveChannelSetter />
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

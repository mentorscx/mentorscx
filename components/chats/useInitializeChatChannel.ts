import { useState, useEffect } from "react";
import useInitializeChatClient from "./useInitializeChatClient";
import type { Channel as StreamChannel } from "stream-chat";
import type { StreamChat, Channel, DefaultGenerics } from "stream-chat";
import useChatStore from "@/hooks/use-chat-client-store";

const useInitializeChatChannel = (
  otherUserId: string
): [
  StreamChat<DefaultGenerics> | null,
  Channel<DefaultGenerics> | undefined,
] => {
  const chatClient = useInitializeChatClient();
  const [channel, setChannel] = useState<StreamChannel>();
  const setActiveChannel = useChatStore((state) => state.setChannel);
  const clearActiveChannel = useChatStore((state) => state.clearChannel);

  useEffect(() => {
    if (!chatClient || !chatClient._user || !otherUserId) return;

    const currentUserID = chatClient._user.id;
    if (!currentUserID) return;

    const initChannel = chatClient.channel("messaging", {
      members: [currentUserID, otherUserId],
    });

    setChannel(initChannel);
    setActiveChannel(initChannel);

    return () => {
      clearActiveChannel();
    };
  }, [chatClient, otherUserId]);

  return [chatClient, channel];
};

export default useInitializeChatChannel;

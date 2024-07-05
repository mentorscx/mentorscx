"use client";

import useWindowSize from "@/hooks/useWindowSize";
import { mdBreakpoint } from "@/lib/tailwind";
import { useUser } from "@clerk/nextjs";

import {
  Menu,
  MessageSquareIcon,
  MessageSquarePlus,
  Search,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Chat, LoadingIndicator, MessageSimple } from "stream-chat-react";
import ChatChannel from "./ChatChannel";
import ChatSidebar from "./ChatSidebar";
import useInitializeChatClient from "./useInitializeChatClient";
import { Button } from "../ui/button";

export default function ChatLayout() {
  const chatClient = useInitializeChatClient();

  const { user } = useUser();

  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);

  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= mdBreakpoint;

  useEffect(() => {
    if (windowSize.width >= mdBreakpoint) setChatSidebarOpen(false);
  }, [windowSize.width]);

  const handleSidebarOnClose = useCallback(() => {
    setChatSidebarOpen(false);
  }, []);

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div className="h-full w-full pt-[80px] lg:flex lg:items-center lg:justify-center">
        <div className="m-auto flex h-full lg:h-[80%] lg:w-[80%] min-w-[350px] max-w-[1600px] flex-col shadow-sm  ">
          <Chat client={chatClient}>
            <div className="flex justify-center border-b border-b-[#DBDDE1] md:hidden lg:rounded-lg p-3">
              <Button
                onClick={() => setChatSidebarOpen(!chatSidebarOpen)}
                variant="ghost"
              >
                {!chatSidebarOpen ? (
                  <span className="flex items-center">
                    <Search className="w-5 h-5 mr-1" />
                    Search chats
                  </span>
                ) : (
                  <span className="flex items-center">
                    <MessageSquareIcon className="w-5 h-5 mr-1" />
                    Go to chat
                  </span>
                )}
              </Button>
            </div>
            <div className="flex h-full flex-row overflow-y-auto">
              <ChatSidebar
                user={user}
                show={isLargeScreen || chatSidebarOpen}
                onClose={handleSidebarOnClose}
              />
              <ChatChannel
                show={isLargeScreen || !chatSidebarOpen}
                hideChannelOnThread={!isLargeScreen}
              />
            </div>
          </Chat>
        </div>
      </div>
    </div>
  );
}

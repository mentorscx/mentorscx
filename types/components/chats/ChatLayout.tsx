"use client";

import useWindowSize from "@/hooks/useWindowSize";
import { mdBreakpoint } from "@/lib/tailwind";
import { useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Chat, LoadingIndicator } from "stream-chat-react";
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
      <div className="h-full bg-gray-100 w-full pt-[80px]">
        <div className="m-auto flex h-full min-w-[350px] max-w-[1600px] flex-col shadow-sm">
          <Chat client={chatClient}>
            <div className="flex justify-center border-b border-b-[#DBDDE1] md:hidden">
              <Button
                onClick={() => setChatSidebarOpen(!chatSidebarOpen)}
                variant="ghost"
              >
                {!chatSidebarOpen ? (
                  <span className="flex items-center gap-1">
                    <Menu /> Menu
                  </span>
                ) : (
                  <X />
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

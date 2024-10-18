"use client";

import { ReactNode } from "react";

import { BellIcon, Loader2Icon } from "lucide-react";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

const NotificationLoader = () => {
  return (
    <div className="relative flex size-10 items-center justify-center rounded-lg ">
      <>
        <BellIcon className="h-6 w-6 text-slate-500 " />
        <div className="absolute -right-1 -top-1 z-20 w-4 h-4 rounded-full  text-xs animate-spin">
          <Loader2Icon className="w-4 h-4" />
        </div>
      </>
    </div>
  );
};

export function NotificationsProvider({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider id="mentorscx">
        <ClientSideSuspense fallback={<NotificationLoader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

export default NotificationsProvider;

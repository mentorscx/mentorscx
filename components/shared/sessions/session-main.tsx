import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Check, Video, XCircle } from "lucide-react";
import { EmptyBookingsCard } from "@/components/shared/empty-bookings-card";
import { SessionList } from "./session-list";

import { TSession } from "@/types";
import { Role } from "@prisma/client";

type SessionTypeKey = "requested" | "upcoming" | "completed" | "archived";

interface SessionTypeInfo {
  type: SessionTypeKey;
  icon: JSX.Element;
  label: string;
  emptyMessage: {
    title: string;
    description: string;
  };
}

type SessionMainProps = {
  sessions: {
    [key in SessionTypeKey]: TSession[];
  };
  currentView: Role;
  activeTab: string;
};

const sessionConfig: SessionTypeInfo[] = [
  {
    type: "requested",
    icon: <Send className="text-gray-700 mr-1 h-4 w-4" />,
    label: "Requests",
    emptyMessage: {
      title: "No Requested Bookings",
      description:
        "You have no requested bookings. As soon as you request the meeting will show up here.",
    },
  },
  {
    type: "upcoming",
    icon: <Video className="mr-1 h-4 w-4 text-blue-700" />,
    label: "Upcoming",
    emptyMessage: {
      title: "No upcoming bookings",
      description:
        "You have no upcoming bookings. As soon as someone books a time with you it will show here.",
    },
  },
  {
    type: "completed",
    icon: <Check className="mr-1 h-4 w-4 text-green-700" />,
    label: "Completed",
    emptyMessage: {
      title: "No completed bookings",
      description:
        "You have no completed bookings. Your canceled bookings show up here.",
    },
  },
  {
    type: "archived",
    icon: <XCircle className="mr-1 h-4 w-4 text-red-700" />,
    label: "Archived",
    emptyMessage: {
      title: "No canceled bookings",
      description:
        "You have no canceled bookings. Your canceled bookings show up here.",
    },
  },
];

const SessionMain = (props: SessionMainProps) => (
  <Tabs defaultValue={props.activeTab} className="p-6">
    <TabsList>
      {sessionConfig.map(({ type, icon, label }) => (
        <TabsTrigger key={type} value={type} className="flex items-center">
          {icon}
          <p className="hidden md:block">{label}</p>
        </TabsTrigger>
      ))}
    </TabsList>
    {sessionConfig.map(({ type, emptyMessage }) => (
      <TabsContent key={type} value={type}>
        {props.sessions[type].length === 0 ? (
          <EmptyBookingsCard {...emptyMessage} />
        ) : (
          <SessionList
            sessions={props.sessions[type]}
            currentView={props.currentView}
          />
        )}
      </TabsContent>
    ))}
  </Tabs>
);

export default SessionMain;

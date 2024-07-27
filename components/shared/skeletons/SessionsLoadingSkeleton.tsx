import React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Send, Check, Video, XCircle, Loader2 } from "lucide-react";

type SessionTypeKey = "requested" | "upcoming" | "completed" | "cancelled";

interface SessionTypeInfo {
  type: SessionTypeKey;
  icon: JSX.Element;
  label: string;
}

const sessionConfig: SessionTypeInfo[] = [
  {
    type: "requested",
    icon: <Send className="text-gray-700 mr-1 h-4 w-4" />,
    label: "Requests",
  },
  {
    type: "upcoming",
    icon: <Video className="mr-1 h-4 w-4 text-blue-700" />,
    label: "Upcoming",
  },
  {
    type: "completed",
    icon: <Check className="mr-1 h-4 w-4 text-green-700" />,
    label: "Completed",
  },
  {
    type: "cancelled",
    icon: <XCircle className="mr-1 h-4 w-4 text-red-700" />,
    label: "Archived",
  },
];

const SessionsLoadingSkelton = () => {
  return (
    <div className="mx-auto max-w-5xl pt-[80px]">
      <div className="p-6 w-full">
        {/*TABS SKELETON*/}
        <div className="w-full ">
          <Tabs className="w-[400px]">
            <TabsList>
              {sessionConfig.map(({ type, icon, label }) => (
                <TabsTrigger
                  key={type}
                  value={type}
                  className="flex items-center"
                >
                  {icon}
                  <p className="hidden md:block">{label}</p>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="bg-background flex w-full select-none flex-col items-center justify-center rounded-lg p-7 lg:p-20 border border-dashed mt-3">
            <div>
              <Loader2 className="w-16 h-16 text-primary rounded-full animate-spin" />
            </div>
            <p className="text-center text-lg mt-6">Loading your sessions...</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SessionsLoadingSkelton;

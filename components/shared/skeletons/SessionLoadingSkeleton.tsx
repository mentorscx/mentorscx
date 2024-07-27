import React from "react";

import { Loader2Icon } from "lucide-react";

const SessionLoadingSkelton = () => {
  return (
    <div className="mx-auto max-w-5xl pt-[80px]">
      <div className="p-6 w-full">
        {/*TABS SKELETON*/}
        <div className="w-full ">
          <div className="bg-background flex w-full select-none flex-col items-center justify-center rounded-lg p-7 lg:p-20 border border-dashed mt-3">
            <div>
              <Loader2Icon className="w-16 h-16 text-primary rounded-full animate-spin" />
            </div>
            <p className="text-center text-lg mt-6">Loading your sessions...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionLoadingSkelton;

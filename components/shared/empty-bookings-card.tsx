import { Calendar } from "lucide-react";
import React from "react";

interface EmptyBookingsCardProps {
  title: string;
  description: string;
}

export const EmptyBookingsCard = ({
  title,
  description,
}: EmptyBookingsCardProps) => {
  return (
    <div className="flex w-full select-none flex-col items-center justify-center rounded-lg p-7 lg:p-20 border border-dashed mt-6">
      <div>
        <Calendar className="w-16 h-16 text-primary " />
      </div>
      <div className="text-center text-xl mt-6">{title}</div>
      <div className=" mb-8 mt-3 text-center text-sm font-normal">
        {description}
      </div>
    </div>
  );
};

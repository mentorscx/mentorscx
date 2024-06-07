import React from "react";
import { MyCalendar } from "../../schedule/_components/mentor-calendar";

interface AvailabilityFormProps {
  user: string;
}

const AvailabilityForm = ({ user }: AvailabilityFormProps) => {
  return (
    <div className="flex items-center flex-col justify-center">
      <div className="mt-6 border  rounded-md p-4 w-full md:w-3/4">
        <div className="font-medium flex items-center justify-between">
          Please set your availability for the week
        </div>
      </div>

      <div className="mt-6 border rounded-md p-4 w-full md:w-3/4">
        <div className="font-medium flex items-center justify-between">
          <div className="flex items-center justify-center">
            <MyCalendar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityForm;

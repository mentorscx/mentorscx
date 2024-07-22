import React from "react";
import Image from "next/image";

const BookingCalendarHeader = () => {
  return (
    <div className="w-full mt-4 max-w-5xl mx-auto p-3 border shadow rounded bg-background md:pl-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-4">
          <Image
            src="/assets/schedule_tab.svg"
            alt="alt"
            width={50}
            height={50}
            className="shrink-0 object-fill w-24 h-24"
          />
          <div className="my-4">
            <h3 className="h3 flex items-center gap-2">Mentor Calendar</h3>
            <p className="muted font-semibold">
              Please choose available slots to book
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendarHeader;

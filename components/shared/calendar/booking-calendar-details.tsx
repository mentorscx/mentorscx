import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Globe, VideoIcon } from "lucide-react";

import { getInitials } from "@/lib/utils";

type BookingCalendarDetailsProps = {
  imageUrl: string;
  username: string;
  timeZone: string;
  meetingPreference: string;
  duration: number;
};

const BookingCalendarDetails = ({
  imageUrl,
  username,
  timeZone,
  meetingPreference,
  duration,
}: BookingCalendarDetailsProps) => {
  return (
    <section className="flex flex-col gap-2">
      <Avatar>
        <AvatarImage src={imageUrl} alt={username} />
        <AvatarFallback>{getInitials(username)}</AvatarFallback>
      </Avatar>
      <p className="text-sm font-semibold">{username}</p>
      <p className="text-xl font-semibold my-2">{duration} Min Meeting</p>
      <p className="flex items-center text-neutral-600">
        <Clock className="w-5 h-5 mr-1" />
        {duration} mins
      </p>
      <p className="flex items-center text-neutral-600">
        <VideoIcon className="w-5 h-5 mr-1 " />
        {meetingPreference.charAt(0).toUpperCase() + meetingPreference.slice(1)}
      </p>
      <p className="flex items-center text-neutral-600">
        <Globe className="w-5 h-5 mr-1" /> {timeZone}
      </p>
      <p className="muted">*sessions must be booked 48hrs in advance.</p>
    </section>
  );
};

export default BookingCalendarDetails;

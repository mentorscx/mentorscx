import React from "react";
import Link from "next/link";
import { CalandarForm } from "./calandar-form";
import { GoogleCalandarForm } from "./google-calendar-form";
import { User } from "@prisma/client";

type CalendarTabContentProps = {
  user: User;
};

const CalendarTabContent = ({ user }: CalendarTabContentProps) => {
  return (
    <>
      <div className="my-4 lg:my-8 p-3 border shadow-sm rounded">
        <p className="large">Connecting with mentees</p>
        <p className="muted">
          You can connect with mentees using Zoom and Google meets
          <Link href="/" className="text-blue-400 underline">
            (Learn more)
          </Link>
        </p>
      </div>

      <CalandarForm user={user} />
      <GoogleCalandarForm user={user} />
    </>
  );
};

export default CalendarTabContent;

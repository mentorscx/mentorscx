import React from "react";

import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CalendarTabHeading = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connecting with mentees</CardTitle>
        <CardDescription>
          <>
            <span>
              You can connect with mentees using Zoom and Google meets
            </span>
            <Link href="/" className="text-blue-400 underline">
              (Learn more)
            </Link>
          </>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CalendarTabHeading;

import React from "react";

import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CalendarTabHeading = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connecting with mentees</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <span>You can connect with mentees using Zoom and Google Meet</span>
          <span>
            <Button variant="link" asChild className="px-0">
              <Link href="/docs/communication-tool-links" target="_blank">
                (Learn More)
              </Link>
            </Button>
          </span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CalendarTabHeading;

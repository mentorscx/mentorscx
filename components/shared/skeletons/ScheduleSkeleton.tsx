import { Skeleton } from "@/components/ui/skeleton"
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

const ScheduleSkeleton = () => {
  return (
    <div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-2xl">Weekly Recurrence</CardTitle>
          <CardDescription>
            Set up your recurrent availability - set times repeat weekly
          </CardDescription>
        </CardHeader>

        <CardContent>
          <section className="flex gap-4 flex-wrap md:flex-col">
            <div className="flex gap-4">
              <Skeleton className="h-8 w-48 rounded-lg"></Skeleton>
              <Skeleton className="h-8 w-32 rounded-lg"></Skeleton>
              <Skeleton className="h-8 w-32 rounded-lg"></Skeleton>
              <Skeleton className="h-8 w-8 rounded-lg"></Skeleton>
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-8 w-48 rounded-lg"></Skeleton>
              <Skeleton className="h-8 w-32 rounded-lg"></Skeleton>
              <Skeleton className="h-8 w-32 rounded-lg"></Skeleton>
              <Skeleton className="h-8 w-8 rounded-lg"></Skeleton>
            </div>
          </section>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="flex gap-4">
            <Skeleton className="h-8 w-24 rounded-lg"></Skeleton>
            <Skeleton className="h-8 w-24 rounded-lg"></Skeleton>
          </div>

          <Skeleton className="h-5 w-56 rounded-md"></Skeleton>
        </CardFooter>
      </Card>

      <Card className="mt-4">
        <CardHeader className="flex flex-row justify-between items-center gap-4">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl">Specific Availability</CardTitle>
            <CardDescription>
              Add specific dates and times to your calendar
            </CardDescription>
          </div>

          <div className="space-y-1">
            <p className="muted !font-semibold">
              * click or drag to set a timeslot
            </p>
            <p className="muted !font-semibold">
              * right click to delete event
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <Skeleton className="h-[400px] md:h-[600px] w-full rounded-lg"></Skeleton>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleSkeleton;

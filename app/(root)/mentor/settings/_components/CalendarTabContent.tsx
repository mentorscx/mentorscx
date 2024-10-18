import React, { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import ZoomLinkForm from "./ZoomLinkForm";
import GoogleMeetLinkForm from "./GoogleMeetLinkForm";
import CalendarTabHeading from "./CalendarTabHeading";
import SyncGoogleCalendar from "./SyncGoogleCalendar";
import StripeConnectForm from "./StripeConnectForm";
import { IntegrationSkeleton } from "@/components/shared/skeletons/SettingsSkeleton";

type CalendarTabContentProps = {
  id: string;
  zoomLink: string | null;
  googleMeetLink: string | null;
};

const CalendarTabContent = async ({
  id,
  zoomLink,
  googleMeetLink,
}: CalendarTabContentProps) => {
  return (
    <div className="space-y-4 mt-6">
      <CalendarTabHeading />

      <Suspense
        fallback={
          <IntegrationSkeleton
            title="Sync your Google Calendar"
            description="You can connect your Google Calender"
          />
        }
      >
        <SyncGoogleCalendar />
      </Suspense>
      <Suspense
        fallback={
          <IntegrationSkeleton
            title="Connect your Stripe Account"
            description="You can connect your Stripe Account"
          />
        }
      >
        <StripeConnectForm userId={id} />
      </Suspense>
      <ZoomLinkForm id={id} zoomLink={zoomLink} />
      <GoogleMeetLinkForm id={id} googleMeetLink={googleMeetLink} />
    </div>
  );
};

export default CalendarTabContent;

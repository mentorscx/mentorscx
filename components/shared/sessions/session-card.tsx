import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { utcToZonedTime } from "date-fns-tz";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Role, Session, User } from "@prisma/client";
import { getInitials } from "@/lib/utils";
import { formatDateToWeekDDMonth, formatDateToHHMMToHHMM } from "@/lib/format";
import { TSession } from "@/types";

type SessionCardProps = TSession & {
  currentView: Role;
};

const StatusStyles: {
  [key: string]: string;
} = {
  AWAITING_HOST: "text-yellow-600 border-yellow-500 bg-yellow-100",
  ACCEPTED: "text-blue-600 border-blue-500 bg-blue-100",
  RESCHEDULED: "text-danger-600 border-danger-500 bg-danger-100",
  DECLINED: "text-slate-600 border-slate-500 bg-slate-200",
  CANCELLED: "text-slate-600 border-slate-500 bg-slate-200",
  COMPLETED: "text-green-600 border-green-500 bg-green-100",
  DONE: "text-orange-600 border-orange-500 bg-orange-100",
  REVIEWED: "text-sky-600 border-sky-500 bg-sky-100",
};

const SessionCardContent = (props: {
  session: Pick<Session, "start" | "end" | "duration" | "price" | "status">;
  timeZone: string;
}) => {
  // Transformations for the display
  const startInTimeZone = utcToZonedTime(
    new Date(props.session.start),
    props.timeZone
  );
  const endInTimeZone = utcToZonedTime(
    new Date(props.session.end),
    props.timeZone
  );

  return (
    <div className="flex w-fit justify-between items-start gap-4 flex-col md:flex-row">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="medium uppercase">
            {formatDateToWeekDDMonth(startInTimeZone)}
          </p>
          <p className="muted mt-2">
            {formatDateToHHMMToHHMM(startInTimeZone, endInTimeZone)}
          </p>
        </div>
        <div>
          <p className="medium uppercase">duration</p>
          <p className="muted mt-2">{props.session.duration}min</p>
        </div>
      </div>
      <div className="flex items-start justify-around gap-4">
        <div>
          <p className="medium uppercase">cost</p>
          <p
            className={`mt-2 ${
              props.session.price === 0
                ? "text-green-600 font-normal "
                : "text-muted-foreground"
            }`}
          >
            {props.session.price === 0
              ? "FREE"
              : `$${props.session.price.toFixed(2)}`}
          </p>
        </div>
        <div>
          <p className="medium uppercase">Status</p>
          <div
            className={`mt-2 px-2.5 py-1 font-semibold uppercase text-sm rounded-full ${
              StatusStyles[props.session.status]
            }`}
          >
            {props.session.status === "AWAITING_HOST"
              ? "PENDING"
              : props.session.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SessionCardHeader = (props: {
  session_id: string;
  imageUrl: string;
  username: string;
  objective: string;
  category: string;
  redirectURL: string;
}) => {
  return (
    <>
      <div className="w-full flex items-center gap-3 flex-row">
        <Avatar>
          <AvatarImage src={props.imageUrl} />
          <AvatarFallback>{getInitials(props.username)}</AvatarFallback>
        </Avatar>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start">
            <p className="large max-md:line-clamp-4">{props.objective}</p>
            <div className="mt-2 flex flex-col md:flex-row items-center gap-4 justify-start">
              <p className="small text-left">{props.username}</p>
              <Badge variant="secondary" className="rounded-full">
                {props.category}
              </Badge>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-4">
            <Button asChild variant="outline" className="min-w-[150px]">
              <Link href={`${props.redirectURL}/${props.session_id}`}>
                View <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const SessionCardFooter = (props: {
  session_id: string;
  redirectURL: string;
}) => {
  return (
    <div>
      <div className="flex md:hidden gap-4">
        <Button asChild variant="outline" className="min-w-[150px]">
          <Link href={`${props.redirectURL}/${props.session_id}`}>
            View <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export const SessionCard = (props: SessionCardProps) => {
  const redirectURL =
    props.currentView === Role.MENTOR ? "/mentor/sessions" : "/sessions";

  return (
    <Card className="w-full">
      <CardHeader className="py-3">
        <SessionCardHeader
          session_id={props.session.id}
          imageUrl={props.otherUser.imageUrl}
          username={props.otherUser.username}
          objective={props.session.objective}
          category={props.session.category}
          redirectURL={redirectURL}
        />
      </CardHeader>

      <Separator className="w-full my-3" />

      <CardContent>
        <SessionCardContent
          session={props.session}
          timeZone={props.currentUser.timeZone || "America/New_York"}
        />
      </CardContent>

      <Separator className="w-full md:hidden my-3" />

      <CardFooter className="block md:hidden">
        <SessionCardFooter
          session_id={props.session.id}
          redirectURL={redirectURL}
        />
      </CardFooter>
    </Card>
  );
};

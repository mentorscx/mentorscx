"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDateToWeekDDMonth, formatDateToHHMMToHHMM } from "@/lib/format";
import SessionAction from "@/app/(root)/_components/shared/session-action";
import { ChevronRight } from "lucide-react";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

import { toast } from "sonner";
import { updateSession } from "@/lib/actions/session.action";
import { Role, Session, SessionStatus } from "@prisma/client";
import { getInitials } from "@/lib/utils";

type CurrentPage = "MENTOR_DASHBOARD" | "MENTOR_SESSION" | "MENTEE_SESSIONS";

type SessionCardProps = {
  session: Session;
  currUser: {
    id: string;
    role: Role | null;
    timeZone: string | null;
  };
  otherUser: {
    username: string;
    imageUrl: string;
  };
  currPage?: CurrentPage;
};

const StatusStyles: {
  [key: string]: string;
} = {
  AWAITING_HOST: "text-yellow-600 border-yellow-500 bg-yellow-100",
  ACCEPTED: "text-blue-600 border-blue-500 bg-blue-100",
  RESCHEDULED: "text-danger-600 border-danger-500 bg-danger-100",
  REJECTED: "text-slate-600 border-slate-500 bg-slate-200",
  CANCELLED: "text-slate-600 border-slate-500 bg-slate-200",
  COMPLETED: "text-green-600 border-green-500 bg-green-100",
};

export const SessionCard = ({
  session,
  currUser,
  otherUser,
}: SessionCardProps) => {
  const router = useRouter();

  console.log(session);

  // Permissions based on the current Page, role and the session status
  const showViewButton = true;
  const showAcceptButton =
    currUser.role === "MENTOR" && session.status === "AWAITING_HOST";
  const showDeclineButton = session.status === "AWAITING_HOST";
  const showCancelButton = session.status === "ACCEPTED";
  const showActionButton =
    showAcceptButton || showDeclineButton || showCancelButton;

  // Transformations for the display
  const startInTimeZone = utcToZonedTime(
    new Date(session.start),
    currUser?.timeZone || "UTC"
  );
  const endInTimeZone = utcToZonedTime(
    new Date(session.end),
    currUser?.timeZone || "UTC"
  );

  // 2. Define a submit handler.
  const handleAcceptSession = async () => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await updateSession({
        id: session.id,
        status: "ACCEPTED",
        mentorId: currUser.id,
      });

      toast.success(" Accepted the session");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error...");
    }
  };

  const handleDeclineSession = async () => {
    try {
      await updateSession({
        id: session.id,
        status: SessionStatus.REJECTED,
        mentorId: currUser.id,
      });
      toast.success("Declined the session");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error...");
    }
  };

  const handleCancelSession = async () => {
    try {
      await updateSession({
        id: session.id,
        status: SessionStatus.CANCELLED,
        mentorId: currUser.id,
      });
      toast.success("Cancelled the session");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error...");
    }
  };

  return (
    <div className="mt-3 w-full rounded-md border-1 p-3 shadow-sm bg-gray-100/50">
      <div className="flex space-x-3">
        <div className="p-3">
          <Avatar>
            <AvatarImage src={otherUser.imageUrl} />
            <AvatarFallback>{getInitials(otherUser.username)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <p className="large max-md:line-clamp-4">{session.objective}</p>
              <div className="mt-2 flex flex-col md:flex-row items-center gap-4 justify-start">
                <p className="small text-left">{otherUser.username}</p>
                <Badge variant="secondary" className="rounded-full">
                  {session.category}
                </Badge>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-4">
              <Button asChild variant="outline" className="min-w-[150px]">
                <Link href={`/mentor/sessions/${session.id}`}>
                  View <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          <Separator className="w-full" />
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
                <p className="muted mt-2">{session.duration}min</p>
              </div>
            </div>
            <div className="flex items-start justify-around gap-4">
              <div>
                <p className="medium uppercase">cost</p>
                <p className="muted mt-2">${session.price}</p>
              </div>
              <div>
                <p className="medium uppercase">Status</p>
                <div
                  className={`mt-2 px-2.5 py-1 font-semibold uppercase text-sm rounded-full ${
                    StatusStyles[session.status]
                  }`}
                >
                  {session.status === "AWAITING_HOST"
                    ? "PENDING"
                    : session.status}
                </div>
              </div>
            </div>
          </div>
          <Separator className="w-full md:hidden" />

          {/* Button Actions */}
          <div className="block md:hidden">
            <div className="flex md:hidden gap-4">
              <Button asChild variant="outline" className="min-w-[150px]">
                <Link href={`/mentor/session/${session.id}`}>
                  View <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

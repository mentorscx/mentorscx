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

import { toast } from "sonner";
import { updateSession } from "@/lib/actions/session.action";
import { SessionStatus } from "@prisma/client";

interface SessionCardProps {
  session: string;
}

const SessionCard = ({ session }: SessionCardProps) => {
  const router = useRouter();
  const sessionJSON = JSON.parse(session);
  const { objective, start, end, cost, status, category, mentee, id, mentor } =
    sessionJSON;
  const { username, imageUrl } = mentee;
  const { id: mentorId, duration } = mentor;

  // 2. Define a submit handler.
  const handleAcceptSession = async () => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await updateSession({
        id,
        status: "ACCEPTED",
        mentorId,
      });

      toast.success(" Accepted the session");
      router.push("/mentor/session");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error...");
    }
  };

  const handleDeclineSession = async () => {
    try {
      await updateSession({
        id,
        status: SessionStatus.REJECTED,
        mentorId,
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
        id,
        status: SessionStatus.CANCELLED,
        mentorId,
      });
      toast.success("Cancelled the session");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error...");
    }
  };

  return (
    <div className="mt-3 w-full rounded border-1 p-3 shadow-sm">
      <div className="flex space-x-3">
        <div className="p-3">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="large max-md:line-clamp-4">{objective}</p>
              <div className="mt-1 flex items-center space-x-3">
                <p className="small">{username}</p>
                <Badge variant="outline" className="muted rounded-full">
                  {category}
                </Badge>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-4">
              <Button asChild variant="outline">
                <Link href={`/mentor/sessions/${id}`}>
                  View <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              {status === "AWAITING_HOST" && (
                <SessionAction
                  onAccept={handleAcceptSession}
                  onDecline={handleDeclineSession}
                  onCancel={handleCancelSession}
                  accept={true}
                  decline={true}
                />
              )}
              {status === "ACCEPTED" && (
                <SessionAction
                  onAccept={handleAcceptSession}
                  onDecline={handleDeclineSession}
                  onCancel={handleCancelSession}
                  cancel={true}
                />
              )}
            </div>
          </div>
          <Separator className="w-full" />
          <div className="flex w-fit justify-between items-start gap-4 flex-col md:flex-row">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="medium uppercase">
                  {formatDateToWeekDDMonth(new Date(start))}
                </p>
                <p className="muted mt-1">
                  {formatDateToHHMMToHHMM(new Date(start), new Date(end))}
                </p>
              </div>
              <div>
                <p className="medium uppercase">duration</p>
                <p className="muted mt-1">30min</p>
              </div>
            </div>
            <div className="flex items-start justify-around gap-4">
              <div>
                <p className="medium uppercase">cost</p>
                <p className="muted mt-1">Free</p>
              </div>
              <div>
                <p className="medium uppercase">Status</p>
                <Badge className="muted mt-1 rounded-full" variant="outline">
                  {status}
                </Badge>
              </div>
            </div>
          </div>
          <Separator className="w-full md:hidden" />

          {/* Button Actions */}
          <div className="block md:hidden">
            <div className="flex md:hidden gap-4">
              <Button asChild variant="outline">
                <Link href={`/mentor/session/${id}`}>
                  View <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              {status === "AWAITING_HOST" && (
                <SessionAction
                  onAccept={handleAcceptSession}
                  onDecline={handleDeclineSession}
                  onCancel={handleCancelSession}
                  accept={true}
                  decline={true}
                />
              )}
              {status === "ACCEPTED" && (
                <SessionAction
                  onAccept={handleAcceptSession}
                  onDecline={handleDeclineSession}
                  onCancel={handleCancelSession}
                  cancel={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;

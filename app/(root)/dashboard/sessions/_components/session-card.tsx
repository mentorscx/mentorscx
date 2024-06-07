import React from "react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { formatDateToHHMMToHHMM, formatDateToWeekDDMonth } from "@/lib/format";
import { ArrowRight, ChevronDownIcon } from "lucide-react";

interface SessionCardProps {
  session: string;
}

const SessionCard = ({ session }: SessionCardProps) => {
  const sessionJSON = JSON.parse(session);
  const { objective, start, end, cost, status, category, mentor, id } =
    sessionJSON;
  const { username, imageUrl } = mentor;
  if (start === null || end === null) return null;
  return (
    <div className="mt-3 w-full rounded-md border-1 p-3">
      <div className="flex space-x-3">
        <div className="p-3">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="large">{objective}</p>
              <div className="mt-1 flex items-center space-x-3">
                <p className="small">{username}</p>
                <Badge variant="outline" className="muted rounded-full">
                  {category}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Button asChild variant="outline">
                <Link href={`/dashboard/sessions/${id}`}>
                  View <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="secondary">
                Edit <ChevronDownIcon className="w-4 h-4 ml-auto" />
              </Button>
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
        </div>
      </div>
    </div>
  );
};

export default SessionCard;

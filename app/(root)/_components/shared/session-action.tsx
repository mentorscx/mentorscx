"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDown, XIcon } from "lucide-react";

interface SessionActionProps {
  onAccept: () => void;
  onDecline: () => void;
  onCancel: () => void;
  accept?: boolean;
  decline?: boolean;
  cancel?: boolean;
}

const SessionAction = ({
  onAccept,
  onDecline,
  onCancel,
  accept = false,
  decline = false,
  cancel = false,
}: SessionActionProps) => {
  const handleAccept = () => {
    onAccept();
  };

  const handleDecline = () => {
    onDecline();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Edit <ChevronDown className="w-4 h-4 ml-1 mr-auto" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {accept && (
            <DropdownMenuItem className="text-green-500" onClick={handleAccept}>
              <CheckIcon className="w-5 h-5 mr-1" /> Accept
            </DropdownMenuItem>
          )}
          {decline && (
            <DropdownMenuItem className="text-gray-500" onClick={handleDecline}>
              <XIcon className="w-5 h-5 mr-1" /> Decline
            </DropdownMenuItem>
          )}
          {cancel && (
            <DropdownMenuItem className="text-red-500" onClick={handleCancel}>
              <XIcon className="w-5 h-5 mr-1" /> Cancel
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SessionAction;

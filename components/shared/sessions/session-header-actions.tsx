"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Role, SessionStatus } from "@prisma/client";
import { updateSession } from "@/lib/actions/session.action";
import { useModal, ModalType } from "@/hooks/use-modal-store";

import AddReviewModal from "@/components/modals/add-review-modal";
import { ShareButton } from "../profile/profile-share";

type Props = {
  sessionId: string;
  role: Role;
  status: SessionStatus;
  buttonStyles: string;
  otherUserId: string;
};

// Define action handlers
const useSessionActions = (sessionId: string, role: Role) => {
  const router = useRouter();
  const { onOpen } = useModal();
  const [disabled, setDisabled] = useState(false);

  const handleAction = async (newStatus: SessionStatus, actionType: string) => {
    try {
      setDisabled(true);
      toast.loading(`${actionType} the session`);
      await updateSession({ id: sessionId, status: newStatus });
      toast.success(`${actionType} the session`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Unexpected Error...");
    } finally {
      setDisabled(false);
    }
  };

  const handleModalAction = (
    newStatus: SessionStatus,
    modalType: ModalType
  ) => {
    setDisabled(true);
    onOpen(modalType, {
      session: { id: sessionId, status: newStatus, declinedBy: role },
    });
    setDisabled(false);
  };

  return {
    handleAccept: () => handleAction(SessionStatus.ACCEPTED, "Accepting"),
    handleDecline: () =>
      handleModalAction(SessionStatus.DECLINED, "declineSession"),
    handleCancel: () =>
      handleModalAction(SessionStatus.CANCELLED, "cancelSession"),
    handleReschedule: () =>
      handleModalAction(SessionStatus.RESCHEDULED, "rescheduleSession"),
    handleCompleted: () => handleAction(SessionStatus.COMPLETED, "completed"),
    disabled,
  };
};

// Define action visibility
const getActionVisibility = (role: Role, status: SessionStatus) => ({
  showReschedule:
    status === SessionStatus.ACCEPTED || status === SessionStatus.AWAITING_HOST,
  showCancel: status === SessionStatus.ACCEPTED,
  showReject: role === Role.MENTOR && status === SessionStatus.AWAITING_HOST,
  showAccept: role === Role.MENTOR && status === SessionStatus.AWAITING_HOST,
  showCompleted: role === Role.MENTEE && status === SessionStatus.DONE,
  showAskReview: role === Role.MENTOR && status === SessionStatus.COMPLETED,
  showLeaveReview: role === Role.MENTEE && status === SessionStatus.COMPLETED,
  showShareReview: status === SessionStatus.REVIEWED,
});

// SessionHeaderActions component
export const SessionHeaderActions = (props: Props) => {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  // Submit review Actions
  const handleLeaveReview = () => {
    setIsReviewDialogOpen(!isReviewDialogOpen);
  };

  // Request review Actions
  const handleRequestReview = () => {
    alert("You asked for the review");
  };

  const sessionActions = useSessionActions(props.sessionId, props.role);
  const actionVisibility = getActionVisibility(props.role, props.status);

  return (
    <div className="pt-4 flex items-center justify-center gap-4 flex-col md:flex-row">
      {actionVisibility.showReject && (
        <Button
          className={props.buttonStyles}
          variant="outline"
          onClick={sessionActions.handleDecline}
          disabled={sessionActions.disabled}
        >
          Decline
        </Button>
      )}
      {actionVisibility.showCancel && (
        <Button
          className={props.buttonStyles}
          variant="outline"
          onClick={sessionActions.handleCancel}
          disabled={sessionActions.disabled}
        >
          Cancel
        </Button>
      )}
      {actionVisibility.showReschedule && (
        <Button
          className={props.buttonStyles}
          variant="outline"
          onClick={sessionActions.handleReschedule}
          disabled={sessionActions.disabled}
        >
          Reschedule
        </Button>
      )}
      {actionVisibility.showAccept && (
        <Button
          className={props.buttonStyles}
          variant="outline"
          onClick={sessionActions.handleAccept}
          disabled={sessionActions.disabled}
        >
          Accept
        </Button>
      )}
      {actionVisibility.showCompleted && (
        <Button
          className={props.buttonStyles}
          variant="outline"
          onClick={sessionActions.handleCompleted}
          disabled={sessionActions.disabled}
        >
          Complete
        </Button>
      )}
      {actionVisibility.showLeaveReview && (
        <Button
          className={props.buttonStyles}
          variant="outline"
          onClick={handleLeaveReview}
          disabled={sessionActions.disabled}
        >
          Leave a review
        </Button>
      )}

      {actionVisibility.showAskReview && (
        <Button
          className={props.buttonStyles}
          variant="outline"
          onClick={handleRequestReview}
          disabled={sessionActions.disabled}
        >
          Ask for review
        </Button>
      )}

      {actionVisibility.showShareReview && (
        <div className="border px-2 md:px-8 rounded-lg">
          <p className="text-center pt-2 font-semibold">Share review</p>
          <ShareButton property={{}} />
        </div>
      )}

      <AddReviewModal
        isDialogOpen={isReviewDialogOpen}
        onClose={handleLeaveReview}
        sessionId={props.sessionId}
      />
    </div>
  );
};

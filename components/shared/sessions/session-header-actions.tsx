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
import ShareOwnProfile from "../profile/share-my-profile";
import Link from "next/link";
import { CheckIcon, TimerOffIcon } from "lucide-react";

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

  const handleAction = async (newStatus: SessionStatus, message: string) => {
    try {
      setDisabled(true);
      toast.loading("loading...");
      await updateSession({ id: sessionId, status: newStatus });
      toast.success(message);
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
    handleAccept: () =>
      handleAction(SessionStatus.ACCEPTED, "Accepted the session"),
    handleDecline: () =>
      handleModalAction(SessionStatus.DECLINED, "declineSession"),
    handleCancel: () =>
      handleModalAction(SessionStatus.CANCELLED, "cancelSession"),
    handleReschedule: () =>
      handleModalAction(SessionStatus.RESCHEDULED, "rescheduleSession"),
    handleCompleted: () =>
      handleAction(SessionStatus.COMPLETED, "completed the session"),
    handleIncomplete: () =>
      handleAction(
        SessionStatus.INCOMPLETE,
        "Marked the session as incomplete"
      ),
    handleAskReview: () =>
      handleModalAction(SessionStatus.AWAITING_REVIEW, "askReview"),
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
  showIncomplete: role === Role.MENTEE && status === SessionStatus.DONE,
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
          <CheckIcon className="w-4 h-4 mr-1" /> Complete
        </Button>
      )}
      {actionVisibility.showIncomplete && (
        <Button
          className={props.buttonStyles}
          variant="outline"
          onClick={sessionActions.handleIncomplete}
          disabled={sessionActions.disabled}
        >
          <TimerOffIcon className="w-4 h-4 mr-1" /> Skipped
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
          onClick={sessionActions.handleAskReview}
          disabled={sessionActions.disabled}
        >
          Ask for review
        </Button>
      )}

      {actionVisibility.showShareReview && (
        <div className="p-4 md:px-8 border-y border-blue-300/20 flex items-center gap-4">
          <Button variant="secondary" asChild>
            <Link href={`/reviews/${props.sessionId}`} target="_blank">
              View review
            </Link>
          </Button>
          <ShareOwnProfile
            path={`/reviews/${props.sessionId}`}
            title="Share review "
          />
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

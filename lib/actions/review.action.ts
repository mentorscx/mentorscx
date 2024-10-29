"use server";

import { Review, SessionStatus } from "@prisma/client";
import { db } from "../db";
import { auth } from "@clerk/nextjs/server";
import { getEmailParams } from "./session.action";
import { alertNotification } from "./notification.action";
import { sendEmailViaBrevoTemplate } from "../brevo";

type ReviewInput = Pick<Review, "rating" | "feedback" | "sessionId">;

/**
 * Adds a review for a session with proper validation and notifications
 * @param params Review parameters including rating, feedback, and sessionId
 * @throws Error if validation fails or operations cannot be completed
 * @returns The created review and updated session
 */
export async function addReview(params: ReviewInput) {
  // Authentication check with proper error message
  const { userId: clerkId } = auth();
  if (!clerkId) {
    console.error("Authentication failed: No user ID found in session");
    throw new Error("You must be logged in to submit a review");
  }

  try {
    // Input validation with specific error messages
    if (!params.sessionId?.trim()) {
      throw new Error("Session ID is required");
    }

    if (
      !params.rating ||
      typeof params.rating !== "number" ||
      params.rating < 1 ||
      params.rating > 5
    ) {
      throw new Error("Rating must be a number between 1 and 5");
    }

    if (!params.feedback?.trim()) {
      throw new Error("Feedback is required");
    }

    // Use a transaction for all database operations to ensure data consistency
    const { review, updatedSession, session } = await db.$transaction(
      async (tx) => {
        // Get session with necessary data
        const session = await tx.session.findUnique({
          where: { id: params.sessionId },
          include: {
            mentee: {
              select: {
                clerkId: true,
                email: true,
                username: true,
                timeZone: true,
              },
            },
            mentor: {
              select: {
                clerkId: true,
                email: true,
                username: true,
                meetingPreference: true,
                zoomLink: true,
                timeZone: true,
                googleMeetLink: true,
              },
            },
            review: true,
          },
        });

        // Comprehensive session validation
        if (!session) {
          throw new Error(`Session not found: ${params.sessionId}`);
        }

        if (session.mentee.clerkId !== clerkId) {
          console.warn(
            `Unauthorized review attempt for session ${params.sessionId} by user ${clerkId}`
          );
          throw new Error("You are not authorized to review this session");
        }

        if (session.review?.id) {
          throw new Error("This session has already been reviewed");
        }

        // Create review within transaction
        const review = await tx.review.create({
          data: {
            rating: params.rating,
            feedback: params.feedback.trim(),
            sessionId: params.sessionId,
          },
        });

        // Update session status within same transaction
        const updatedSession = await tx.session.update({
          where: { id: session.id },
          data: { status: SessionStatus.REVIEWED },
          select: {
            price: true,
            duration: true,
            objective: true,
            outcome: true,
            start: true,
            status: true,
            end: true,
            declinedBy: true,
            mentor: {
              select: {
                clerkId: true,
                email: true,
                username: true,
                meetingPreference: true,
                zoomLink: true,
                timeZone: true,
                googleMeetLink: true,
              },
            },
            mentee: {
              select: {
                clerkId: true,
                email: true,
                username: true,
                timeZone: true,
              },
            },
          },
        });

        return { review, updatedSession, session };
      }
    );

    // Prepare email parameters
    const emailParams = await getEmailParams(updatedSession);

    console.log(emailParams);

    // Handle notifications and emails outside transaction but ensure they complete
    try {
      await Promise.all([
        // Send notification to mentor
        alertNotification(session.mentor.clerkId, {
          title: "Your session was reviewed",
          message: `Your session was reviewed by ${session.mentee.username}`,
        }),

        // Send confirmation emails
        // Mentor email
        sendEmailViaBrevoTemplate({
          templateId: 28,
          email: session.mentor.email,
          name: session.mentor.username,
          params: emailParams,
        }),

        // Mentee email
        sendEmailViaBrevoTemplate({
          templateId: 39,
          email: session.mentee.email,
          name: session.mentee.username,
          params: emailParams,
        }),
      ]);
    } catch (notificationError) {
      // Log notification errors but don't fail the review submission
      console.error("Error sending notifications:", notificationError);
      // Consider implementing a retry mechanism or queueing system for failed notifications
    }

    // Return the review data
    return {
      review,
      session: updatedSession,
    };
  } catch (error) {
    // Log the full error for debugging but send a sanitized message to the client
    console.error("Review submission error:", error);

    // Handle specific known errors
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    // Generic error for unknown cases
    throw new Error("Failed to submit review. Please try again later.");
  }
}

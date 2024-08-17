"use server";
import { Review, SessionStatus } from "@prisma/client";
import { db } from "../db";
import { auth } from "@clerk/nextjs/server";

export async function addReview(
  params: Pick<Review, "rating" | "feedback" | "sessionId">
) {
  // Check the Clerk Auth
  const user = auth();
  const { userId: clerkId } = user;
  if (!clerkId) throw new Error("User not logged in");

  // Validate the data
  if (!params.rating || params.rating < 1 || params.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  if (!params.sessionId) {
    throw new Error("Session ID is required");
  }

  // Check if the session exists and if the user is authorized
  const session = await db.session.findUnique({
    where: {
      id: params.sessionId,
    },
    include: {
      mentee: true,
      review: true,
    },
  });

  if (!session) {
    throw new Error(`Session with ID ${params.sessionId} not found`);
  }

  if (session.mentee.clerkId !== clerkId) {
    throw new Error("User is not authorized to review this session");
  }

  if (session.review?.id) {
    throw new Error("Looks like review exists!");
  }

  // Use a transaction to ensure data consistency
  try {
    const [review, updatedSession] = await db.$transaction([
      db.review.create({
        data: {
          ...params,
        },
      }),
      db.session.update({
        where: {
          id: params.sessionId,
        },
        data: {
          status: SessionStatus.REVIEWED,
        },
      }),
    ]);

    return { review, updatedSession };
  } catch (error) {
    console.error("Error adding review:", error);
    throw new Error(`Failed to add review for session ${params.sessionId}`);
  }
}

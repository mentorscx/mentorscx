"use server";
import { MentorApplication } from "@prisma/client";
import { SessionStatus } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { getSelfId } from "@/lib/actions/user.action";
import { sendEmailViaBrevoTemplate } from "../brevo";
import { auth, currentUser } from "@clerk/nextjs/server";

type TProfileViewCount = {
  profileId: string;
};

export async function addProfileViewCount({ profileId }: TProfileViewCount) {
  try {
    const user = await getSelfId();
    if (!user) return;

    const profileView = await db.profileView.create({
      data: {
        profileId,
        viewerId: user?.id,
      },
    });

    return profileView;
  } catch (err) {
    console.log("Error in addProfileViewCount", err);
  }
}

export async function getUniqueProfileViews(profileId: string) {
  try {
    // Get the date 30 days ago from today
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await db.profileView.groupBy({
      by: ["viewerId"],
      where: {
        profileId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      _count: {
        viewerId: true,
      },
    });

    return result.length;
  } catch (err) {
    console.log("Error in getUniqueProfileViews", err);
  }
}

export async function getUniqueBookedSessions(userId: string) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const uniqueMenteeSessions = await db.session.findMany({
      where: {
        mentorId: userId, // Filter sessions by this mentorId
        createdAt: {
          gte: thirtyDaysAgo, // Only considering sessions within the last 30 days
        },
      },
      select: {
        menteeId: true, // Select only menteeId to minimize data transfer
      },
      distinct: ["menteeId"], // Ensure only unique menteeIds are returned
    });

    // The number of unique menteeIds is the length of the array returned
    return uniqueMenteeSessions.length;
  } catch (err) {
    console.log("Error in getUniqueBookedSessions", err);
  }
}

export async function getSessionsCompletedLastMonth(userId: string) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const completedSessionsCount = await db.session.count({
      where: {
        menteeId: userId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
        status: {
          in: [
            SessionStatus.COMPLETED,
            SessionStatus.AWAITING_REVIEW,
            SessionStatus.REVIEWED,
          ],
        },
      },
    });

    return completedSessionsCount;
  } catch (err) {
    console.log("Error in getSessionsCompletedLastMonth", err);
  }
}

type TMentorApplication = Omit<MentorApplication, "id">;
export async function saveMentorApplication(mentorApplication: any) {
  try {
    if (
      !mentorApplication?.email ||
      !mentorApplication?.firstname ||
      !mentorApplication?.lastname ||
      !mentorApplication?.hasEnoughExperience
    ) {
      throw new Error("Application not submitted! Missing required details.");
    }
    const application = await db.mentorApplication.create({
      data: mentorApplication as TMentorApplication,
    });

    if (application && application.hasEnoughExperience === "yes") {
      await sendEmailViaBrevoTemplate({
        templateId: 4,
        email: mentorApplication.email,
        name: mentorApplication.name,
      });
    }

    return application;
  } catch (err: any) {
    if (err.code === "P2002" && err.meta?.target.includes("email")) {
      // Log the error occurrence without the stack trace
      console.warn(`Duplicate email submission attempt: ${err.meta.target}`);
      throw new Error(
        "It looks like you have already submitted an application with this email."
      );
    }

    console.error("Unexpected error in saveMentorApplication", err);
    throw err;
  }
}

export const getUserSubscription = async () => {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return null;
    }

    // Add field condition of premium
    const user = await db.user.findUnique({
      where: {
        clerkId,
      },
      include: {
        Subscription: true,
      },
    });

    return user;
  } catch (err) {
    console.error("Unexpected error in hasPremiumAccess", err);
  }
};

export async function fetchStripeConnectAccount(
  userId: string
): Promise<boolean> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { stripeConnectedAccount: true },
    });

    return user?.stripeConnectedAccount?.stripeConnectedLinked ?? false;
  } catch (error) {
    console.error("Error fetching Stripe Connect account:", error);
    return false;
  }
}

export async function isConnectedWithGoogleEvents() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      throw new Error("User not found");
    }

    const eventsScopeApproved = clerkUser?.externalAccounts?.some((e) =>
      e.approvedScopes.includes(
        "https://www.googleapis.com/auth/calendar.events"
      )
    );

    return eventsScopeApproved;
  } catch (error: any) {
    throw new Error("Failed to connect the calendar");
  }
}

interface MentorStats {
  averageRating: number;
  totalReviews: number;
  totalCompletedSessions: number;
}

export async function getMentorReviewStats(
  mentorId: string
): Promise<MentorStats> {
  // Get average rating and total reviews
  const reviewStats = await db.review.aggregate({
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      session: {
        mentorId,
      },
    },
  });

  // Get total completed and reviewed sessions
  const completedSessionsCount = await db.session.count({
    where: {
      mentorId,
      status: {
        in: [
          SessionStatus.COMPLETED,
          SessionStatus.REVIEWED,
          SessionStatus.DONE,
          SessionStatus.AWAITING_REVIEW,
        ],
      },
    },
  });

  return {
    averageRating: reviewStats._avg.rating || 0,
    totalReviews: reviewStats._count.rating,
    totalCompletedSessions: completedSessionsCount,
  };
}

export const getCompletedSessionsCount = async (
  userId: string,
  days?: number
) => {
  try {
    const whereClause: any = {
      mentorId: userId, // Changed from menteeId to mentorId as we're checking mentor's completed sessions
      status: {
        in: [
          SessionStatus.COMPLETED,
          SessionStatus.REVIEWED,
          SessionStatus.DONE,
          SessionStatus.AWAITING_REVIEW,
        ],
      },
    };

    if (days && !isNaN(days)) {
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - days);
      whereClause.createdAt = { gte: dateThreshold };
    }

    const completedSessionsCount = await db.session.count({
      where: whereClause,
    });

    return completedSessionsCount;
  } catch (err) {
    console.error("Error in getCompletedSessionsCount:", err);
    throw new Error("Failed to get completed sessions count");
  }
};

/**
 * Generates a unique user ID by concatenating first name and last name.
 * If both are null, returns a UUID. If one is null, uses the other.
 * If the ID already exists, appends a number to make it unique.
 *
 * @param firstName - The first name of the user
 * @param lastName - The last name of the user
 * @returns The unique ID for the user
 */
export async function generateUniqueUserId(
  firstName: string | null,
  lastName: string | null
): Promise<string> {
  let baseId: string;

  // TODO: do the trim and add characters
  if (!firstName && !lastName) {
    return uuidv4();
  } else if (firstName && lastName) {
    baseId = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
  } else if (firstName) {
    baseId = firstName.toLowerCase();
  } else {
    baseId = lastName!.toLowerCase();
  }

  let uniqueId = baseId;
  let idExists = true;
  let counter = 1;

  // Check if the ID already exists in the database
  while (idExists) {
    const existingUser = await db.user.findUnique({
      where: {
        id: uniqueId,
      },
    });

    // If no user exists with this ID, we have a unique ID
    if (!existingUser) {
      idExists = false;
    } else {
      // Otherwise, append the counter and check again
      uniqueId = `${baseId}${counter}`;
      counter++;
    }
  }

  return uniqueId;
}

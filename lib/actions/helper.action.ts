"use server";
import { MentorApplication } from "@prisma/client";
import { SessionStatus } from "@prisma/client";

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

    const sessions = await db.session.findMany({
      where: {
        mentorId: userId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
        status: {
          equals: "COMPLETED",
        },
      },
      select: {
        id: true,
      },
    });

    return sessions.length;
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

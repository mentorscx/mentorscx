import React, { Suspense } from "react";
import Review from "./[sessionId]/_components/review-card";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ReviewSkeleton from "@/components/shared/skeletons/review-skeleton";

// TODO: Add skeletons
// TODO: Optimize the code
const ReviewsPage = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  const reviews = await db.session.findMany({
    where: {
      mentor: {
        clerkId: clerkId,
      },
      review: {
        isNot: null,
      },
    },
    select: {
      id: true,
      review: {
        select: {
          id: true,
          rating: true,
          feedback: true,
        },
      },
      mentee: {
        select: {
          username: true,
          imageUrl: true,
        },
      },
    },
  });

  return (
    <Suspense fallback={<ReviewSkeleton />}>
      <div
        className={`pt-20 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 ${
          reviews.length > 2
            ? "overflow-y-auto"
            : "flex items-center justify-center"
        }`}
      >
        <div className="space-y-4 w-2xl mx-auto">
          {reviews.map(
            (session, index) =>
              session.review && (
                <Review
                  key={session.review.id}
                  name={session.mentee.username}
                  rating={session.review.rating}
                  review={session.review.feedback}
                  imageUrl={session.mentee.imageUrl}
                  srcAlt={session.mentee.username}
                  listView={reviews.length > 1}
                />
              )
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default ReviewsPage;

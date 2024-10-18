import React from "react";
import Review from "./_components/review-card";
import { db } from "@/lib/db";

const ReviewPage = async ({ params }: { params: { sessionId: string } }) => {
  const review = await db.review.findUnique({
    where: {
      sessionId: params.sessionId,
    },
    select: {
      feedback: true,
      rating: true,
      session: {
        select: {
          mentee: {
            select: {
              username: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  //TODO: Add a better empty state
  if (!review) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Review
        name={review.session.mentee.username}
        rating={review.rating}
        review={review.feedback}
        imageUrl={review.session.mentee.imageUrl}
        srcAlt={review.session.mentee.username}
      />
    </div>
  );
};

export default ReviewPage;

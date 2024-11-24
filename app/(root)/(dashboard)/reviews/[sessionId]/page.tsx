import React from "react";
import Review from "./_components/review-card";

import { Metadata } from "next";
import { db } from "@/lib/db";

type MetadataProps = {
  params: {
    sessionId: string;
  };
};

/**
 * Generates SEO metadata for the review page
 * Includes dynamic title, description, OpenGraph and Twitter card metadata
 */
export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  // Default metadata as fallback
  const defaultMetadata: Metadata = {
    title: "Session Review | Mentors CX",
    description: "View mentorship session reviews on Mentors CX",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_WEBSITE_URL || "https://mentorscx.com"
    ),
    openGraph: {
      images: ["/assets/review-share.svg"],
      type: "article",
    },
  };

  try {
    const review = await db.review.findUnique({
      where: {
        sessionId: params.sessionId,
      },
      select: {
        session: {
          select: {
            mentor: {
              select: {
                username: true,
                shortBio: true,
              },
            },
          },
        },
      },
    });

    if (!review) return defaultMetadata;

    const { mentor } = review.session;
    const reviewUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/reviews/${params.sessionId}`;

    return {
      title: `Review for ${mentor.username} | Mentors CX`,
      description:
        mentor.shortBio || "View this mentorship session review on Mentors CX",

      metadataBase: new URL(
        process.env.NEXT_PUBLIC_WEBSITE_URL || "https://mentorscx.com"
      ),

      openGraph: {
        title: `Review for ${mentor.username} | Mentors CX`,
        description:
          "Check out this review from a mentorship session on Mentors CX",
        url: reviewUrl,
        images: [
          {
            url: "/assets/review-share.svg", // AI generated review image
            width: 1200,
            height: 630,
            alt: "Mentorship Review",
          },
        ],
        type: "article",
        siteName: "Mentors CX",
      },

      twitter: {
        card: "summary_large_image",
        title: `Review for ${mentor.username} | Mentors CX`,
        description:
          "Check out this review from a mentorship session on Mentors CX",
        images: ["/assets/review-share.svg"],
      },

      alternates: {
        canonical: reviewUrl,
      },

      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  } catch (error) {
    console.error("[REVIEW_METADATA_ERROR]", error);
    return defaultMetadata;
  }
}

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

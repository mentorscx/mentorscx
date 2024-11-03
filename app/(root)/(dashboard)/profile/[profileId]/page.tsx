import React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";

import ProfileSkeleton from "@/components/shared/skeletons/ProfileSkeleton";

import { db } from "@/lib/db";
import { ProfileDisplayPage } from "@/components/shared/profile/profile-display";
import { addProfileViewCount } from "@/lib/actions/helper.action";

// Type for metadata parameters
type MetadataProps = {
  params: {
    profileId: string;
  };
};

/**
 * Generates SEO metadata for mentor profile pages
 * Includes custom title, description, social sharing info
 */
export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  // Default metadata as fallback
  const defaultMetadata: Metadata = {
    title: "Mentor Profile | Mentors CX",
    description:
      "Connect with industry professionals on Mentors CX for 1:1 mentorship calls.",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "https://mentorscx.com"
    ),
    openGraph: {
      images: ["/mentors-cx.png"],
      type: "profile",
    },
  };

  try {
    const user = await db.user.findUnique({
      where: { id: params.profileId },
      select: {
        username: true,
        shortBio: true,
        imageUrl: true,
        id: true,
      },
    });

    if (!user) return defaultMetadata;

    const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${user.id}`;

    // Social sharing message
    const socialMessage = `Hi there! Check out my mentor profile at Mentors CX, the customer experience mentorship platform where you can book 1:1 calls with industry professionals.`;

    return {
      title: `${user.username} | Mentors CX`,
      description: user.shortBio || socialMessage,
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_APP_URL || "https://mentorscx.com"
      ),

      // OpenGraph metadata for social sharing
      openGraph: {
        title: `${user.username} | Mentors CX`,
        description: socialMessage,
        url: profileUrl,
        images: [
          {
            url: user.imageUrl || "/mentors-cx.png",
            width: 1200,
            height: 630,
            alt: `${user.username}'s profile picture`,
          },
        ],
        type: "profile",
        siteName: "Mentors CX",
      },

      // Twitter card metadata
      twitter: {
        card: "summary_large_image",
        title: `${user.username} | Mentors CX`,
        description: socialMessage,
        images: [user.imageUrl || "/mentors-cx.png"],
      },

      // Canonical URL
      alternates: {
        canonical: profileUrl,
      },

      // Additional metadata
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    };
  } catch (error) {
    console.error("[METADATA_ERROR]", error);
    return defaultMetadata;
  }
}
interface Props {
  params: {
    profileId: string;
  };
}

const page = async ({ params }: Props) => {
  const { profileId } = params;

  addProfileViewCount({ profileId }).catch((err) =>
    console.error("Failed to update view count:", err)
  );

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileDisplayPage
        isMentorRoute={false}
        isOwnProfile={false}
        profileId={profileId}
      />
    </Suspense>
  );
};

export default page;

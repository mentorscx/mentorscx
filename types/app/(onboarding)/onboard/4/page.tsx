import React from "react";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { RecommendedByForm } from "././_components/recommendedby-form";
import OnboardHeading from "../_components/onboard-heading";

const OnboardRecommendedByPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      recommendedBy: true,
      otherRecommendation: true,
    },
  });

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="form-container pt-10">
        <div className="card-block space-y-4">
          <OnboardHeading
            step={4}
            title="How did you find out about us?"
            imageUrl="/assets/undraw_social_girl.svg"
          />

          <RecommendedByForm
            userId={user.id}
            recommendedBy={user.recommendedBy}
            otherRecommendation={user.otherRecommendation}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardRecommendedByPage;

import React from "react";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Industry, Expertise, Tool, Experience } from "@prisma/client";

import AddItemAction from "./add-item-action";
import ProfileSkillItem from "./profile-skill-item";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import ProfileReviewItem from "./profile-review-item";
type ProfileSkillListProps = {
  canEdit: boolean;
  id: string;
};

const ProfileReviews = async ({ canEdit, id }: ProfileSkillListProps) => {
  const reviews = await db.session.findMany({
    where: {
      mentor: {
        id: id,
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
    <Card className="max-w-4xl mx-auto my-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="text-xl">Reviews</div>
        </CardTitle>
      </CardHeader>
      <Separator />
      {reviews.length === 0 && (
        <div className="flex justify-center items-center flex-col gap-4 my-3">
          <Image src="/no_data.svg" alt="avatar" width={100} height={100} />

          <p className="text-muted-foreground text-sm">No data yet.</p>
        </div>
      )}

      <section>
        <ul>
          {reviews
            .filter((e) => e.review !== null)
            .map((s) => {
              return (
                <div key={s.id}>
                  <ProfileReviewItem
                    username={s.mentee.username}
                    imageUrl={s.mentee.imageUrl}
                    canEdit={canEdit}
                    id={s.id}
                    feedback={s.review?.feedback}
                    rating={s.review?.rating}
                  />
                </div>
              );
            })}
        </ul>
      </section>
    </Card>
  );
};

export default ProfileReviews;

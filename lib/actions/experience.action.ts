"use server";
import { db } from "@/lib/db";

interface AddExperienceProps {
  userId: string;
  name: string;
  description: string;
  imageUrl: string;
}
export async function addExperience({
  userId,
  name,
  description,
  imageUrl,
}: AddExperienceProps) {
  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const experience = await db.experience.create({
      data: {
        userId: user.id,
        name,
        description,
        imageUrl,
      },
    });

    return experience;
  } catch (error) {
    console.log("error in ADD_EXPERIENCE_FUNCTION", error);
    throw error;
  }
}

export async function deleteExperienceById(id: string) {
  try {
    const experience = await db.experience.delete({
      where: {
        id,
      },
    });
    return experience;
  } catch (error) {
    console.log("error in DELETE_EXPERIENCE_FUNCTION", error);
    throw error;
  }
}

interface IUpdateExperience {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export async function updateExperience({
  id,
  name,
  description,
  imageUrl,
}: IUpdateExperience) {
  try {
    const experience = await db.experience.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        imageUrl,
      },
    });
    return experience;
  } catch (error) {
    console.log("error in UPDATE_EXPERIENCE_FUNCTION", error);
    throw error;
  }
}

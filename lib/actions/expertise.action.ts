"use server";
import { db } from "@/lib/db";

interface AddExpertiseProps {
  userId: string;
  name: string;
  description: string;
}
export async function addExpertise({
  userId,
  name,
  description,
}: AddExpertiseProps) {
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

    const expertise = await db.expertise.create({
      data: {
        userId: user.id,
        name,
        description,
      },
    });

    return expertise;
  } catch (error) {
    console.log("error in ADD_EXPERTISE_FUNCTION", error);
    throw error;
  }
}

export async function deleteExpertiseById(id: string) {
  try {
    const expertise = await db.expertise.delete({
      where: {
        id,
      },
    });
    return expertise;
  } catch (error) {
    console.log("error in DELETE_EXPERTISE_FUNCTION", error);
    throw error;
  }
}

interface IUpdateExpertise {
  id: string;
  name: string;
  description: string;
}

export async function updateExpertise({
  id,
  name,
  description,
}: IUpdateExpertise) {
  try {
    const expertise = await db.expertise.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
    return expertise;
  } catch (error) {
    console.log("error in UPDATE_EXPERTISE_FUNCTION", error);
    throw error;
  }
}

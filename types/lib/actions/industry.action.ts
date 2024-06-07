"use server";
import { db } from "@/lib/db";

interface AddIndustryProps {
  userId: string;
  name: string;
  description: string;
}
export async function addIndustry({
  userId,
  name,
  description,
}: AddIndustryProps) {
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

    const industry = await db.industry.create({
      data: {
        userId: user.id,
        name,
        description,
      },
    });

    return industry;
  } catch (error) {
    console.log("error in ADD_INDUSTRY_FUNCTION", error);
    throw error;
  }
}

export async function deleteIndustryById(id: string) {
  try {
    const industry = await db.industry.delete({
      where: {
        id,
      },
    });
    return industry;
  } catch (error) {
    console.log("error in DELETE_INDUSTRY_FUNCTION", error);
    throw error;
  }
}

interface IUpdateIndustry {
  id: string;
  name: string;
  description: string;
}

export async function updateIndustry({
  id,
  name,
  description,
}: IUpdateIndustry) {
  try {
    const industry = await db.industry.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
    return industry;
  } catch (error) {
    console.log("error in UPDATE_INDUSTRY_FUNCTION", error);
    throw error;
  }
}

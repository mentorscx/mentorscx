"use server";
import { db } from "@/lib/db";

interface AddToolProps {
  userId: string;
  name: string;
  description: string;
}
export async function addTool({ userId, name, description }: AddToolProps) {
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

    const tool = await db.tool.create({
      data: {
        userId: user.id,
        name,
        description,
      },
    });

    return tool;
  } catch (error) {
    console.log("error in ADD_TOOL_FUNCTION", error);
    throw error;
  }
}

export async function deleteToolById(id: string) {
  try {
    const tool = await db.tool.delete({
      where: {
        id,
      },
    });
    return tool;
  } catch (error) {
    console.log("error in DELETE_TOOL_FUNCTION", error);
    throw error;
  }
}

interface IUpdateTool {
  id: string;
  name: string;
  description: string;
}

export async function updateTool({ id, name, description }: IUpdateTool) {
  try {
    const tool = await db.tool.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
    return tool;
  } catch (error) {
    console.log("error in UPDATE_TOOL_FUNCTION", error);
    throw error;
  }
}

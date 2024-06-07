"use server";
import { db } from "../db";

export async function addSubscribeUser(email: string, role: string) {
  if (!email) throw new Error("Email is required");
  if (!role) throw new Error("Role is required");
  try {
    const user = await db.subscribe.create({
      data: {
        email,
        role,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw Error("ADD_SUBSCRIBE_USER_ERROR, " + error);
  }
}

"use server";

import { db } from "../db";
import { getSelf } from "./user.action";
import { splitEventToSessions } from "../utils";

export async function addEvent(event: any) {
  try {
    console.log(event);
    const { start, end } = event;

    const user = await getSelf();
    if (!user) throw new Error("User not found");

    const newEvent = await db.event.create({
      data: {
        ...event,
        userId: user.id,
      },
    });

    return newEvent;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteEvent(event: any) {
  const { id } = event;
  console.log("The event id is", id);
  console.log(id);
  try {
    const deletedEvent = await db.event.delete({
      where: {
        id,
      },
    });
    return deletedEvent;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

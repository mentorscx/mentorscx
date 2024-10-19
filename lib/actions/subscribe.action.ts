"use server";
import { db } from "../db";
import { addContactToBrevo } from "../brevo";

export async function addSubscribeUser(
  firstName: string,
  lastName: string,
  email: string,
  role: string
) {
  try {
    // Add user to the database
    const newSubscriber = await db.subscribe.create({
      data: {
        firstName,
        lastName,
        email,
        role,
      },
    });

    // Add user to Brevo
    await addContactToBrevo({ email, firstName, lastName, role });

    console.log(email, "Added to brevo successfully");

    return { success: true, data: newSubscriber };
  } catch (error) {
    console.error("Error adding subscriber:", error);
    return { success: false, error: "Failed to add subscriber" };
  }
}

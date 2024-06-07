"use server";
import Profile from "@/database/profile.model";
import { connectToDatabase } from "@/lib/mongoose";

export async function getProfiles() {
  try {
    connectToDatabase();
    const search = await Profile.find();

    return { search };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

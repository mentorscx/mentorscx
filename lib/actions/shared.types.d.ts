import { Schema } from "mongoose";

import { IUser } from "@/mongodb";

export interface CreateUserParams {
  clerkId: string;
  name: string;
  email: string;
  picture: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface DeleteUserParams {
  clerkId: string;
}

export type Partner = {
  logo: string;
  name: string;
  category: string;
  offer: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  value: string;
  summary: string;
  redemptionUrl: string;
  details: string;
  terms: string;
  howToClaim: string;
};

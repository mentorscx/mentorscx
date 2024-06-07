"use server";

import { FeatureType } from "@prisma/client";
import { db } from "../db";

interface ISupport {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export async function createSupport(data: ISupport) {
  console.log(data);
  try {
    await db.support.create({
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    throw Error("CREATE_SUPPORT_ERROR, " + error);
  }
}

type TFeatureRequest = {
  userId: string;
  featureType: FeatureType;
  description: string;
};

export async function createFeatureRequest(featureRequest: TFeatureRequest) {
  try {
    const result = await db.featureRequest.create({
      data: {
        ...featureRequest,
      },
    });
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw Error("CREATE_FEATURE_REQUEST_ERROR, " + error);
  }
}

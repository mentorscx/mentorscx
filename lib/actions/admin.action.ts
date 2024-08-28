"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { sendEmailViaBrevoTemplate } from "../brevo";
import { user } from "@nextui-org/react";

export async function hasAdminAccess() {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not found");
    }

    const user = await clerkClient.users.getUser(userId);
    return user.privateMetadata?.admin;
  } catch (error) {
    console.error(error);
  }
}

export async function updateMentorApplicationStatus({
  id,
  applicationStatus,
  templateId,
}: {
  id: number;
  applicationStatus: string;
  templateId: number;
}) {
  try {
    const isAdmin = await hasAdminAccess();

    if (!isAdmin) {
      throw new Error("User not found");
    }

    const application = await db.mentorApplication.update({
      where: { id },
      data: {
        applicationStatus,
      },
    });

    if (applicationStatus === "ACCEPTED") {
      const user = await db.user.findUnique({
        where: {
          email: application.email,
        },
      });

      if (user) {
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            username: `${application.firstname} ${application.lastname}`,
            bio: application?.profileStatement,
            linkedinProfile: application?.linkedinUrl,
            maxSessions: Number(application?.weeklySessions) || 5,
            role: "MENTOR",
          },
        });
      }

      // send email if the application is approved
      await sendEmailViaBrevoTemplate({
        templateId: templateId,
        email: application.email,
        name: application.firstname,
      });
    }

    return application;
  } catch (error) {
    console.error(error);
  }
}

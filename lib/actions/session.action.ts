"use server";

import { Role, SessionStatus } from "@prisma/client";
import { db } from "../db";
import { scheduleMeeting } from "./google-calandar.action";
import { alertNotification } from "./notification.action";
import { getSelfId } from "./user.action";
import { sendEmailViaBrevoTemplate } from "../brevo";
import { utcToZonedTime } from "date-fns-tz";
import { formatDateToHHMMToHHMM, formatDateToWeekDDMonth } from "../format";

export async function getAllSessions(id: string) {
  try {
    const sessions = await db.session.findMany({
      where: {
        mentorId: id,
      },
    });
    return sessions;
  } catch (error) {
    throw Error("GET_ALL_SESSIONS_ERROR, " + error);
  }
}

export async function getSessionById(id: string) {
  try {
    const session = await db.session.findUnique({
      where: {
        id,
      },
      include: {
        mentor: true,
        mentee: true,
      },
    });
    return session;
  } catch (error) {
    throw Error("GET_SEESION_BY_ID_ERROR, " + error);
  }
}

export async function getSessionByMentorId(mentorId: string) {
  try {
    const session = await db.session.findMany({
      where: {
        mentorId,
      },
      include: {
        mentor: true,
        mentee: true,
      },
    });
    return session;
  } catch (error) {
    throw Error("GET_SEESION_BY_MENTOR_ID_ERROR, " + error);
  }
}

export async function getSessionByMenteeId(menteeId: string) {
  try {
    const session = await db.session.findMany({
      where: {
        menteeId,
      },
      include: {
        mentee: true,
        mentor: true,
      },
    });
    return session;
  } catch (error) {
    throw Error("GET_SEESION_BY_MENTEE_ID_ERROR, " + error);
  }
}

const NOTIFICATION_TEMPLATES = {
  SESSION_ACCEPTED: {
    title: "Your session Accepted",
    getMessage: (userName: string) =>
      `Your session request has been accepted by ${userName}`,
  },
  SESSION_CANCELLED: {
    title: "Your session was cancelled",
    getMessage: (userName: string) =>
      `Your session request was cancelled by ${userName}`,
  },
  SESSION_RESCHEDULED: {
    title: "Your session was rescheduled",
    getMessage: (userName: string) =>
      `Your session request was rescheduled by ${userName}`,
  },
  SESSION_DECLINED: {
    title: "Your session was declined",
    getMessage: (userName: string) =>
      `Your session request was declined by ${userName}`,
  },
  SESSION_REVIEWED: {
    title: "Your session was reviewed",
    getMessage: (userName: string) =>
      `Your session request was reviewed by ${userName}`,
  },
  SESSION_DONE: {
    title: "Your session was done",
    getMessage: (userName: string) =>
      `Your session request was done with ${userName}`,
  },
} as const;

const getEmailParams = (updatedSession: any) => {
  const startInTimeZone = utcToZonedTime(
    new Date(updatedSession.start),
    updatedSession.mentor.timeZone || "UTC"
  );
  const endInTimeZone = utcToZonedTime(
    new Date(updatedSession.end),
    updatedSession.mentor.timeZone || "UTC"
  );

  return {
    mentee_name: updatedSession.mentee.username,
    mentor_name: updatedSession.mentor.username,
    session_duration: String(updatedSession.duration || 30),
    session_price:
      updatedSession.price === 0 ? "Free" : String(updatedSession.price),
    session_objective: updatedSession.objective,
    session_outcome: updatedSession.outcome,
    session_meeting_preference:
      updatedSession.mentor.meetingPreference === "zoom"
        ? "Zoom"
        : "Google Meet",
    session_meeting_link:
      updatedSession.mentor.meetingPreference === "zoom"
        ? updatedSession.mentor.zoomLink
        : updatedSession.mentor.googleMeetLink,
    session_date: formatDateToWeekDDMonth(startInTimeZone),
    session_time: formatDateToHHMMToHHMM(startInTimeZone, endInTimeZone),
    session_timezone: updatedSession.mentor.timeZone,
  };
};

export async function updateSession(session: any) {
  try {
    const { id } = session;
    if (!id) throw new Error("Session id is required");

    const updatedSession = await db.session.update({
      where: { id: session.id },
      data: { ...session },
      select: {
        price: true,
        duration: true,
        objective: true,
        outcome: true,
        start: true,
        status: true,
        end: true,
        declinedBy: true,
        mentor: {
          select: {
            clerkId: true,
            email: true,
            username: true,
            meetingPreference: true,
            zoomLink: true,
            timeZone: true,
            googleMeetLink: true,
          },
        },
        mentee: {
          select: {
            clerkId: true,
            email: true,
            username: true,
            timeZone: true,
          },
        },
      },
    });

    if (!updatedSession) throw new Error("Session not found");

    const emailParams = getEmailParams(updatedSession);
    const statusKey = updatedSession.declinedBy
      ? `${updatedSession.status}_${updatedSession.declinedBy}`
      : updatedSession.status;

    // Handle notifications and emails based on status and declinedBy
    await handleSessionUpdate(statusKey, updatedSession, emailParams);

    // Schedule meeting if needed
    if (updatedSession.status !== SessionStatus.ACCEPTED) {
      if (!updatedSession.mentee.email) {
        throw new Error("Mentee email not found");
      }

      await scheduleMeeting(
        updatedSession.mentor.email,
        updatedSession.mentee.email,
        updatedSession.start.toISOString(),
        updatedSession.end.toISOString()
      );
    }

    return updatedSession;
  } catch (error) {
    throw Error("UPDATE_SESSION_ERROR, " + error);
  }
}

async function handleSessionUpdate(
  statusKey: string,
  session: any,
  emailParams: any
) {
  switch (statusKey) {
    case SessionStatus.AVAILABLE: {
      await Promise.all([
        // Notify mentee
        alertNotification(session.mentee.clerkId, {
          ...NOTIFICATION_TEMPLATES.SESSION_ACCEPTED,
          message: NOTIFICATION_TEMPLATES.SESSION_ACCEPTED.getMessage(
            session.mentor.username
          ),
        }),
        // Email mentor
        sendEmailViaBrevoTemplate({
          templateId: 24,
          email: session.mentor.email,
          name: session.mentor.username,
          params: emailParams,
        }),
        // Email mentee
        sendEmailViaBrevoTemplate({
          templateId: 35,
          email: session.mentee.email,
          name: session.mentee.username,
          params: emailParams,
        }),
      ]);
      break;
    }

    case `${SessionStatus.RESCHEDULED}_${Role.MENTEE}`: {
      await Promise.all([
        // Notify mentor
        alertNotification(session.mentor.clerkId, {
          ...NOTIFICATION_TEMPLATES.SESSION_RESCHEDULED,
          message: NOTIFICATION_TEMPLATES.SESSION_RESCHEDULED.getMessage(
            session.mentee.username
          ),
        }),

        // Email mentor
        sendEmailViaBrevoTemplate({
          templateId: 46,
          email: session.mentor.email,
          name: session.mentor.username,
          params: emailParams,
        }),

        // Email mentee
        sendEmailViaBrevoTemplate({
          templateId: 36,
          email: session.mentor.email,
          name: session.mentor.username,
          params: emailParams,
        }),
      ]);

      break;
    }

    case `${SessionStatus.RESCHEDULED}_${Role.MENTOR}`: {
      await Promise.all([
        // Notify mentee
        alertNotification(session.mentee.clerkId, {
          ...NOTIFICATION_TEMPLATES.SESSION_RESCHEDULED,
          message: NOTIFICATION_TEMPLATES.SESSION_RESCHEDULED.getMessage(
            session.mentor.username
          ),
        }),

        // Email mentor
        sendEmailViaBrevoTemplate({
          templateId: 25,
          email: session.mentor.email,
          name: session.mentor.username,
          params: emailParams,
        }),

        // Email mentee
        sendEmailViaBrevoTemplate({
          templateId: 37,
          email: session.mentee.email,
          name: session.mentee.username,
          params: emailParams,
        }),
      ]);
      break;
    }

    case `${SessionStatus.CANCELLED}_${Role.MENTEE}`: {
      await Promise.all([
        // Notify mentor
        alertNotification(session.mentor.clerkId, {
          ...NOTIFICATION_TEMPLATES.SESSION_CANCELLED,
          message: NOTIFICATION_TEMPLATES.SESSION_CANCELLED.getMessage(
            session.mentee.username
          ),
        }),

        // Email mentor
        sendEmailViaBrevoTemplate({
          templateId: 31,
          email: session.mentor.email,
          name: session.mentor.username,
          params: emailParams,
        }),

        // Email mentee
        sendEmailViaBrevoTemplate({
          templateId: 42,
          email: session.mentee.email,
          name: session.mentee.username,
          params: emailParams,
        }),
      ]);
      break;
    }

    case `${SessionStatus.CANCELLED}_${Role.MENTOR}`: {
      await Promise.all([
        // Notify mentee
        alertNotification(session.mentee.clerkId, {
          ...NOTIFICATION_TEMPLATES.SESSION_CANCELLED,
          message: NOTIFICATION_TEMPLATES.SESSION_CANCELLED.getMessage(
            session.mentor.username
          ),
        }),

        // Email mentor
        sendEmailViaBrevoTemplate({
          templateId: 34,
          email: session.mentor.email,
          name: session.mentor.username,
          params: emailParams,
        }),

        // Email mentee
        sendEmailViaBrevoTemplate({
          templateId: 43,
          email: session.mentee.email,
          name: session.mentee.username,
          params: emailParams,
        }),
      ]);
      break;
    }

    case `${SessionStatus.DECLINED}`: {
      await Promise.all([
        // Notify mentee
        alertNotification(session.mentee.clerkId, {
          ...NOTIFICATION_TEMPLATES.SESSION_DECLINED,
          message: NOTIFICATION_TEMPLATES.SESSION_DECLINED.getMessage(
            session.mentor.username
          ),
        }),
        // Email mentor
        sendEmailViaBrevoTemplate({
          templateId: 30,
          email: session.mentor.email,
          name: session.mentor.username,
          params: emailParams,
        }),

        // Email mentee
        sendEmailViaBrevoTemplate({
          templateId: 41,
          email: session.mentee.email,
          name: session.mentee.username,
          params: emailParams,
        }),
      ]);
      break;
    }

    case `${SessionStatus.REVIEWED}`: {
      await Promise.all([
        // Notify mentor
        alertNotification(session.mentor.clerkId, {
          ...NOTIFICATION_TEMPLATES.SESSION_REVIEWED,
          message: NOTIFICATION_TEMPLATES.SESSION_REVIEWED.getMessage(
            session.mentee.username
          ),
        }),
        // Email mentor
        sendEmailViaBrevoTemplate({
          templateId: 28,
          email: session.mentee.email,
          name: session.mentee.username,
          params: emailParams,
        }),

        // Email mentee
        sendEmailViaBrevoTemplate({
          templateId: 39,
          email: session.mentee.email,
          name: session.mentee.username,
          params: emailParams,
        }),
      ]);
      break;
    }

    case `${SessionStatus.DONE}`: {
      await Promise.all([
        // Notify mentor
        alertNotification(session.mentor.clerkId, {
          ...NOTIFICATION_TEMPLATES.SESSION_DONE,
          message: NOTIFICATION_TEMPLATES.SESSION_DONE.getMessage(
            session.mentee.username
          ),
        }),

        // Notify mentee
        alertNotification(session.mentee.clerkId, {
          ...NOTIFICATION_TEMPLATES.SESSION_DONE,
          message: NOTIFICATION_TEMPLATES.SESSION_DONE.getMessage(
            session.mentor.username
          ),
        }),

        // Email mentor
        sendEmailViaBrevoTemplate({
          templateId: 29,
          email: session.mentee.email,
          name: session.mentee.username,
          params: emailParams,
        }),

        // Email mentee
        sendEmailViaBrevoTemplate({
          templateId: 40,
          email: session.mentee.email,
          name: session.mentee.username,
          params: emailParams,
        }),
      ]);
      break;
    }
  }
}

type TSession = {
  mentorId: string;
  menteeId: string;
  start: Date;
  end: Date;
  objective: string;
  category: string;
  outcome: string;
  price: number;
  duration: number;
  acceptTerms: boolean;
};

export async function createSession(session: TSession) {
  const user = await getSelfId();
  if (!user) throw new Error("User not found");

  try {
    const newSession = await db.session.create({
      data: {
        ...session,
        menteeId: user.id,
      },
      select: {
        price: true,
        duration: true,
        objective: true,
        outcome: true,
        start: true,
        end: true,
        mentor: {
          select: {
            clerkId: true,
            email: true,
            username: true,
            meetingPreference: true,
            zoomLink: true,
            timeZone: true,
            googleMeetLink: true,
          },
        },
        mentee: {
          select: {
            email: true,
            username: true,
            timeZone: true,
          },
        },
      },
    });

    const startInTimeZone = utcToZonedTime(
      new Date(newSession.start),
      newSession.mentor.timeZone || "UTC"
    );
    const endInTimeZone = utcToZonedTime(
      new Date(newSession.end),
      newSession.mentor.timeZone || "UTC"
    );

    // Send Notification
    await alertNotification(newSession.mentor.clerkId, {
      title: "New session Request",
      message: `You have received new session request from ${newSession.mentee.username}`,
    });

    await sendEmailViaBrevoTemplate({
      templateId: 22,
      email: newSession.mentor.email,
      name: newSession.mentor.username,
      params: {
        mentee_name: newSession.mentee.username,
        mentor_name: newSession.mentor.username,
        session_duration: String(newSession.duration || 30),
        session_price:
          newSession.price === 0 ? "Free" : String(newSession.price),
        session_objective: newSession.objective,
        session_outcome: newSession.outcome,
        session_meeting_preference:
          newSession.mentor.meetingPreference === "zoom"
            ? "Zoom"
            : "Google Meet",
        session_meeting_link:
          newSession.mentor.meetingPreference === "zoom"
            ? newSession.mentor.zoomLink
            : newSession.mentor.googleMeetLink,
        session_date: formatDateToWeekDDMonth(startInTimeZone),
        session_time: formatDateToHHMMToHHMM(startInTimeZone, endInTimeZone),
        session_timezone: newSession.mentor.timeZone,
      },
    });

    return newSession;
  } catch (error) {
    throw Error("CREATE_SESSION_ERROR, " + error);
  }
}

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

export async function updateSession(session: any) {
  try {
    const { id } = session;
    if (!id) throw new Error("Session id is required");
    const updatedSession = await db.session.update({
      where: {
        id: session.id,
      },
      data: {
        ...session,
      },
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

    const startInTimeZone = utcToZonedTime(
      new Date(updatedSession.start),
      updatedSession.mentor.timeZone || "UTC"
    );
    const endInTimeZone = utcToZonedTime(
      new Date(updatedSession.end),
      updatedSession.mentor.timeZone || "UTC"
    );

    if (!updatedSession) throw new Error("Session not found");

    if (updatedSession.status === SessionStatus.ACCEPTED) {
      // Send Notification
      await alertNotification(updatedSession.mentee.clerkId, {
        title: "Your session Accepted",
        message: `Your session request has been accepted by ${updatedSession.mentor.username}`,
      });

      await sendEmailViaBrevoTemplate({
        templateId: 24,
        email: updatedSession.mentor.email,
        name: updatedSession.mentor.username,
        params: {
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
        },
      });

      await sendEmailViaBrevoTemplate({
        templateId: 35,
        email: updatedSession.mentee.email,
        name: updatedSession.mentee.username,
        params: {
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
        },
      });
    }
    if (
      updatedSession.status === SessionStatus.RESCHEDULED &&
      updatedSession.declinedBy === Role.MENTEE
    ) {
      // Send Notification
      await alertNotification(updatedSession.mentee.clerkId, {
        title: "Your session was rescheduled",
        message: `Your session request was rescheduled by ${updatedSession.mentee.username}`,
      });

      await sendEmailViaBrevoTemplate({
        templateId: 25,
        email: updatedSession.mentor.email,
        name: updatedSession.mentor.username,
        params: {
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
        },
      });
    }

    if (
      updatedSession.status === SessionStatus.RESCHEDULED &&
      updatedSession.declinedBy === Role.MENTOR
    ) {
      // Send Notification
      await alertNotification(updatedSession.mentee.clerkId, {
        title: "Your session was rescheduled",
        message: `Your session request was rescheduled by ${updatedSession.mentor.username}`,
      });

      await sendEmailViaBrevoTemplate({
        templateId: 25,
        email: updatedSession.mentee.email,
        name: updatedSession.mentee.username,
        params: {
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
        },
      });
    }

    if (
      updatedSession.status === SessionStatus.CANCELLED &&
      updatedSession.declinedBy === Role.MENTEE
    ) {
      // Send Notification
      await alertNotification(updatedSession.mentor.clerkId, {
        title: "Your session was cancelled",
        message: `Your session request was cancelled by ${updatedSession.mentee.username}`,
      });

      await sendEmailViaBrevoTemplate({
        templateId: 31,
        email: updatedSession.mentor.email,
        name: updatedSession.mentor.username,
        params: {
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
        },
      });
    }

    if (
      updatedSession.status === SessionStatus.CANCELLED &&
      updatedSession.declinedBy === Role.MENTOR
    ) {
      // Send Notification
      await alertNotification(updatedSession.mentee.clerkId, {
        title: "Your session was cancelled",
        message: `Your session request was cancelled by ${updatedSession.mentor.username}`,
      });

      await sendEmailViaBrevoTemplate({
        templateId: 34,
        email: updatedSession.mentee.email,
        name: updatedSession.mentee.username,
        params: {
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
        },
      });
    }

    if (updatedSession.status !== "ACCEPTED") {
      const mentorEmail = updatedSession?.mentor?.email;
      const menteeEmail = updatedSession?.mentee?.email;
      if (menteeEmail === undefined) {
        throw new Error("Mentee email not found");
      }

      await scheduleMeeting(
        mentorEmail,
        menteeEmail,
        updatedSession?.start.toISOString(),
        updatedSession?.end.toISOString()
      );
    }

    return updatedSession;
  } catch (error) {
    throw Error("UPDATE_SESSION_ERROR, " + error);
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

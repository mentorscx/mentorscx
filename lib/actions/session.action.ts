"use server";

import { db } from "../db";
import { scheduleMeeting } from "./google-calandar.action";
import { getSelfId } from "./user.action";

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
        start: true,
        end: true,
        status: true,
        mentor: {
          select: {
            email: true,
          },
        },
        mentee: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!updatedSession) throw new Error("Session not found");

    // TODO: Optimise this
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
    });
    return newSession;
  } catch (error) {
    throw Error("CREATE_SESSION_ERROR, " + error);
  }
}

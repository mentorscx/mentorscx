import { db } from "@/lib/db";
import { SessionStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import pLimit from "p-limit";

const CONCURRENCY_LIMIT = 10;

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");

  // Validate the API key
  if (!apiKey || apiKey !== process.env.SECURE_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const sessions = await db.session.findMany({
      where: {
        // end: {
        //   lte: new Date(),
        // },
        status: SessionStatus.ACCEPTED,
      },
    });

    const limit = pLimit(CONCURRENCY_LIMIT);

    // Limit concurrent updates
    const updatePromises = sessions.map((session) =>
      limit(() =>
        db.session.update({
          where: {
            id: session.id,
          },
          data: {
            status: SessionStatus.DONE,
          },
        })
      )
    );

    const results = await Promise.allSettled(updatePromises);

    const successfulUpdates = results.filter(
      (result) => result.status === "fulfilled"
    );

    const errors = results
      .filter((result) => result.status === "rejected")
      .map((result) => (result as PromiseRejectedResult).reason);

    if (errors.length > 0) {
      console.error("Some session updates failed:", errors);
    }

    return NextResponse.json(
      {
        message: `Revalidated session statuses: ${successfulUpdates.length} succeeded, ${errors.length} failed.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to revalidate session statuses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
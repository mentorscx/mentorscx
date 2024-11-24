import { SessionStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route handler for bulk updating expired awaiting sessions
 * Uses direct database update for better performance
 */
export async function GET(request: NextRequest) {
  // Validate API key for security
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.SECURE_API_KEY) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    // Perform bulk update directly in the database
    const result = await db.session.updateMany({
      where: {
        end: {
          lte: new Date(),
        },
        status: SessionStatus.AWAITING_HOST,
      },
      data: {
        status: SessionStatus.AUTODECLINED,
      },
    });

    return NextResponse.json(
      {
        message: `Successfully updated ${result.count} expired sessions`,
        updatedCount: result.count,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("[SESSION_UNACCEPTED_REVALIDATION_ERROR]", error);

    return NextResponse.json(
      {
        error: "Failed to update session statuses",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}

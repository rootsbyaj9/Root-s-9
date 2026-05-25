import { NextResponse, after } from "next/server";
import { appendToSheet } from "@/lib/google-calendar";

/**
 * POST /api/callbacks
 *
 * Receives a callback request:
 *   { name, phone, preferredTime, note }
 *
 * Appends a row to the "Callbacks" worksheet in Google Sheets.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, preferredTime, note, branch } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required." },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const sheetTab = `Callbacks - ${branch || "General"}`;

    // ✅ after() keeps Vercel function alive until write completes
    after(async () => {
      await appendToSheet(`'${sheetTab}'!A:E`, [
        name,
        phone,
        preferredTime || "Anytime",
        note || "",
        submittedAt,
      ]).catch((err) => console.error("[/api/callbacks] Sheets error:", err.message));
    });

    return NextResponse.json({
      success: true,
      message: "We'll call you back shortly!",
    });
  } catch (err: any) {
    console.error("[/api/callbacks]", err.message);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

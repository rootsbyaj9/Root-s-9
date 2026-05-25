import { NextResponse } from "next/server";
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

    // Await the external API calls to ensure they complete before the serverless function terminates
    await appendToSheet(`'${sheetTab}'!A:E`, [
      name,
      phone,
      preferredTime || "Anytime",
      note || "",
      submittedAt,
    ]);

    return NextResponse.json({
      success: true,
      message: "We'll call you back shortly!",
    });
  } catch (err: any) {
    console.error("[/api/callbacks]", err.message, err.stack);
    return NextResponse.json(
      { success: false, error: `Server Error: ${err.message}` },
      { status: 500 }
    );
  }
}

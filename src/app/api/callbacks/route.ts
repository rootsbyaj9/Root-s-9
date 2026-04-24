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

    // Append to Google Sheets — branch-specific tab
    // Tab name pattern: "Callbacks - Uppal", "Callbacks - Tarnaka", etc.
    // Columns: Name | Phone | Preferred Time | Purpose/Note | Submitted At
    const sheetTab = `Callbacks - ${branch || 'General'}`;
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
    console.error("[/api/callbacks]", err.message);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

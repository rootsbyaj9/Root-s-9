import { NextResponse } from "next/server";
import { appendToSheet, createCalendarEvent } from "@/lib/google-calendar";

/**
 * POST /api/bookings
 *
 * Receives a booking form submission:
 *   { name, phone, service, date, time, branch }
 *
 * Responds immediately, then writes to Google Sheets + Calendar in the background.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, service, date, time, branch } = body;

    // Validate required fields
    if (!name || !phone || !service || !date || !time || !branch) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const sheetTab = `Bookings - ${branch}`;

    // Await the external API calls to ensure they complete before the serverless function terminates
    // Do NOT swallow errors with .catch so we can debug production issues
    await Promise.all([
      appendToSheet(`'${sheetTab}'!A:F`, [
        name,
        phone,
        service,
        date,
        time,
        submittedAt,
      ]),
      createCalendarEvent({ name, phone, service, date, time, branch })
    ]);

    return NextResponse.json({
      success: true,
      message: "Booking received! We'll confirm your appointment shortly.",
    });
  } catch (err: any) {
    console.error("[/api/bookings]", err.message, err.stack);
    return NextResponse.json(
      { success: false, error: `Server Error: ${err.message}` },
      { status: 500 }
    );
  }
}

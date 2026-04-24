import { NextResponse } from "next/server";
import { appendToSheet, createCalendarEvent } from "@/lib/google-calendar";

/**
 * POST /api/bookings
 *
 * Receives a booking form submission:
 *   { name, phone, service, date, time, branch }
 *
 * 1. Appends a row to the "Bookings" worksheet in Google Sheets
 * 2. Creates a Google Calendar event
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

    // 1. Append to Google Sheets — branch-specific tab
    // Tab name pattern: "Bookings - Uppal", "Bookings - Tarnaka", etc.
    // Columns: Name | Phone | Service | Preferred Date | Preferred Time | Submitted At
    const sheetTab = `Bookings - ${branch}`;
    await appendToSheet(`'${sheetTab}'!A:F`, [
      name,
      phone,
      service,
      date,
      time,
      submittedAt,
    ]);

    // 2. Create Google Calendar event
    let calendarEventId: string | null = null;
    try {
      calendarEventId = await createCalendarEvent({
        name,
        phone,
        service,
        date,
        time,
        branch,
      });
    } catch (calErr: any) {
      // Calendar is non-critical — log but don't fail the booking
      console.error("[/api/bookings] Calendar error:", calErr.message);
    }

    return NextResponse.json({
      success: true,
      calendarEventId,
      message: "Booking received! We'll confirm your appointment shortly.",
    });
  } catch (err: any) {
    console.error("[/api/bookings]", err.message);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

import { NextResponse, after } from "next/server";
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

    // ✅ after() keeps the Vercel function alive until writes complete
    // User gets instant response; Sheets + Calendar run in the background
    after(async () => {
      await Promise.all([
        appendToSheet(`'${sheetTab}'!A:F`, [
          name,
          phone,
          service,
          date,
          time,
          submittedAt,
        ]).catch((err) => console.error("[/api/bookings] Sheets error:", err.message)),

        createCalendarEvent({ name, phone, service, date, time, branch })
          .catch((err) => console.error("[/api/bookings] Calendar error:", err.message)),
      ]);
    });

    return NextResponse.json({
      success: true,
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

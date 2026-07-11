import { NextResponse } from "next/server";
import { createCalendarEvent } from "@/lib/google-calendar";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

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

    // Fetch the branch's specific Google Calendar ID from Sanity CMS (if configured)
    const branchQuery = groq`*[_type == "location" && shortName == $branch][0]{ googleCalendarId }`;
    const branchDoc = await client?.fetch(branchQuery, { branch }).catch(() => null);

    // Write only to Google Calendar
    await createCalendarEvent({
      name,
      phone,
      service,
      date,
      time,
      branch,
      calendarIdOverride: branchDoc?.googleCalendarId,
    });

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

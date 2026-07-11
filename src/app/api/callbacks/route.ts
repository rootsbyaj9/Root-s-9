import { NextResponse } from "next/server";
import { createCalendarEvent } from "@/lib/google-calendar";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

/**
 * POST /api/callbacks
 *
 * Receives a callback request:
 *   { name, phone, preferredTime, note }
 *
 * Creates an event in Google Calendar on the current day.
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
    const today = new Date();
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const branchName = branch || "General";

    // Fetch the branch's specific Google Calendar ID from Sanity CMS (if configured)
    const branchQuery = groq`*[_type == "location" && shortName == $branch][0]{ googleCalendarId }`;
    const branchDoc = await client.fetch(branchQuery, { branch: branchName }).catch(() => null);

    await createCalendarEvent({
      name,
      phone,
      service: `Callback Request - ${note || "No note"}`,
      date,
      time: preferredTime || "10:00 AM",
      branch: branchName,
      calendarIdOverride: branchDoc?.googleCalendarId,
    });

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

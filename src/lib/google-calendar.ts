import { google } from "googleapis";

/**
 * Write a row to a Google Sheets worksheet.
 * Auto-creates the tab if it doesn't exist yet (e.g. when a new branch is added via CMS).
 * Used by booking and callback API routes.
 */
export async function appendToSheet(
  worksheetRange: string,
  values: string[]
): Promise<void> {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_KEY");

  const credentials = JSON.parse(keyJson);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEETS_SPREADSHEET_ID");

  // Extract tab name from range (e.g. "'Bookings - Uppal'!A:F" → "Bookings - Uppal")
  const tabName = worksheetRange.replace(/^'|'!.*$|!.*$/g, "");

  // Auto-create the tab if it doesn't exist
  await ensureTabExists(sheets, spreadsheetId, tabName);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: worksheetRange,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [values] },
  });
}

/**
 * Ensure a sheet tab exists. If not, create it with a header row.
 */
async function ensureTabExists(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tabName: string
): Promise<void> {
  // Get existing tab names
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });

  const existingTabs = meta.data.sheets?.map((s) => s.properties?.title) || [];

  if (existingTabs.includes(tabName)) return; // Already exists

  // Create the tab
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [{ addSheet: { properties: { title: tabName } } }],
    },
  });

  // Add a header row based on the tab type
  const isBooking = tabName.startsWith("Bookings");
  const headers = isBooking
    ? ["Name", "Phone", "Service", "Preferred Date", "Preferred Time", "Submitted At"]
    : ["Name", "Phone", "Preferred Time", "Purpose / Note", "Submitted At"];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${tabName}'!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [headers] },
  });
}

/**
 * Create a Google Calendar event for a salon booking.
 */
export async function createCalendarEvent({
  name,
  phone,
  service,
  date,
  time,
  branch,
}: {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  branch: string;
}): Promise<string | null> {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_KEY");

  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) throw new Error("Missing GOOGLE_CALENDAR_ID");

  const credentials = JSON.parse(keyJson);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  // Parse the date and time into a proper DateTime
  // Expected formats: date = "2026-04-25", time = "10:00" or "10:00 AM"
  const startDateTime = parseDateTime(date, time);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // +1 hour

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `${service} — ${name}`,
      description: `Booking from Root's Salon website\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nBranch: ${branch}\nPreferred time: ${time}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      location: branch === "Tarnaka"
        ? "Root's Family Salon, Tarnaka, Hyderabad"
        : "Root's Family Salon, Uppal, Hyderabad",
    },
  });

  return event.data.id || null;
}

/**
 * Parse date string "YYYY-MM-DD" and time string "HH:MM" or "HH:MM AM/PM"
 * into a JS Date in IST.
 */
function parseDateTime(dateStr: string, timeStr: string): Date {
  // Normalize the time
  let hours: number;
  let minutes: number;

  const timeMatch = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (timeMatch) {
    hours = parseInt(timeMatch[1]);
    minutes = parseInt(timeMatch[2]);
    const period = timeMatch[3]?.toUpperCase();

    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
  } else {
    // Fallback: assume 10:00 AM
    hours = 10;
    minutes = 0;
  }

  // Create date in IST (UTC+5:30)
  const [year, month, day] = dateStr.split("-").map(Number);
  const dt = new Date(year, month - 1, day, hours, minutes, 0);
  return dt;
}

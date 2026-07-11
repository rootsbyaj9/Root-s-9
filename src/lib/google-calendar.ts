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
  // Vercel env vars mangle \n in private keys — restore real newlines
  if (credentials.private_key) {
    credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
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

  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim();
  if (!calendarId) throw new Error("Missing GOOGLE_CALENDAR_ID");

  const credentials = JSON.parse(keyJson);
  // Vercel env vars mangle \n in private keys — restore real newlines
  if (credentials.private_key) {
    credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  // parseDateTime now returns an ISO string with +05:30 offset
  const { startDateTime, endDateTime } = parseDateTime(date, time);

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `${service} — ${name}`,
      description: `Booking from Root's Salon website\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nBranch: ${branch}\nPreferred time: ${time}`,
      start: {
        dateTime: startDateTime,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "Asia/Kolkata",
      },
      location: branch === "Tarnaka"
        ? "Root's Family Salon, Tarnaka, Hyderabad"
        : "Root's Family Salon, Uppal, Hyderabad",
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: 24 * 60 }, // 1 day before (for you to call)
          { method: "popup", minutes: 30 },      // 30 mins before (standard)
        ],
      },
    },
  });

  return event.data.id || null;
}

function parseDateTime(dateStr: string, timeStr: string): { startDateTime: string, endDateTime: string } {
  let hours = 10;
  let minutes = 0;

  const timeMatch = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (timeMatch) {
    hours = parseInt(timeMatch[1]);
    minutes = parseInt(timeMatch[2]);
    const period = timeMatch[3]?.toUpperCase();

    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
  }

  // Ensure 2-digit padding
  const pad = (n: number) => String(n).padStart(2, "0");

  const startDateTime = `${dateStr}T${pad(hours)}:${pad(minutes)}:00+05:30`;
  
  // Calculate end time (+1 hour)
  let endHours = hours + 1;
  let endDateStr = dateStr;
  
  // Basic overflow handling for end time (if booking is at 11:30 PM, it ends at 00:30 AM next day)
  if (endHours >= 24) {
    endHours -= 24;
    // We don't strictly need perfect day-rollover math for a 1-hour salon booking since they aren't open at midnight,
    // but Calendar will handle it if we just pass a valid time. For simplicity, we just roll over the hours.
  }

  const endDateTime = `${endDateStr}T${pad(endHours)}:${pad(minutes)}:00+05:30`;

  return { startDateTime, endDateTime };
}

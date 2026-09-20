import { google } from 'googleapis';
import { BRANCHES_FIXTURE } from '@/fixtures/locations';
import type { ServiceSnapshot } from '@/fixtures/types';

const BRANCH_ADDRESSES: Record<string, string> = {
  uppal:   "#10-25/7, Taj Mahal Colony, Peerzadiguda Road, opp. Global Indian International School, Uppal, Hyderabad 500039",
  tarnaka: "#12-5-16/4, Vijayapuri Colony, opp. St Ann's School, Chenna Reddy Lane, Tarnaka, Secunderabad 500017",
  yamjal:  "Yamjal, Hyderabad, Telangana 501510",
};

function getCredentials() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_KEY');
  const cred = JSON.parse(keyJson);
  if (cred.private_key) cred.private_key = cred.private_key.replace(/\\n/g, '\n');
  return cred;
}

/**
 * Write a row to a Google Sheets worksheet.
 * Auto-creates the tab if it doesn't exist yet.
 */
export async function appendToSheet(
  worksheetRange: string,
  values: string[]
): Promise<void> {
  const credentials  = getCredentials();
  const auth         = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  if (!spreadsheetId) throw new Error('Missing GOOGLE_SHEETS_SPREADSHEET_ID');

  const tabName = worksheetRange.replace(/^'|'!.*$|!.*$/g, '');
  await ensureTabExists(sheets, spreadsheetId, tabName);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: worksheetRange,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  });
}

async function ensureTabExists(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tabName: string
): Promise<void> {
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets.properties.title',
  });
  const existing = meta.data.sheets?.map(s => s.properties?.title) || [];
  if (existing.includes(tabName)) return;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests: [{ addSheet: { properties: { title: tabName } } }] },
  });

  const isBooking = tabName.startsWith('Bookings');
  const headers = isBooking
    ? ['Booking ID', 'Name', 'Phone', 'Email', 'Services', 'Duration (mins)', 'Date', 'Start Time', 'End Time', 'Branch', 'Notes', 'Status', 'Calendar Event ID', 'Idempotency Key', 'Submitted At']
    : ['Name', 'Phone', 'Preferred Time', 'Purpose / Note', 'Branch', 'Submitted At'];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${tabName}'!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [headers] },
  });
}

// ── Calendar ──────────────────────────────────────────────────────────────────

interface CreateEventParams {
  bookingId: string;
  name: string;
  phone: string;
  email?: string;
  services: ServiceSnapshot[];
  startAt: string;   // ISO 8601 +05:30
  endAt: string;     // ISO 8601 +05:30
  branchSlug: string;
  notes?: string;
  calendarIdOverride?: string;
}

interface CreateEventResult {
  eventId: string | null;
  customerCalendarUrl: string;
}

/**
 * Create a Google Calendar event for a Roots booking.
 * Returns the event ID (for storage) and a no-login customer calendar URL.
 */
export async function createCalendarEvent(params: CreateEventParams): Promise<CreateEventResult> {
  const { bookingId, name, phone, email, services, startAt, endAt, branchSlug, notes, calendarIdOverride } = params;

  const calendarId = (calendarIdOverride || process.env.GOOGLE_CALENDAR_ID)?.trim();
  if (!calendarId) throw new Error('Missing GOOGLE_CALENDAR_ID');

  const credentials = getCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  const calendar = google.calendar({ version: 'v3', auth });

  const location    = BRANCH_ADDRESSES[branchSlug] ?? "Root's The Family Salon, Hyderabad";
  const serviceNames = services.map(s => s.name).join(', ');
  const primaryService = services[0]?.name ?? 'Appointment';

  const description = [
    `Booking Ref: ${bookingId}`,
    `Customer: ${name}`,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    `Services: ${serviceNames}`,
    `Branch: ${branchSlug.charAt(0).toUpperCase() + branchSlug.slice(1)}`,
    notes ? `Notes: ${notes}` : null,
    '',
    "Root's The Family Salon — +91 97007 44357",
  ].filter(Boolean).join('\n');

  const event = await calendar.events.insert({
    calendarId,
    sendUpdates: 'none',
    requestBody: {
      summary:     `Roots booking — ${name}`,
      description,
      location,
      start: { dateTime: startAt, timeZone: 'Asia/Kolkata' },
      end:   { dateTime: endAt,   timeZone: 'Asia/Kolkata' },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    },
  });

  // Build the no-login "Add to my Google Calendar" URL (Option A)
  const customerCalendarUrl = buildCustomerCalendarUrl({
    title: `Roots appointment — ${primaryService}`,
    startAt,
    endAt,
    location,
    description: [
      `Booking ref: ${bookingId}`,
      `Services: ${serviceNames}`,
      "Root's The Family Salon — +91 97007 44357",
    ].join('\n'),
  });

  return { eventId: event.data.id || null, customerCalendarUrl };
}

export function buildCustomerCalendarUrl({
  title,
  startAt,
  endAt,
  location,
  description,
}: {
  title: string;
  startAt: string;
  endAt: string;
  location: string;
  description: string;
}): string {
  // Google Calendar uses UTC in the gcal URL: YYYYMMDDTHHmmssZ
  const toGcalDate = (iso: string) => {
    const d = new Date(iso);
    return d.toISOString().replace(/[-:]/g, '').replace('.000', '');
  };
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text:   title,
    dates:  `${toGcalDate(startAt)}/${toGcalDate(endAt)}`,
    location,
    details: description,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Build a .ics download URL (data URI) for non-Google calendars */
export function buildIcsContent(params: {
  bookingId: string;
  title: string;
  startAt: string;
  endAt: string;
  location: string;
  description: string;
}): string {
  const toIcsDate = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace('.000', '');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Roots Family Salon//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${params.bookingId}@roots-salon.com`,
    `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
    `DTSTART:${toIcsDate(params.startAt)}`,
    `DTEND:${toIcsDate(params.endAt)}`,
    `SUMMARY:${params.title}`,
    `LOCATION:${params.location}`,
    `DESCRIPTION:${params.description.replace(/\n/g, '\\n')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

// Legacy single-service interface — keeps existing BookingModal callback tab working
export async function createCalendarEventLegacy({
  name, phone, service, date, time, branch, calendarIdOverride,
}: {
  name: string; phone: string; service: string;
  date: string; time: string; branch: string;
  calendarIdOverride?: string;
}): Promise<string | null> {
  const { startDateTime, endDateTime } = parseLegacyDateTime(date, time);
  const branchSlug = branch.toLowerCase();
  const snapshot   = [{ serviceId: 'legacy', name: service, durationMinutes: 60 }];
  const result = await createCalendarEvent({
    bookingId: `LEGACY-${Date.now()}`,
    name, phone, services: snapshot,
    startAt: startDateTime, endAt: endDateTime,
    branchSlug, calendarIdOverride,
  });
  return result.eventId;
}

function parseLegacyDateTime(dateStr: string, timeStr: string) {
  let h = 10, m = 0;
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (match) {
    h = parseInt(match[1]);
    m = parseInt(match[2]);
    const p = match[3]?.toUpperCase();
    if (p === 'PM' && h < 12) h += 12;
    if (p === 'AM' && h === 12) h = 0;
  }
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    startDateTime: `${dateStr}T${pad(h)}:${pad(m)}:00+05:30`,
    endDateTime:   `${dateStr}T${pad(h + 1)}:${pad(m)}:00+05:30`,
  };
}

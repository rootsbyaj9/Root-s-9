const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function test() {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    if (credentials.private_key) credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: 'v3', auth });
    
    const start = new Date();
    start.setHours(start.getHours() + 1);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const res = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: {
        summary: 'Test Write Access',
        start: { dateTime: start.toISOString() },
        end: { dateTime: end.toISOString() }
      }
    });
    
    console.log("SUCCESS! Created event:", res.data.id);
  } catch (e) {
    console.error("ERROR:", e.message);
  }
}
test();

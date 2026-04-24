import { google } from "googleapis";

export interface SheetReview {
  _id: string;
  name: string;
  rating: number;
  date: string;
  reviewText: string;
  service: string;
  branch: string;
  avatar?: string;
}

// In-memory cache shared across requests (same process).
// TTL is 0 in development so new sheet rows show up on every refresh.
let cache: { data: SheetReview[]; ts: number } | null = null;
const CACHE_TTL_MS =
  process.env.NODE_ENV === "development" ? 0 : 5 * 60 * 1000; // 0ms dev / 5min prod

/**
 * Fetch reviews directly from Google Sheets.
 * Use this from Server Components instead of fetching our own API route.
 *
 * Sheet layout: Reviews!A2:F
 *   A: Name | B: Rating | C: Date | D: Review Text | E: Service | F: Branch
 */
export async function getReviews(): Promise<SheetReview[]> {
  // Return cached data if fresh
  if (cache && Date.now() - cache.ts < CACHE_TTL_MS) {
    return cache.data;
  }

  try {
    const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!keyJson) {
      console.warn("[google-sheets] Missing GOOGLE_SERVICE_ACCOUNT_KEY");
      return [];
    }

    const credentials = JSON.parse(keyJson);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      console.warn("[google-sheets] Missing GOOGLE_SHEETS_SPREADSHEET_ID");
      return [];
    }

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Reviews!A2:G", // Skip header row, read up to G
    });

    const rows = res.data.values || [];

    const reviews: SheetReview[] = rows
      .filter((row) => row[0] && row[3]) // Must have Name (A) and Review Text (D)
      .map((row, idx) => ({
        _id: `sheet-review-${idx}`,
        name: row[0] || "",
        rating: parseInt(row[1]) || 5,
        date: row[2] || "Recent",
        reviewText: row[3] || "",
        service: row[4] || "Salon Visit",
        branch: row[5] || "Uppal",
        avatar: row[6] || undefined,
      }));

    // Update cache
    cache = { data: reviews, ts: Date.now() };

    return reviews;
  } catch (err: any) {
    console.error("[google-sheets] Failed to fetch reviews:", err.message);
    return [];
  }
}

/**
 * Append new reviews to the Google Sheet.
 * Maps SheetReview to rows: Name | Rating | Date | Review Text | Service | Branch
 */
export async function appendReviewsToSheet(newReviews: SheetReview[]) {
  if (!newReviews || newReviews.length === 0) return;

  try {
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

    const values = newReviews.map((r) => [
      r.name,
      r.rating,
      r.date,
      r.reviewText,
      r.service,
      r.branch,
      r.avatar || ""
    ]);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Reviews!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    // Invalidate cache since we added new data
    cache = null;
    
  } catch (err: any) {
    console.error("[google-sheets] Failed to append reviews:", err.message);
    throw err;
  }
}

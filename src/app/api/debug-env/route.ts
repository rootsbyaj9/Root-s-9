import { NextResponse } from "next/server";

/**
 * GET /api/debug-env
 * Diagnostic endpoint — checks env var presence and JSON validity.
 * DELETE THIS FILE after debugging.
 */
export async function GET() {
  const results: Record<string, string> = {};

  // Check GOOGLE_SHEETS_SPREADSHEET_ID
  results.GOOGLE_SHEETS_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
    ? `✅ Present (${process.env.GOOGLE_SHEETS_SPREADSHEET_ID.length} chars)`
    : "❌ MISSING";

  // Check GOOGLE_CALENDAR_ID
  results.GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID
    ? `✅ Present`
    : "❌ MISSING";

  // Check GOOGLE_SERVICE_ACCOUNT_KEY
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) {
    results.GOOGLE_SERVICE_ACCOUNT_KEY = "❌ MISSING";
  } else {
    results.GOOGLE_SERVICE_ACCOUNT_KEY_length = `${keyJson.length} chars`;
    try {
      const parsed = JSON.parse(keyJson);
      results.GOOGLE_SERVICE_ACCOUNT_KEY = "✅ Valid JSON";
      results.service_account_email = parsed.client_email ?? "❌ no client_email field";
      const pk: string = parsed.private_key ?? "";
      results.private_key_starts = pk.substring(0, 40) + "...";
      results.private_key_has_real_newlines = pk.includes("\n") ? "✅ yes" : "❌ no (has literal \\n only)";
      results.private_key_has_escaped_newlines = pk.includes("\\n") ? "⚠️ yes (needs .replace fix)" : "✅ no escaped \\n";
    } catch (e: any) {
      results.GOOGLE_SERVICE_ACCOUNT_KEY = `❌ Invalid JSON: ${e.message}`;
    }
  }

  return NextResponse.json(results, { status: 200 });
}

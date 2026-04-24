import { NextResponse } from "next/server";
import { getReviews } from "@/lib/google-sheets";

/**
 * GET /api/reviews
 * Returns reviews from Google Sheets. Kept as an API route for potential
 * external consumers or client-side fetching. The shared getReviews()
 * utility handles caching and authentication.
 */
export async function GET() {
  try {
    const reviews = await getReviews();
    return NextResponse.json({ reviews });
  } catch (err: any) {
    console.error("[/api/reviews]", err.message);
    return NextResponse.json({ reviews: [], error: err.message }, { status: 200 });
  }
}

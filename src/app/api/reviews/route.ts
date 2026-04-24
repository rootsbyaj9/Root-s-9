import { NextResponse } from "next/server";
import { getPlacesReviews } from "@/lib/google-places";
import reviewsJson from "@/data/reviews.json";

/**
 * GET /api/reviews
 * Returns reviews from Google Places API, with static fallback.
 */
export async function GET() {
  let reviews = await getPlacesReviews();

  if (!reviews || reviews.length === 0) {
    reviews = reviewsJson as any[];
  }

  return NextResponse.json({ reviews });
}

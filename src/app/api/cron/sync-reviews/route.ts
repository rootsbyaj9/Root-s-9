import { NextResponse } from "next/server";
import { getReviews, appendReviewsToSheet, SheetReview } from "@/lib/google-sheets";

/**
 * GET /api/cron/sync-reviews
 * This route fetches reviews from Google Places API and appends new ones
 * (that are >= 4.5 stars and newer than 5 months) to the Google Sheet.
 * It acts as a bridge so the client can curate the reviews in the Google Sheet.
 */
export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GOOGLE_PLACES_API_KEY" }, { status: 500 });
    }

    const placeId = 'ChIJgZ8yuROZyzsRoG3M8JtuzQE'; // Uppal Branch

    // 1. Fetch from Google Places API
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=en`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews'
      },
      // Disable cache so the sync always checks live data
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google Places API Error: ${errorText}`);
    }

    const data = await response.json();
    const rawReviews = data.reviews || [];

    // Five months in milliseconds
    const fiveMonthsMs = 5 * 30 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    // 2. Filter raw reviews to map to SheetReview
    const candidateReviews: SheetReview[] = rawReviews
      .filter((r: any) => {
        if (r.rating < 5) return false;
        if (r.publishTime) {
          const publishDate = new Date(r.publishTime).getTime();
          if (now - publishDate > fiveMonthsMs) {
            return false;
          }
        }
        return true;
      })
      .map((r: any, idx: number) => ({
        _id: `places-review-${Date.now()}-${idx}`,
        name: r.authorAttribution?.displayName || "Happy Client",
        rating: r.rating || 5,
        date: r.relativePublishTimeDescription || "Recent",
        reviewText: r.text?.text || "",
        service: "Salon Visit", 
        branch: "Uppal",
        avatar: r.authorAttribution?.photoUri || "",
      }));

    if (candidateReviews.length === 0) {
      return NextResponse.json({ message: "No qualifying recent 5-star reviews found to sync." });
    }

    // 3. Fetch existing reviews from Google Sheets
    const existingReviews = await getReviews();

    // 4. Find which candidate reviews are new
    const newReviews: SheetReview[] = [];
    for (const candidate of candidateReviews) {
      // Very basic deduplication check based on review text and author name
      const exists = existingReviews.some(
        (existing) => 
          existing.name === candidate.name && 
          existing.reviewText === candidate.reviewText
      );

      if (!exists) {
        newReviews.push(candidate);
      }
    }

    // 5. Append new reviews
    if (newReviews.length > 0) {
      await appendReviewsToSheet(newReviews);
      return NextResponse.json({ 
        message: `Successfully synced ${newReviews.length} new review(s) to the Google Sheet.`,
        syncedReviews: newReviews.map(r => r.name)
      });
    }

    return NextResponse.json({ message: "Google Sheet is already up to date with the latest Google Maps reviews." });

  } catch (err: any) {
    console.error("[/api/cron/sync-reviews]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

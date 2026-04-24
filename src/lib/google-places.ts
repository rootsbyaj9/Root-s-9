import { SheetReview } from "./google-sheets";

// Cache for 30 days to minimize API calls and stay well within the free tier (1000 requests/month)
// Vercel/Next.js ISR caching can also be used, but this in-memory cache helps during local dev/builds.
let cache: { data: SheetReview[]; ts: number } | null = null;
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

export async function getPlacesReviews(): Promise<SheetReview[]> {
  // Return cached data if fresh
  if (cache && Date.now() - cache.ts < CACHE_TTL_MS) {
    return cache.data;
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.warn("[google-places] Missing GOOGLE_PLACES_API_KEY");
    return [];
  }

  const placeId = 'ChIJgZ8yuROZyzsRoG3M8JtuzQE'; // Uppal Branch

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=en`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews'
      },
      // Next.js fetch cache configuration: cache for 30 days
      next: { revalidate: 2592000 }
    });

    if (!response.ok) {
      console.error("[google-places] Failed to fetch reviews", await response.text());
      return [];
    }

    const data = await response.json();
    const rawReviews = data.reviews || [];

    // Five months in milliseconds
    const fiveMonthsMs = 5 * 30 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    const formattedReviews: SheetReview[] = rawReviews
      .filter((r: any) => {
        // Filter 1: Must be >= 4.5 stars (Google returns integers, so 5)
        if (r.rating < 5) return false;

        // Filter 2: Must be newer than 5 months
        if (r.publishTime) {
          const publishDate = new Date(r.publishTime).getTime();
          if (now - publishDate > fiveMonthsMs) {
            return false;
          }
        }
        return true;
      })
      .map((r: any, idx: number) => ({
        _id: `places-review-${idx}`,
        name: r.authorAttribution?.displayName || "Happy Client",
        rating: r.rating || 5,
        date: r.relativePublishTimeDescription || "Recent",
        reviewText: r.text?.text || "",
        service: "Salon Visit", // Google reviews don't specify service reliably
        branch: "Uppal",
        avatar: r.authorAttribution?.photoUri || "",
      }));

    // Update cache
    cache = { data: formattedReviews, ts: Date.now() };

    return formattedReviews;
  } catch (err: any) {
    console.error("[google-places] Exception fetching reviews:", err.message);
    return [];
  }
}

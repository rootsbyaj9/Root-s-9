import { SheetReview } from "./google-sheets";

/**
 * Branch configurations for Google Places API fetching.
 * Each branch has a known Google Place ID.
 */
const BRANCHES = [
  { placeId: "ChIJgZ8yuROZyzsRoG3M8JtuzQE", branch: "Uppal" },
  // Tarnaka branch — resolved from Google Maps short link
  { placeId: "ChIJKQLmj22ZyzsRZBtjdELdvHk", branch: "Tarnaka" },
];

// In-memory cache — revalidation is handled by Next.js ISR
let cache: { data: SheetReview[]; ts: number } | null = null;
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache in memory

/**
 * Fetch 5-star reviews from Google Places API (New) for all branches.
 * Returns combined, de-duped, sorted reviews.
 *
 * Limitations:
 *   - Google Places API returns max 5 reviews per place.
 *   - We fetch both Uppal and Tarnaka → max ~10 reviews.
 *   - Only 5-star reviews are included (rating >= 5).
 */
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

  const allReviews: SheetReview[] = [];

  for (const { placeId, branch } of BRANCHES) {
    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}?languageCode=en`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "reviews",
          },
          // Next.js fetch cache: revalidate every hour in production (3600) 
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        console.error(
          `[google-places] Failed to fetch reviews for ${branch}:`,
          await response.text()
        );
        continue;
      }

      const data = await response.json();
      const rawReviews = data.reviews || [];

      const branchReviews: SheetReview[] = rawReviews
        .filter((r: any) => {
          // Only 5-star reviews (Google uses integer ratings, so >= 5 means 5-star only)
          return r.rating >= 5;
        })
        .map((r: any, idx: number) => ({
          _id: `places-${branch.toLowerCase()}-${idx}`,
          name: r.authorAttribution?.displayName || "Happy Client",
          rating: r.rating || 5,
          date: r.relativePublishTimeDescription || "Recent",
          reviewText: r.text?.text || "",
          service: "Salon Visit",
          branch,
          avatar: r.authorAttribution?.photoUri || "",
        }));

      allReviews.push(...branchReviews);
    } catch (err: any) {
      console.error(
        `[google-places] Exception fetching ${branch} reviews:`,
        err.message
      );
    }
  }

  // Update cache
  cache = { data: allReviews, ts: Date.now() };

  return allReviews;
}

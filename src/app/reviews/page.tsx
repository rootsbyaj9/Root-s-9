/**
 * reviews/page.tsx — Client Reviews & Testimonials Page
 *
 * Data source: Google Places API (New) → both Uppal & Tarnaka branches.
 * Falls back to static reviews.json when the API is unavailable.
 *
 * ISR: Revalidates every 30 days (~monthly auto-refresh).
 */

import type { Metadata } from 'next';
import ReviewsClient from '@/components/sections/reviews/ReviewsClient';
import { getPlacesReviews } from '@/lib/google-places';
import reviewsJson from '@/data/reviews.json';

export const metadata: Metadata = {
  title: "Client Reviews | Root's Salon Hyderabad | 1600+ Happy Clients",
  description:
    "Read 1600+ real Google reviews for Root's Family Salon Hyderabad. Rated 4.8★ across our Uppal and Tarnaka branches.",
  openGraph: {
    title: "Client Reviews | Root's Salon Hyderabad",
    description: "1600+ real Google reviews. Rated 4.8★ across Uppal and Tarnaka branches.",
    type: 'website',
  },
};

export const revalidate = 2592000; // revalidate every 30 days

export default async function ReviewsPage() {
  const siteSettings: Record<string, any> = {};

  // Try Google Places API first (live, auto-updating)
  const apiReviews = await getPlacesReviews();

  // Merge manual/pinned reviews from JSON with live API reviews
  let reviewsData = [...(reviewsJson as any[])];
  if (apiReviews && apiReviews.length > 0) {
    reviewsData = [...reviewsData, ...apiReviews];
  }

  return <ReviewsClient reviews={reviewsData} settings={siteSettings} />;
}

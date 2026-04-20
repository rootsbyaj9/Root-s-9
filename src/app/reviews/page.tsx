/**
 * reviews/page.tsx — Client Reviews & Testimonials Page
 *
 * Section order (per implementation plan §Phase 6):
 *   1. Hero header — "What Our Clients Say"
 *   2. Stats bar — 500+ Reviews · 4.9★ Google · 3 Branches
 *   3. Testimonials masonry — 8 hardcoded reviews, 3-col layout
 *   4. Google Reviews CTA banner
 *   5. CTASection
 *
 * Design patterns:
 * - Cards: warm parchment/linen, subtle border, star ratings in roots-orange
 * - Alternating card heights for editorial variety
 * - Google badge linking to Google Business
 */

import type { Metadata } from 'next';
import ReviewsClient from '@/components/sections/reviews/ReviewsClient';

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

export const revalidate = 60;

export default async function ReviewsPage() {
  const reviewsData: any[] = []; // Sanity fetching disabled — will be wired at final delivery
  const siteSettings: Record<string, any> = {}; // Sanity fetching disabled — will be wired at final delivery
  
  return <ReviewsClient reviews={reviewsData} settings={siteSettings} />;
}

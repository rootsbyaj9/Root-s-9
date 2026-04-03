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
  title: "Client Reviews | Root's The Family Salon Hyderabad",
  description:
    "Read real reviews from Root's Salon clients. 4.9★ rated across Hyderabad — Kondapur, Manikonda, and our newest branch.",
  openGraph: {
    title: "Client Reviews | Root's The Family Salon",
    description: "4.9★ rated · 500+ happy clients across Hyderabad.",
    type: 'website',
  },
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}

/**
 * blog/page.tsx — Blog Index Page
 *
 * Section order (per implementation plan §Phase 7):
 *   1. Hero header
 *   2. Featured post (large card, full-width)
 *   3. Post grid (3-col, 5 posts)
 *   4. Coming Soon banner (content pipeline note)
 *   5. CTASection
 *
 * All posts are hardcoded — structured for future Sanity migration.
 * Each post card links to /blog/[slug]
 */
import type { Metadata } from 'next';
import BlogClient from '@/components/sections/blog/BlogClient';

export const metadata: Metadata = {
  title: "Blog & Beauty Tips | Root's The Family Salon Hyderabad",
  description:
    "Expert hair care tips, skin advice, and beauty guides from the Root's Salon team. Learn how to maintain your look between salon visits.",
  openGraph: {
    title: "Blog | Root's The Family Salon",
    description: "Beauty tips, hair care guides, and skin advice from the Root's team.",
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}

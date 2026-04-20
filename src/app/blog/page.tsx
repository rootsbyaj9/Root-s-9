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
  title: "Hair & Beauty Tips | Root's Salon Hyderabad Blog",
  description:
    "Expert hair and beauty advice from the Root's team — balayage care, facial guides, bridal trends, tattoo aftercare, and more.",
  openGraph: {
    title: "Hair & Beauty Tips | Root's Salon Hyderabad Blog",
    description: "Expert hair and beauty advice from the Root's team — balayage, facials, bridal trends, and more.",
    type: 'website',
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts: any[] = []; // Sanity fetching disabled — will be wired at final delivery
  return <BlogClient posts={posts} />;
}

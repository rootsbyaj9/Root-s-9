/**
 * page.tsx — Homepage
 *
 * Section build order (per implementation plan §Phase 1):
 *   1. Hero        — cinematic full-screen, transparent navbar overlay
 *   2. TrustStrip  — animated stat counters (GSAP count-up on scroll)
 *   3. ServicesGrid — 4-column bento grid with hover reveals
 *   4. BeforeAfter — interactive drag-to-compare slider
 *   5. CTASection  — shared dark obsidian CTA (WhatsApp conversion)
 *
 * SEO: metadata exported at this level for homepage-specific title/description.
 * Fonts and global layout are in layout.tsx.
 */

import type { Metadata } from "next";
import Hero from "@/components/sections/home/Hero";
import TrustStrip from "@/components/sections/home/TrustStrip";
import ServicesGrid from "@/components/sections/home/ServicesGrid";
import StickyServicesScroll from "@/components/sections/home/StickyServicesScroll";
import BeforeAfter from "@/components/sections/home/BeforeAfter";
import BrandStrip from "@/components/sections/home/BrandStrip";
import ReviewsPreview from "@/components/sections/home/ReviewsPreview";
import CTASection from "@/components/sections/shared/CTASection";
import { getPlacesReviews } from "@/lib/google-places";
import reviewsJson from "@/data/reviews.json";
import { client } from "@/sanity/client";
import { getHomePageQuery, getServiceCategoriesQuery, getLocationsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Root's Family Salon Hyderabad | Hair, Skin, Bridal & Tattoo",
  description:
    "Walk in. Walk out different. Root's is Hyderabad's premium family salon — expert hair, skin, bridal and tattoo services at Uppal and Tarnaka. Book your appointment today.",
  openGraph: {
    title: "Root's Family Salon Hyderabad | Hair, Skin, Bridal & Tattoo",
    description:
      "Walk in. Walk out different. Root's is Hyderabad's premium family salon — expert hair, skin, bridal and tattoo services at Uppal and Tarnaka.",
    type: "website",
  },
};

// Revalidate set to 60 for fast ISR caching in production
export const revalidate = 60;

export default async function HomePage() {
  // Fetch homepage content and service categories from Sanity CMS
  const homePageData = await client?.fetch(getHomePageQuery).catch(() => null) ?? {};
  const servicesData = await client?.fetch(getServiceCategoriesQuery).catch(() => null) ?? [];
  const locationsData = await client?.fetch(getLocationsQuery).catch(() => null) ?? [];

  // Live reviews from Google Places API (auto-refreshes via ISR)
  const apiReviews = await getPlacesReviews();
  
  // Merge manual/pinned reviews from JSON with live API reviews
  let reviewsData = [...(reviewsJson as any[])];
  if (apiReviews && apiReviews.length > 0) {
    reviewsData = [...reviewsData, ...apiReviews];
  }


  return (
    <>
      {/* 1 — Cinematic hero */}
      <Hero homePageData={homePageData} />

      {/* 2 — Trust strip (stat counters count-up on scroll entry) */}
      <TrustStrip homePageData={homePageData} activeLocationsCount={locationsData.length || undefined} />

      {/* 3 — Services bento grid (Hair · Bridal · Skin · Tattoo) */}
      <ServicesGrid cmsServices={servicesData} cmsImages={homePageData} />

      {/* 3.5 — Sticky scroll feature section (Ally21-style) */}
      <StickyServicesScroll />

      {/* 4 — Before/After drag slider */}
      <BeforeAfter homePageData={homePageData} />

      {/* 4.5 — Brand Partner Strip */}
      <BrandStrip partners={homePageData?.partners} />

      {/* 5 — Reviews Preview (3-card grid) */}
      <ReviewsPreview reviews={reviewsData} />

      {/* 5 — Dark CTA (shared component, ends every page) */}
      <CTASection 
        heading={homePageData?.ctaHeadline || undefined}
        ctaLabel={homePageData?.ctaButtonText || undefined}
      />
    </>
  );
}

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
import ReviewsPreview from "@/components/sections/home/ReviewsPreview";
import CTASection from "@/components/sections/shared/CTASection";

export const metadata: Metadata = {
  title: "Root's Family Salon Hyderabad | Hair, Skin, Bridal & Tattoo",
  description:
    "Walk in. Walk out different. Root's is Hyderabad's premium family salon — expert hair, skin, bridal and tattoo services at Uppal and Tarnaka. Book via WhatsApp today.",
  openGraph: {
    title: "Root's Family Salon Hyderabad | Hair, Skin, Bridal & Tattoo",
    description:
      "Walk in. Walk out different. Root's is Hyderabad's premium family salon — expert hair, skin, bridal and tattoo services at Uppal and Tarnaka.",
    type: "website",
  },
};

export const revalidate = 60;

export default async function HomePage() {
  // Sanity fetching disabled — will be wired at final delivery.
  // Using empty objects/arrays to force fully hardcoded fallback text in components.
  const homePageData: Record<string, any> = {}; 
  const servicesData: any[] = []; 
  const reviewsData: any[] = [];  


  return (
    <>
      {/* 1 — Cinematic hero */}
      <Hero homePageData={homePageData} />

      {/* 2 — Trust strip (stat counters count-up on scroll entry) */}
      <TrustStrip homePageData={homePageData} />

      {/* 3 — Services bento grid (Hair · Bridal · Skin · Tattoo) */}
      <ServicesGrid cmsServices={servicesData} cmsImages={homePageData} />

      {/* 3.5 — Sticky scroll feature section (Ally21-style) */}
      <StickyServicesScroll />

      {/* 4 — Before/After drag slider */}
      <BeforeAfter homePageData={homePageData} />

      {/* 4.5 — Reviews Preview (3-card grid) */}
      <ReviewsPreview reviews={reviewsData} />

      {/* 5 — Dark CTA (shared component, ends every page) */}
      <CTASection 
        heading={homePageData?.ctaHeadline || undefined}
        ctaLabel={homePageData?.ctaButtonText || undefined}
      />
    </>
  );
}

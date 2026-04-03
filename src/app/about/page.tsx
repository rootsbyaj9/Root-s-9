/**
 * about/page.tsx — About Page
 *
 * Section order:
 *   1. Hero — "Where Craft Meets Care." full-width with founder portrait
 *   2. Founder Story — editorial 2-col with pull quote
 *   3. Values Grid — 3 cards (Craft, Warmth, Growth)
 *   4. Timeline — 3 milestones ("Founded", "1000 Clients", "3rd Branch")
 *   5. CTASection
 */

import type { Metadata } from 'next';
import CTASection from '@/components/sections/shared/CTASection';
import AboutHero from '@/components/sections/about/AboutHero';
import AboutFounder from '@/components/sections/about/AboutFounder';
import AboutValues from '@/components/sections/about/AboutValues';
import AboutTimeline from '@/components/sections/about/AboutTimeline';

export const metadata: Metadata = {
  title: "About Us | Root's The Family Salon Hyderabad",
  description:
    "Meet the founder and team behind Root's The Family Salon — a family destination for premium hair, skin, and beauty services across Hyderabad.",
  openGraph: {
    title: "About Root's The Family Salon",
    description:
      "Our story, mission, and the values that drive every appointment.",
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutFounder />
      <AboutValues />
      <AboutTimeline />
      
      <CTASection
        heading="Come meet us in person."
        subtext="Book a complimentary consultation at any of our three branches. Let's talk about what a transformation looks like for you."
        ctaLabel="Book via WhatsApp"
      />
    </>
  );
}

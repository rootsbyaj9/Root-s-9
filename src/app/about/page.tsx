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
  title: "About Root's Family Salon | Anikanth Jadhav, Hyderabad",
  description:
    "Founded by Anikanth Jadhav, Root's has been Hyderabad's trusted family salon for 8+ years. Hair, skin, bridal and tattoo under one roof at Uppal and Tarnaka.",
  openGraph: {
    title: "About Root's Family Salon | Anikanth Jadhav, Hyderabad",
    description:
      "Founded by Anikanth Jadhav. 8+ years trusted in Hyderabad. Hair, skin, bridal and tattoo under one roof.",
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

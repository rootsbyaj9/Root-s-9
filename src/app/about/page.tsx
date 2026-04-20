/**
 * about/page.tsx — About Page (Server Component)
 *
 * Fetches the `aboutPage` singleton from Sanity CMS.
 * Falls back to each component's built-in static defaults if Sanity returns null.
 * Revalidates every 1 hour via ISR.
 */

import type { Metadata } from 'next';
import { client } from '@/sanity/client';
import { getAboutPageQuery } from '@/sanity/lib/queries';
import CTASection from '@/components/sections/shared/CTASection';
import AboutHero from '@/components/sections/about/AboutHero';
import AboutFounder from '@/components/sections/about/AboutFounder';
import AboutValues from '@/components/sections/about/AboutValues';
import AboutTimeline from '@/components/sections/about/AboutTimeline';

export const revalidate = 3600;

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

export default async function AboutPage() {
  // Fetch CMS singleton temporarily disabled per user request
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const about: any = null;

  return (
    <>
      <AboutHero
        eyebrow={about?.heroEyebrow}
        subtext={about?.heroSubtext}
        bgImageUrl={about?.aboutBackgroundImageUrl}
      />
      <AboutFounder
        founderName={about?.founderName}
        founderHeadline={about?.founderHeadline}
        founderQuote={about?.founderQuote}
        founderBio1={about?.founderBio1}
        founderBio2={about?.founderBio2}
        founderImageUrl={about?.founderImageUrl}
        aboutBackgroundImageUrl={about?.aboutBackgroundImageUrl}
      />
      <AboutValues
        heading={about?.valuesHeading}
        values={about?.values}
      />
      <AboutTimeline
        heading={about?.timelineHeading}
        milestones={about?.milestones}
      />

      <CTASection
        heading="Come meet us in person."
        subtext="Book a complimentary consultation at either of our branches. Let's talk about what a transformation looks like for you."
        ctaLabel="Book via WhatsApp"
      />
    </>
  );
}


/**
 * services/page.tsx — Services Page
 *
 * Section build order (per implementation plan §Phase 2):
 *   1. Page Hero Header — eyebrow + h1, full-bleed cinematic
 *   2. Service Category: 01 Hair Masterclass (image-left)
 *   3. Service Category: 02 Skin Rituals (image-right / flip)
 *   4. Service Category: 03 Bridal & Special Occasion (image-left)
 *   5. Service Category: 04 Tattoo Artistry (dark section, image-right / flip)
 *   6. CTASection (shared)
 *
 * Layout pattern: alternating image-left / image-right per steal list §2.
 * Pricing: "from ₹X" right-aligned per steal list §4.
 *
 * SEO: Dedicated title + meta description for /services.
 */

import type { Metadata } from 'next';
import ServiceCategory from '@/components/sections/services/ServiceCategory';
import CTASection from '@/components/sections/shared/CTASection';
import ServicesHero from '@/components/sections/services/ServicesHero';

export const metadata: Metadata = {
  title: "Services & Pricing | Root's The Family Salon Hyderabad",
  description:
    "Explore Root's full menu — hair cuts, colour & balayage, skin rituals, HydraFacial, bridal makeovers, and fine-art tattoos. See pricing from ₹299.",
  openGraph: {
    title: "Services & Pricing | Root's The Family Salon",
    description:
      "Premium hair, skin, bridal, and tattoo services in Hyderabad. See our full service menu and pricing.",
    type: 'website',
  },
};

/* ─── Service data — replace with Sanity CMS fetch at Milestone 3 ─── */

const hairServices = [
  { name: 'Cut & Blowdry', price: 'from ₹299' },
  { name: 'Hair Colour (global)', price: 'from ₹799' },
  { name: 'Balayage / Highlights', price: 'from ₹1,499' },
  { name: 'Keratin Smoothening', price: 'from ₹2,499' },
  { name: 'Scalp Treatment', price: 'from ₹599' },
  { name: 'Deep Conditioning', price: 'from ₹399' },
];

const skinServices = [
  { name: 'HydraFacial (Signature)', price: 'from ₹2,499' },
  { name: 'Brightening Facial', price: 'from ₹799' },
  { name: 'Dermaplaning', price: 'from ₹1,199' },
  { name: 'Anti-Acne Treatment', price: 'from ₹899' },
  { name: 'Waxing (Full Body)', price: 'from ₹999' },
  { name: 'Threading & Cleanup', price: 'from ₹149' },
];

const bridalServices = [
  { name: 'Bridal Makeup (HD)', price: 'from ₹8,999' },
  { name: 'Engagement Makeup', price: 'from ₹3,999' },
  { name: 'Mehendi Design', price: 'from ₹999' },
  { name: 'Pre-Bridal Package (4 sessions)', price: 'from ₹12,999' },
  { name: 'Bridal Hair Styling', price: 'from ₹2,499' },
  { name: 'Hairstyling For Occasions', price: 'from ₹799' },
];

const tattooServices = [
  { name: 'Fine-Line Tattoo (small)', price: 'from ₹1,500' },
  { name: 'Fine-Line Tattoo (large)', price: 'from ₹4,000' },
  { name: 'Realism Tattoo', price: 'from ₹5,000' },
  { name: 'Cover-Up Tattoo', price: 'from ₹3,000' },
  { name: 'Touch-Up Session', price: 'from ₹800' },
  { name: 'Custom Design Consultation', price: 'Free', note: '(1 hr)' },
];

/* ─── Page ─────────────────────────────────────────────────────────── */

export default function ServicesPage() {
  return (
    <>
      {/* 1 — Cinematic page hero */}
      <ServicesHero />

      {/* 2 — Hair Masterclass (image left) */}
      <ServiceCategory
        number="01"
        name="Hair Masterclass"
        tagline="From precision cuts to dimensional colour — your hair, elevated."
        services={hairServices}
        imagePlaceholder={{
          label: 'HAIR SERVICES',
          description:
            'Close-up of a styled balayage or blowout. Warm tones, editorial lighting. 800×600px.',
          mood: 'warm',
          aspectClass: 'aspect-[4/3]',
        }}
        flip={false}
      />

      {/* 3 — Skin Rituals (image right) */}
      <ServiceCategory
        number="02"
        name="Skin Rituals"
        tagline="Clinical-grade treatments with a spa-quality touch. Your glow, guaranteed."
        services={skinServices}
        imagePlaceholder={{
          label: 'SKIN TREATMENTS',
          description:
            'Facial treatment or HydraFacial in progress. Clinical-warm, soft radiant lighting. 800×600px.',
          mood: 'warm',
          aspectClass: 'aspect-[4/3]',
        }}
        flip={true}
      />

      {/* 4 — Bridal & Special Occasion (image left) */}
      <ServiceCategory
        number="03"
        name="Bridal Radiance"
        tagline="Your 30-day journey to the aisle — crafted for the most important day of your life."
        services={bridalServices}
        imagePlaceholder={{
          label: 'BRIDAL SERVICES',
          description:
            'Bridal full look — hair, makeup, mehndi. Golden hour, celebratory editorial. 600×800px.',
          mood: 'warm',
          aspectClass: 'aspect-[3/4]',
        }}
        flip={false}
      />

      {/* 5 — Tattoo Artistry (dark section, image right) */}
      <ServiceCategory
        number="04"
        name="Tattoo Artistry"
        tagline="Fine-line precision. Realism artistry. Permanent marks worth wearing."
        services={tattooServices}
        imagePlaceholder={{
          label: 'TATTOO ARTISTRY',
          description:
            'Fine-line or realism tattoo on wrist/arm. Dark background, high contrast, finished artwork. 800×800px.',
          mood: 'dark',
          aspectClass: 'aspect-square',
        }}
        flip={true}
        darkSection={true}
      />

      {/* 6 — Shared CTA */}
      <CTASection
        heading="Ready to book your treatment?"
        subtext="WhatsApp us to check availability, ask questions, or lock in your appointment. No forms. No waiting."
        ctaLabel="Book via WhatsApp"
      />
    </>
  );
}

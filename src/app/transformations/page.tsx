/**
 * transformations/page.tsx — Transformations Gallery Page
 *
 * Section order:
 *   1. Page header (centered eyebrow + h1)          — in TransformationsClient
 *   2. Sticky FilterBar (category pills)             — in TransformationsClient
 *   3. MasonryGrid (3-col, filterable)               — in TransformationsClient
 *   4. Mid-page trust strip ("Every look, crafted")  — inline below
 *   5. InstagramCTA (follow us for more)
 *   6. CTASection (WhatsApp booking)
 */

import type { Metadata } from 'next';
import CTASection from '@/components/sections/shared/CTASection';
import TransformationsClient from '@/components/sections/transformations/TransformationsClient';
import InstagramCTA from '@/components/sections/transformations/InstagramCTA';
import { client } from '@/sanity/client';
import { getTransformationsQuery, getSiteSettingsQuery } from '@/sanity/lib/queries';

export const metadata: Metadata = {
  title: "Transformations Gallery | Root's The Family Salon Hyderabad",
  description:
    "Browse real before & after transformations from Root's Salon — hair colour, balayage, HydraFacial, bridal makeovers, and fine-art tattoos in Hyderabad.",
  openGraph: {
    title: "Transformations Gallery | Root's The Family Salon",
    description:
      "Real before & after results. Hair, skin, bridal, and tattoo transformations from Root's The Family Salon.",
    type: 'website',
  },
};

export const revalidate = 60;

export default async function TransformationsPage() {
  const [transformations, siteSettings] = await Promise.all([
    client?.fetch(getTransformationsQuery).catch(() => []) ?? [],
    client?.fetch(getSiteSettingsQuery).catch(() => null) ?? null,
  ]);

  const igUrl = siteSettings?.socialInstagram || 'https://www.instagram.com/roots_by_aj';

  return (
    <>
      {/* 1–3 — Header + FilterBar + MasonryGrid */}
      <TransformationsClient cmsTransformations={transformations} />

      {/* 4 — Mid-page copy section */}
      <section className="bg-linen py-20 md:py-24 border-y border-obsidian/[0.06]">
        <div className="container mx-auto px-6 md:px-16 max-w-4xl text-center">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-roots-orange block mb-5">
            EVERY LOOK · CRAFTED WITH CARE
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-obsidian leading-[1.15] mb-6">
            Behind every photo is a{' '}
            <em className="italic font-normal text-obsidian/60">client who trusted us.</em>
          </h2>
          <p className="font-sans text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            At Root's, no two transformations are the same. Each result you see is a real client —
            no filters, no stock photos. Just skilled hands, premium products, and the confidence
            that comes from years of practice.
          </p>
        </div>
      </section>

      {/* 5 — Instagram CTA */}
      <InstagramCTA
        handle="@roots_by_aj"
        profileUrl={igUrl}
      />

      {/* 6 — WhatsApp booking CTA */}
      <CTASection
        heading="Ready for your transformation?"
        subtext="Book a consultation and step into your best version. All it takes is one appointment."
        ctaLabel="Book via WhatsApp"
      />
    </>
  );
}


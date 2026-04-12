/**
 * transformations/page.tsx — Transformations Gallery Page
 *
 * Section order (per implementation plan §Phase 3):
 *   1. Page header (centered eyebrow + h1)
 *   2. Sticky FilterBar (category pills)
 *   3. MasonryGrid (3-col, filterable)
 *   4. CTASection (shared)
 *
 * FilterBar state lives here (client component) and passes to MasonryGrid.
 */

import type { Metadata } from 'next';
import CTASection from '@/components/sections/shared/CTASection';
import TransformationsClient from '@/components/sections/transformations/TransformationsClient';
import { client } from '@/sanity/client';
import { getTransformationsQuery } from '@/sanity/lib/queries';

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
  const transformations = await client?.fetch(getTransformationsQuery).catch(() => []) ?? [];

  return (
    <>
      <TransformationsClient cmsTransformations={transformations} />
      
      <CTASection
        heading="Ready for your transformation?"
        subtext="Book a consultation and step into your best version. All it takes is one appointment."
        ctaLabel="Book via WhatsApp"
      />
    </>
  );
}

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

export default function TransformationsPage() {
  return (
    <>
      <section className="bg-parchment pt-[160px] pb-32">
        <div className="container mx-auto px-6 md:px-16 max-w-4xl text-center">
          <span className="eyebrow tracking-[0.2em] text-roots-orange block mb-6">
            GALLERY
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-obsidian leading-[1.0] mb-8">
            Curating our <em className="italic font-normal text-roots-orange">best work.</em>
          </h1>
          <p className="font-sans text-warm-gray text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4">
            We are currently photographing our latest transformations to showcase the true quality of our premium services. 
          </p>
          <p className="font-sans text-warm-gray text-base max-w-2xl mx-auto leading-relaxed mb-12">
            From precision coloring and bridal masterclasses to fine-art tattoos—check back soon for a comprehensive lookbook.
          </p>
          <div className="h-px bg-obsidian/10 w-32 mx-auto"></div>
        </div>
      </section>
      
      <CTASection
        heading="Ready for a change?"
        subtext="Book a consultation and step into your best version. All it takes is one appointment."
        ctaLabel="Book via WhatsApp"
      />
    </>
  );
}

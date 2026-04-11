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
          <div className="h-px bg-obsidian/10 w-32 mx-auto mb-12"></div>

          {/* Instagram follow CTA */}
          <div className="inline-flex flex-col items-center gap-4">
            <p className="font-sans text-sm text-warm-gray">
              Follow our work in the meantime
            </p>
            <a
              href="https://www.instagram.com/roots_by_aj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-obsidian text-parchment font-sans text-[11px] font-semibold uppercase tracking-[0.08em] px-8 py-4 rounded-md hover:bg-obsidian/90 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow @roots_by_aj
            </a>
          </div>
        </div>
      </section>
      
      <CTASection
        heading="Ready for your transformation?"
        subtext="Book a consultation and step into your best version. All it takes is one appointment."
        ctaLabel="Book via WhatsApp"
      />
    </>
  );
}

/**
 * TransformationsClient.tsx
 *
 * Client component that owns the filter state and renders
 * the page header + FilterBar + MasonryGrid together.
 *
 * Split from the page.tsx so that metadata can remain a server export.
 */

'use client';

import MasonryGrid from './MasonryGrid';
import InstagramCTA from './InstagramCTA';

type TransformationsClientProps = {
  cmsTransformations?: any[];
};

export default function TransformationsClient({ cmsTransformations = [] }: TransformationsClientProps) {

  return (
    <>
      {/* 1 — Page header */}
      <section className="pt-36 pb-12 bg-parchment">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl text-center">
          <span className="eyebrow block mb-4 text-roots-orange tracking-[0.2em]">OUR PORTFOLIO</span>
          <h1 className="font-serif text-5xl md:text-7xl text-obsidian leading-[1.0] mt-2 mb-5">
            Real{' '}
            <em className="italic font-normal text-obsidian/70">Results.</em>
          </h1>
          <p className="font-sans text-warm-gray text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Browse our gallery of stunning client transformations — each one a
            story of craft, care, and confidence.
          </p>
        </div>
      </section>

      {/* 2 — Masonry gallery */}
      <MasonryGrid cmsTransformations={cmsTransformations} />

      {/* 3 — Instagram CTA */}
      <InstagramCTA />
    </>
  );
}

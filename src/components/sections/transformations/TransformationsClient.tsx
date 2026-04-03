/**
 * TransformationsClient.tsx
 *
 * Client component that owns the filter state and renders
 * the page header + FilterBar + MasonryGrid together.
 *
 * Split from the page.tsx so that metadata can remain a server export.
 */

'use client';

import { useState } from 'react';
import FilterBar from './FilterBar';
import MasonryGrid from './MasonryGrid';

export default function TransformationsClient() {
  const [active, setActive] = useState('all');

  return (
    <>
      {/* 1 — Page header */}
      <section className="pt-36 pb-12 bg-parchment">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl text-center">
          <span className="eyebrow">OUR PORTFOLIO</span>
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

      {/* 2 — Sticky filter pills */}
      <FilterBar active={active} onSelect={setActive} />

      {/* 3 — Masonry gallery */}
      <MasonryGrid activeCategory={active} />
    </>
  );
}

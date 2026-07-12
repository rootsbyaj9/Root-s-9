'use client';

/**
 * BrandStrip.tsx — "Brands That Trust Root's"
 *
 * A horizontal infinite marquee of partner brand logos.
 * Currently renders numbered placeholders — each slot is locked to 160×60 px.
 *
 * HOW TO REPLACE PLACEHOLDERS (when Sanity CMS is wired):
 *   Pass `partners` prop from Sanity as:
 *     { name: string; logoUrl: string; websiteUrl?: string }[]
 *   Each logo will render inside the exact same 160×60 container — zero layout shift.
 *
 * LOGO SPECS FOR CLIENT:
 *   - Size: 160 × 60 px (landscape)
 *   - Format: PNG or SVG with transparent background
 *   - Color: dark version of your logo (strip background is parchment/linen)
 *
 * perf: removed Framer Motion — CSS marquee-horizontal keyframe (globals.css) is zero-JS.
 */

import Image from 'next/image';

interface Partner {
  name: string;
  logoUrl?: string | null;
  websiteUrl?: string;
}

interface BrandStripProps {
  /** CMS partners — when Sanity is wired, pass from Sanity query */
  partners?: Partner[];
}

// ─── Placeholder slots (8 brand slots) ───────────────────────────────────────
const PLACEHOLDER_SLOTS: Partner[] = [
  { name: 'Partner Brand 01' },
  { name: 'Partner Brand 02' },
  { name: 'Partner Brand 03' },
  { name: 'Partner Brand 04' },
  { name: 'Partner Brand 05' },
  { name: 'Partner Brand 06' },
  { name: 'Partner Brand 07' },
  { name: 'Partner Brand 08' },
];

function LogoSlot({ partner }: { partner: Partner }) {
  const inner = partner.logoUrl ? (
    <Image
      src={partner.logoUrl}
      alt={partner.name}
      width={160}
      height={60}
      className="object-contain w-full h-full"
    />
  ) : (
    /* Placeholder — exactly 160×60, shows slot number + expected spec */
    <div className="w-full h-full flex flex-col items-center justify-center gap-1 rounded border border-dashed border-obsidian/15 bg-obsidian/[0.03] select-none">
      <span className="font-sans text-[8px] uppercase tracking-[0.18em] text-obsidian/25 font-semibold leading-none text-center px-2">
        Partner Logo

      </span>
      <span className="font-sans text-[7px] text-obsidian/20 leading-none">
        160 × 60 px · PNG / SVG
      </span>
    </div>
  );

  const wrapperClass = "flex items-center justify-center w-[160px] h-[60px] opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0";

  const wrapper = partner.websiteUrl ? (
    <a
      href={partner.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${partner.name}`}
      className={`block ${wrapperClass}`}
    >
      {inner}
    </a>
  ) : (
    <div className={wrapperClass}>
      {inner}
    </div>
  );

  return wrapper;
}

export default function BrandStrip({ partners }: BrandStripProps) {
  const items = partners && partners.length > 0 ? partners : PLACEHOLDER_SLOTS;

  // Duplicate for seamless loop (2× minimum)
  const track = [...items, ...items];

  return (
    <section
      className="py-16 md:py-20 bg-parchment border-y border-obsidian/[0.06] overflow-hidden"
      aria-label="Our partner brands"
    >
      <div className="container mx-auto px-6 md:px-16 mb-10 text-center">
        <span className="eyebrow block mb-3">Our Trusted Partners</span>
        <h2 className="font-serif text-3xl md:text-4xl text-obsidian leading-[1.1]">
          Brands That Trust{' '}
          <em className="font-normal italic text-roots-orange">Root's</em>
        </h2>
      </div>

      {/* Infinite scrolling logo track — pure CSS, zero JS overhead */}
      <div className="relative flex overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-parchment to-transparent pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-parchment to-transparent pointer-events-none" />

        {/* CSS animation — uses marquee-horizontal keyframe from globals.css */}
        <div
          className="flex items-center gap-10 w-max"
          style={{ animation: 'marquee-horizontal 30s linear infinite' }}
        >
          {track.map((partner, i) => (
            <LogoSlot key={i} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}

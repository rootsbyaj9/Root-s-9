/**
 * ServicesHero.tsx
 *
 * Cinematic page hero for the /services route.
 *
 * Layout: 70vh full-bleed image with gradient overlay.
 * Left-aligned text (eyebrow + h1 + tagline) positioned center-left.
 *
 * Animation: GSAP stagger on text elements (opacity + y) on mount.
 *
 * Image placeholder: replace with next/image when salon interior photo arrives.
 */

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

export default function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.sh-el',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.2,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden flex items-end"
      aria-label="Services page header"
    >
      {/* Background image placeholder */}
      <div className="absolute inset-0">
        <ImagePlaceholder
          label="SERVICES PAGE HERO"
          description="Salon interior — wide ambient shot of styling chairs and warm lighting. 1920×822px WebP."
          mood="warm"
          className="w-full h-full"
        />
      </div>

      {/* Gradient overlay — obsidian bleeds up from bottom so text is always legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-obsidian/30 to-obsidian/10" />

      {/* Text content — bottom-left anchored */}
      <div className="relative z-10 container mx-auto px-6 md:px-16 max-w-7xl pb-16 md:pb-20">
        <span className="sh-el eyebrow !text-parchment/60 !text-[10px]">
          MENU
        </span>

        <h1 className="sh-el font-serif text-5xl md:text-7xl text-parchment leading-[1.0] mt-2 mb-4">
          Our{' '}
          <em className="italic font-normal text-parchment/80">Services.</em>
        </h1>

        <p className="sh-el font-sans text-parchment/70 text-base md:text-lg leading-relaxed max-w-lg">
          Curated treatments, expert artistry, and real results — from a quick
          blowdry to a full bridal transformation.
        </p>
      </div>
    </section>
  );
}

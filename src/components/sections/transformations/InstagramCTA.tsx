/**
 * InstagramCTA.tsx
 *
 * Elegant Instagram nudge section for the Transformations page.
 * Shows the Instagram handle with a preview-style card and a link.
 *
 * Design:
 * - Dark obsidian background (contrasts with parchment gallery above)
 * - Large italic heading with orange accent
 * - Instagram logo + handle + CTA button
 */

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

interface InstagramCTAProps {
  handle?: string;
  profileUrl?: string;
}

export default function InstagramCTA({
  handle = '@roots_by_aj',
  profileUrl = 'https://www.instagram.com/roots_by_aj',
}: InstagramCTAProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.ig-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="bg-obsidian py-20 md:py-28 overflow-hidden relative"
    >
      {/* Subtle texture ring */}
      <div className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full border border-parchment/5 pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-[300px] h-[300px] rounded-full border border-roots-orange/10 pointer-events-none" />

      <div className="ig-content container mx-auto px-6 md:px-16 max-w-5xl text-center">
        {/* Instagram icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] mb-8 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            className="w-7 h-7"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-4xl md:text-5xl text-parchment leading-[1.1] mb-4">
          Want to see{' '}
          <em className="italic font-normal text-roots-orange">more?</em>
        </h2>

        <p className="font-sans text-warm-gray/80 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-8">
          We post fresh transformations every week —
          hair colours, bridal glam, skin treatments, and everything in between.
          Follow us for your daily dose of inspiration.
        </p>

        {/* Handle pill */}
        <p className="font-sans text-[13px] uppercase tracking-[0.2em] text-parchment/50 mb-6">
          {handle}
        </p>

        {/* CTA Button */}
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="ig-visit-profile"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white font-sans text-[12px] font-semibold uppercase tracking-[0.1em] px-8 py-4 rounded-full shadow-lg hover:opacity-90 hover:shadow-[0_8px_30px_rgba(232,104,60,0.4)] transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          Visit Our Instagram
        </a>
      </div>
    </section>
  );
}

"use client";

/**
 * Hero.tsx — Cinematic Full-Screen Hero (Lakmē style)
 *
 * Wireframe Reference: §Home: Cinematic Hero
 * Design Laws:
 *   - Full viewport height, full-bleed
 *   - bg-gradient bottom overlay (obsidian/60 → transparent)
 *   - Text: centered, Playfair h1, mixed weight (upright + italic)
 *   - CTA: btn-primary (roots-orange)
 *   - Image placeholder: warms linen bg labeled with exact specs
 *
 * GSAP Animations (scroll-triggered):
 *   - Parallax: image moves at 15% of scroll speed (scrub)
 *   - Text: word-by-word rise (y:40→0, opacity:0→1, stagger 80ms)
 *   - CTA: fade-in 400ms after text completes
 *
 * React 19 rule: ref is a regular prop — no forwardRef
 * GSAP rule: useGSAP with { scope } — never raw useEffect for animations
 */

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const WHATSAPP_NUMBER = "919700744357";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── Parallax: background image scrolls at 15% of page scroll speed ───
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ── Text reveal: staggered word-by-word rise ──────────────────────────
      // Targeting direct children of contentRef for the stagger
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-end pb-24 md:pb-32 overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Background image layer ─────────────────────────────────────── */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        aria-hidden="true"
      >
        {/*
         * ┌───────────────────────────────────────────────────────────────┐
         * │ HERO BACKGROUND IMAGE                                         │
         * │ Type: Premium salon interior OR model with styled hair         │
         * │ Mood: Soft directional lighting, warm tones, close-up          │
         * │ Ratio: 16:9 minimum (full viewport fill)                       │
         * │ Dimensions: 1920×1080px minimum, 2560×1440px preferred        │
         * │ Format: WebP, <300KB after optimization                        │
         * │ DO NOT USE: Stock photography, bright/clinical lighting        │
         * │                                                                │
         * │ SWAP IN:                                                       │
         * │   <Image src="/images/hero.webp" alt="..." fill               │
         * │     className="object-cover object-center"                    │
         * │     priority sizes="100vw" />                                  │
         * └───────────────────────────────────────────────────────────────┘
         */}
        <ImagePlaceholder
          label="Hero Background · 1920×1080px · WebP"
          description="Premium salon interior or model with styled hair. Soft directional lighting, warm tones. Swap with next/image when asset arrives."
          mood="dark"
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* ── Gradient overlay — obsidian at bottom for text legibility ──── */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-obsidian/85 via-obsidian/30 to-obsidian/20"
        aria-hidden="true"
      />

      {/* ── Hero content ──────────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-20 text-center max-w-4xl px-6 md:px-8 flex flex-col items-center gap-0"
      >
        {/* Eyebrow */}
        <span className="font-sans text-roots-orange uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-7 block">
          The Premium Experience
        </span>

        {/* H1 — mixed weight: upright + italic (Steal List #1) */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-parchment leading-[1.08] mb-10 tracking-tight">
          Your Canvas.
          <br />
          <em className="italic text-parchment/80 font-normal">
            Our Masterpiece.
          </em>
        </h1>

        {/* Primary CTA → WhatsApp */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Reserve Your Time
        </a>

        {/* Scroll hint — subtle, disappears on scroll */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-50">
          <span className="font-sans text-parchment text-[10px] uppercase tracking-widest">
            Scroll to explore
          </span>
          <span className="block w-px h-8 bg-parchment/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

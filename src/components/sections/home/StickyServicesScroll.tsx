"use client";

/**
 * StickyServicesScroll.tsx — Ally21-Style Sticky Scroll Feature Section
 *
 * Layout:
 *   DESKTOP (md+): CSS Grid — left 42% text / right 54% sticky image
 *   MOBILE (<md):  Sticky image panel pinned to top; text blocks scroll beneath
 *
 * Pure CSS sticky-image approach:
 * - The section itself is `position: relative; overflow: visible`
 * - Left text column: normal block flow, full width up to 42vw
 * - Right image: `position: sticky; top: 5rem` sized to viewport height
 *   placed as a direct inline sibling using CSS grid (no flex/absolute issues)
 *
 * CSS Grid layout:
 *   grid-cols: [left] 42% [gap] 4% [right] 54% → both cells share the grid row
 *   Left cell: auto height → drives the grid height
 *   Right cell: sticky → stays in viewport for full left-column height
 */

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  {
    id: "hair",
    eyebrow: "Hair Masterclass",
    heading: "Precision Cuts & Colour Artistry",
    body: "From sharp bobs to lived-in balayage — our stylists are trained in the latest techniques, using only damage-free, ammonia-free products so your hair stays healthy and luminous.",
    cta: { label: "Explore Hair", href: "/services?tab=womens" },
    placeholder: {
      label: "Hair Service",
      description: "Close-up of a beautifully styled, glossy hair transformation. Warm salon lighting.",
      mood: "warm" as const,
    },
  },
  {
    id: "bridal",
    eyebrow: "Bridal Studio",
    heading: "Your Biggest Day, Made Flawless",
    body: "Complete bridal packages — HD makeup, elegant updo, manicure, and more — tailored to your look, skin tone, and dream. We've dressed hundreds of Hyderabad brides.",
    cta: { label: "Book Bridal Trial", href: "/services?tab=bridal" },
    placeholder: {
      label: "Bridal Look",
      description: "A radiant bride in full bridal makeup, shot in golden hour lighting.",
      mood: "warm" as const,
    },
  },
  {
    id: "skin",
    eyebrow: "Skin Rituals",
    heading: "Glow That Goes Skin-Deep",
    body: "Advanced facials, cleanup treatments, and skin-specific rituals that target your concerns — not just today's glow, but long-term skin health.",
    cta: { label: "Explore Skin", href: "/services?tab=womens" },
    placeholder: {
      label: "Skin Ritual",
      description: "Close-up of glowing, radiant skin after a premium facial treatment.",
      mood: "warm" as const,
    },
  },
  {
    id: "tattoo",
    eyebrow: "Tattoo Artistry",
    heading: "Fine-Line Realism. Permanent Art.",
    body: "Our resident tattoo artists specialise in fine-line, geometric, and realism styles. Every piece is unique — inked in a fully sterile, private studio.",
    cta: { label: "View Tattoo Gallery", href: "/services?tab=tattoo" },
    placeholder: {
      label: "Tattoo Art",
      description: "Detailed fine-line tattoo on wrist, high contrast photography.",
      mood: "dark" as const,
    },
  },
];

export default function StickyServicesScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      // Desktop: ScrollTrigger on left-column items
      HIGHLIGHTS.forEach((_, i) => {
        const el = itemRefs.current[i];
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });

        // Entry animation
        const children = el.querySelectorAll(
          ".item-eyebrow, .item-heading, .item-body, .item-cta"
        );
        gsap.fromTo(
          children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Mobile: ScrollTrigger on mobile text items
      HIGHLIGHTS.forEach((_, i) => {
        const el = mobileItemRefs.current[i];
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-parchment"
      aria-label="Featured Services"
      style={{ overflow: "visible" }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div
        className="mx-auto pt-24 pb-16 px-6 md:px-16"
        style={{ maxWidth: "1280px" }}
      >
        <span className="eyebrow">FEATURED SERVICES</span>
        <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="font-serif text-obsidian leading-[1.1]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.25rem)" }}>
            Crafted for{" "}
            <em className="italic font-normal text-roots-orange">Every Look.</em>
          </h2>
          <Link
            href="/services"
            className="font-sans uppercase text-xs tracking-widest text-obsidian border-b border-obsidian pb-0.5 hover:text-roots-orange hover:border-roots-orange transition-colors duration-200 self-start md:self-auto"
          >
            View All Services →
          </Link>
        </div>
      </div>

      {/* ── Desktop Grid Layout ─────────────────────────────────────────── */}
      {/*
        CSS Grid: left cell auto-height, right cell sticky.
        grid-template-columns puts left at 42%, gap 4%, right 54%.
        align-items: start is critical — stretch would collapse right cell.
      */}
      <div
        className="hidden md:grid pb-24 mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "4rem",
          paddingRight: "4rem",
          gridTemplateColumns: "42% 54%",
          columnGap: "4%",
          alignItems: "start",
        }}
      >
        {/* LEFT: text blocks */}
        <div className="flex flex-col">
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              style={{
                paddingTop: i === 0 ? 0 : "5rem",
                paddingBottom: i === HIGHLIGHTS.length - 1 ? 0 : "5rem",
                opacity: activeIndex === i ? 1 : 0.15,
                transition: "opacity 0.5s ease",
              }}
            >
              <span className="item-eyebrow eyebrow mb-5 block">{item.eyebrow}</span>
              <h3
                className="item-heading font-serif text-obsidian whitespace-pre-line mb-6"
                style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.75rem)", lineHeight: 1.1 }}
              >
                {item.heading}
              </h3>
              <p className="item-body font-sans text-obsidian/60 leading-relaxed mb-8" style={{ fontSize: "0.9375rem", maxWidth: "400px" }}>
                {item.body}
              </p>
              <Link
                href={item.cta.href}
                className="item-cta inline-flex items-center gap-2 font-sans uppercase tracking-[0.08em] text-roots-orange font-medium group/link"
                style={{ fontSize: "0.6875rem" }}
              >
                {item.cta.label}
                <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* RIGHT: sticky image */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            position: "sticky",
            top: "5.5rem",
            height: "calc(100vh - 9rem)",
          }}
        >
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={item.id}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: activeIndex === i ? 1 : 0 }}
              aria-hidden={activeIndex !== i}
            >
              <ImagePlaceholder
                label={item.placeholder.label}
                description={item.placeholder.description}
                mood={item.placeholder.mood}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent pointer-events-none" />
              <div
                className="absolute bottom-6 left-6 backdrop-blur-sm text-parchment/90 font-sans uppercase rounded-md"
                style={{
                  background: "rgba(26,16,8,0.72)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.12em",
                  padding: "0.4rem 0.75rem",
                }}
              >
                {item.eyebrow}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: sticky image + scrolling text blocks ────────────────── */}
      <div className="md:hidden pb-16">
        {/* Sticky image panel — pins to top while text scrolls beneath */}
        <div
          className="sticky top-[72px] z-10 mx-4 rounded-2xl overflow-hidden"
          style={{ height: "52vw", minHeight: "220px", maxHeight: "340px" }}
        >
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={item.id}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: activeIndex === i ? 1 : 0 }}
              aria-hidden={activeIndex !== i}
            >
              <ImagePlaceholder
                label={item.placeholder.label}
                description={item.placeholder.description}
                mood={item.placeholder.mood}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent pointer-events-none" />
              <div
                className="absolute bottom-4 left-4 backdrop-blur-sm text-parchment/90 font-sans uppercase rounded-md"
                style={{
                  background: "rgba(26,16,8,0.72)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.12em",
                  padding: "0.35rem 0.65rem",
                }}
              >
                {HIGHLIGHTS[activeIndex].eyebrow}
              </div>
            </div>
          ))}

          {/* Progress dots */}
          <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
            {HIGHLIGHTS.map((_, i) => (
              <div
                key={i}
                className="rounded-full bg-parchment transition-all duration-300"
                style={{
                  width: activeIndex === i ? "18px" : "6px",
                  height: "6px",
                  opacity: activeIndex === i ? 1 : 0.5,
                }}
              />
            ))}
          </div>
        </div>

        {/* Scrolling text blocks */}
        <div className="flex flex-col mt-2">
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { mobileItemRefs.current[i] = el; }}
              className="px-6 py-10 border-b border-obsidian/[0.06] last:border-0"
              style={{
                opacity: activeIndex === i ? 1 : 0.4,
                transition: "opacity 0.4s ease",
              }}
            >
              <span className="eyebrow mb-3 block">{item.eyebrow}</span>
              <h3 className="font-serif text-obsidian leading-[1.15] mb-3" style={{ fontSize: "1.5rem" }}>
                {item.heading}
              </h3>
              <p className="font-sans text-obsidian/60 leading-relaxed mb-5" style={{ fontSize: "0.875rem" }}>
                {item.body}
              </p>
              <Link
                href={item.cta.href}
                className="inline-flex items-center gap-2 font-sans uppercase tracking-[0.08em] text-roots-orange font-medium"
                style={{ fontSize: "0.6875rem" }}
              >
                {item.cta.label} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

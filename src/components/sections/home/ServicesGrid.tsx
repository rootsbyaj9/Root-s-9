"use client";

/**
 * ServicesGrid.tsx — Bento Grid Service Cards
 *
 * Wireframe Reference: §Home: Services (Expanding Columns concept)
 * Grid layout (wireframe exact):
 *   - 4 columns total, 600px height on desktop
 *   - Card 1: col-span-1 (Hair)
 *   - Card 2: col-span-2 (Bridal — hero card, center)
 *   - Card 3: col-span-1 — split into two stacked mini-cards (Skin + Tattoo)
 *   - Mobile: stacked single column
 *
 * Hover behavior (CSS, no JS per 3-tool system):
 *   - Image opacity: 50% → 70%
 *   - Discover link: h-0 → h-12 (overflow hidden reveal)
 *
 * GSAP:
 *   - All 4 cards stagger fade-in from bottom on scroll enter
 *
 * Image specs: see placeholder comments inside each card
 */

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SectionHeader from "@/components/ui/SectionHeader";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

// ── Service card data ─────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "hair",
    number: "01",
    title: "Hair",
    href: "/services#hair",
    colSpan: "md:col-span-1",
    placeholder: {
      label: "Hair · 600×800px · 3:4",
      description:
        "Close-up of styled hair — cut, colour, or blowout. Warm, soft-focus background.",
    },
  },
  {
    id: "bridal",
    number: "02",
    title: "Bridal & Special Occasion",
    href: "/services#bridal",
    colSpan: "md:col-span-2",
    placeholder: {
      label: "Bridal · 1200×675px · 16:9",
      description:
        "Bridal full look — hair + makeup. Golden hour, elegant, celebratory.",
    },
  },
];

// Stacked pair (last column)
const STACKED_SERVICES = [
  {
    id: "skin",
    number: "03",
    title: "Skin",
    href: "/services#skin",
    placeholder: {
      label: "Skin · 800×600px · 4:3",
      description: "Facial treatment or glowing skin close-up. Clinical-warm, soft, radiant.",
    },
  },
  {
    id: "tattoo",
    number: "04",
    title: "Tattoo",
    href: "/services#tattoo",
    placeholder: {
      label: "Tattoo · 800×800px · 1:1",
      description:
        "Fine-line tattoo on wrist or arm. High contrast, dark background.",
    },
    dark: true,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-linen"
      id="services"
      aria-label="Our Services"
    >
      <div className="container mx-auto px-6 md:px-16">
        {/* Section header with "View All Services" action */}
        <SectionHeader
          eyebrow="Our Expertise"
          heading="Curated"
          headingEmphasis="Services"
          className="mb-16"
          action={
            <Link
              href="/services"
              className="font-sans uppercase text-xs tracking-widest text-obsidian border-b border-obsidian pb-0.5 hover:text-roots-orange hover:border-roots-orange transition-colors duration-200"
            >
              View All Services
            </Link>
          }
        />

        {/* ── Bento Grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[600px]">

          {/* Card 1: Hair (col-span-1, full height) */}
          <ServiceCard
            number={SERVICES[0].number}
            title={SERVICES[0].title}
            href={SERVICES[0].href}
            colSpan={SERVICES[0].colSpan}
            placeholder={SERVICES[0].placeholder}
          />

          {/* Card 2: Bridal (col-span-2, full height) */}
          <ServiceCard
            number={SERVICES[1].number}
            title={SERVICES[1].title}
            href={SERVICES[1].href}
            colSpan={SERVICES[1].colSpan}
            headingSize="text-3xl md:text-4xl"
            placeholder={SERVICES[1].placeholder}
          />

          {/* Column 4: Stacked Skin + Tattoo */}
          <div className="flex flex-col gap-4 md:col-span-1 h-full">
            {STACKED_SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                number={service.number}
                title={service.title}
                href={service.href}
                colSpan=""
                headingSize="text-xl md:text-2xl"
                padding="p-5"
                revealHeight="group-hover:h-8"
                placeholder={service.placeholder}
                dark={service.dark}
                className="flex-1"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── ServiceCard sub-component ─────────────────────────────────────────────────
interface ServiceCardProps {
  number: string;
  title: string;
  href: string;
  colSpan: string;
  headingSize?: string;
  padding?: string;
  revealHeight?: string;
  placeholder: { label: string; description: string };
  dark?: boolean;
  className?: string;
}

function ServiceCard({
  number,
  title,
  href,
  colSpan,
  headingSize = "text-2xl md:text-3xl",
  padding = "p-7",
  revealHeight = "group-hover:h-12",
  placeholder,
  dark = false,
  className = "",
}: ServiceCardProps) {
  return (
    <div
      className={`service-card group relative overflow-hidden bg-parchment opacity-0 ${colSpan} ${className}`}
    >
      {/*
       * Image: absolute inset, opacity transitions on hover (CSS — per 3-tool system)
       * Swap ImagePlaceholder with next/image when real photos arrive.
       * Parent div must stay `relative overflow-hidden`.
       */}
      <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500">
        <ImagePlaceholder
          label={placeholder.label}
          description={placeholder.description}
          mood={dark ? "dark" : "warm"}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Gradient overlay — bottom-to-top dark gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent" />

      {/* Card content — pinned to bottom */}
      <div className={`absolute bottom-0 left-0 w-full ${padding}`}>
        {/* Section number — Steal List #2 */}
        <span className="font-sans text-parchment/50 text-[10px] uppercase tracking-widest block mb-2">
          {number}
        </span>

        {/* Service name */}
        <h3 className={`font-serif ${headingSize} text-parchment mb-3 leading-tight`}>
          {title}
        </h3>

        {/* Discover link — CSS height reveal on hover (wireframe spec) */}
        <div className={`h-0 overflow-hidden ${revealHeight} transition-all duration-300`}>
          <Link
            href={href}
            className="text-roots-orange uppercase text-[10px] tracking-widest font-sans flex items-center gap-2 hover:gap-3 transition-all duration-200"
          >
            Discover <span className="text-base">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

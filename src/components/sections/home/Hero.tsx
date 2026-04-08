"use client";

/**
 * Hero.tsx — Clean, conversion-focused Hero Section
 *
 * Architecture:
 *   - Simple intro fade sequence on page load (no scroll-jacking or parallax).
 *   - Main transformation headline as H1.
 *   - Book CTA linking to WhatsApp.
 *   - Trust stats row fixed at the bottom of the hero.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SplitType from "split-type";

const WHATSAPP_NUMBER = "919700744357";

type HeroProps = {
  homePageData?: any;
};

export default function Hero({ homePageData = {} }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !contentRef.current) return;

      const introTl = gsap.timeline({ delay: 0.2 });

      // Extract and animate H1 text using SplitType
      const headline = contentRef.current.querySelector("h1");
      let split: SplitType | null = null;
      if (headline) split = new SplitType(headline, { types: "words" });

      const eyebrow = contentRef.current.querySelector("span");
      if (eyebrow) {
        introTl.fromTo(eyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.2);
      }

      if (split?.words) {
        introTl.fromTo(
          split.words,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" },
          0.3
        );
      }

      const ctadiv = contentRef.current.querySelector(".cta-wrapper");
      if (ctadiv) {
        introTl.fromTo(
          ctadiv,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.6
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-obsidian flex flex-col justify-center"
      aria-label="Hero"
    >
      {/* ── Salon Interior Background ──────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src={homePageData?.heroImageUrl || "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2000&auto=format&fit=crop"}
          alt="Root's Family Salon Interior"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      {/* ── Reduced Dark Veil (40%) ── */}
      <div className="absolute inset-0 z-10 bg-obsidian/40" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-obsidian/80 to-transparent z-10" />

      {/* ── Central Typography & CTA ─────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-20 text-center max-w-5xl px-6 md:px-8 mx-auto flex flex-col items-center pointer-events-auto"
      >
        <span className="font-sans text-roots-orange uppercase tracking-[0.15em] text-xs md:text-sm font-semibold mb-6 block drop-shadow-md">
          Hyderabad's premium family salon for hair, skin, bridal & tattoo artistry
        </span>

        <h1 className="font-serif text-[40px] sm:text-[52px] md:text-[68px] lg:text-[88px] text-parchment leading-[1.05] mb-10 tracking-tight drop-shadow-xl w-full">
          Walk in.
          <br className="md:hidden" /> <em className="italic text-parchment/90 font-normal">Walk out different.</em>
        </h1>

        <div className="cta-wrapper flex flex-col items-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            Book Your Appointment
          </a>
          <span className="font-sans text-[10px] md:text-xs text-parchment/70 uppercase tracking-widest mt-4">
            Instant confirmation  ·  No waiting
          </span>
        </div>
      </div>

    </section>
  );
}

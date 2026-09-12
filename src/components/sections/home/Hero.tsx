"use client";

/**
 * Hero.tsx — Cinematic Full-Screen Hero
 *
 * Design (Ally 21 benchmark):
 *   - Near-black (#17120f) background with a separate dark overlay div
 *     so the source image stays crisp (no opacity on the img itself).
 *   - Single editorial serif headline — no three-part script/serif split.
 *   - Two equal-height CTAs: BOOK NOW (orange solid) + VIEW SERVICES (ivory outline).
 *   - Bottom gradient fade protects the section boundary.
 *
 * GSAP:
 *   - Background image zooms in on load (1.15 → 1.0 "opening curtains")
 *   - Text and CTA fade in with staggered entrance animations
 */

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import SplitType from "split-type";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import type { SanityHomePageData } from "@/types/sanity";


type HeroProps = {
  homePageData?: SanityHomePageData | null;
};

export default function Hero({ homePageData = {} as SanityHomePageData }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !contentRef.current || !bgRef.current) return;

      // ── "Opening curtains" — bg zooms from 1.15 → 1.0 on load ────
      gsap.fromTo(
        bgRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 2.2, ease: "power2.out" }
      );

      // ── Intro text animation ───────────────────────────────────────
      const introTl = gsap.timeline({ delay: 0.3 });

      const headline = contentRef.current.querySelector("h1");
      let split: SplitType | null = null;
      if (headline) split = new SplitType(headline, { types: "words" });

      const eyebrow = contentRef.current.querySelector(".eyebrow-text");
      if (eyebrow) {
        introTl.fromTo(
          eyebrow,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.2
        );
      }

      if (split?.words) {
        introTl.fromTo(
          split.words,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.3
        );
      }

      const subtitle = contentRef.current.querySelector(".subtitle-text");
      if (subtitle) {
        introTl.fromTo(
          subtitle,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          0.55
        );
      }

      const ctadiv = contentRef.current.querySelector(".cta-wrapper");
      if (ctadiv) {
        introTl.fromTo(
          ctadiv,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.65
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center pt-24 pb-12 md:pt-32"
      style={{ backgroundColor: "#17120f" }}
      aria-label="Hero"
    >
      {/* ── Background image — source stays crisp; overlay is separate ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 scale-105 will-change-transform"
      >
        {homePageData?.heroBackgroundImageUrl ? (
          <Image
            src={homePageData.heroBackgroundImageUrl}
            alt="Root's salon interior"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <ImagePlaceholder
            label="Hero · Salon Interior"
            description="Premium salon interior, warm lighting, high contrast."
            mood="dark"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* ── Dark overlay — separate div keeps source image crisp ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/65 via-black/50 to-black/70" />

      {/* ── Central Typography & CTA ─────────────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-20 text-center max-w-4xl px-6 md:px-8 mx-auto flex flex-col items-center pointer-events-auto"
      >
        {/* Eyebrow */}
        <span className="eyebrow-text font-sans uppercase tracking-[0.18em] text-[11px] font-semibold mb-7 block"
          style={{ color: "#f0a46c" }}>
          {homePageData?.heroEyebrow || "Hyderabad's Premier Family Salon"}
        </span>

        {/* Single editorial headline — no script font */}
        <h1 className="font-serif italic font-medium text-[clamp(38px,5vw,68px)] leading-tight tracking-tight mb-5"
          style={{ color: "#fffdf9" }}>
          {homePageData?.heroHeadline || "Hair, Skin & Bridal,"}
          <br />
          <span style={{ color: "#fffdf9", opacity: 0.9 }}>
            {homePageData?.heroHeadlineItalic || "beautifully done."}
          </span>
        </h1>

        {/* Supporting line */}
        <p className="subtitle-text font-sans text-sm md:text-base max-w-xl mb-10 leading-relaxed"
          style={{ color: "rgba(255,253,249,0.6)" }}>
          {"Three locations across Hyderabad — Uppal, Tarnaka & Brahmanpally"}
        </p>

        {/* Equal-height CTAs */}
        <div className="cta-wrapper flex flex-col sm:flex-row items-center gap-4">
          {/* Primary CTA — orange solid */}
          <button
            id="hero-book-now"
            onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { tab: 'booking' } }))}
            className="btn-primary"
          >
            Book Now
          </button>

          {/* Secondary CTA — ivory outline */}
          <a
            id="hero-view-services"
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-outline-light"
          >
            View Services
          </a>
        </div>
      </div>

      {/* ── Bottom fade — protects section boundary ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #17120f)" }}
      />
    </section>
  );
}

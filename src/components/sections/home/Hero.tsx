"use client";

/**
 * Hero.tsx — Cinematic Full-Screen Hero
 *
 * Effect:
 *   - Background image zooms in on load (1.15 → 1.0 "opening curtains")
 *   - Text and CTA fade in with staggered entrance animations
 *   - Rainbow-glow CTA button for premium feel
 *   - No parallax scroll — clean static hero
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "919700744357";

type HeroProps = {
  homePageData?: any;
};

export default function Hero({ homePageData = {} }: HeroProps) {
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
      className="relative w-full h-screen overflow-hidden bg-obsidian flex flex-col justify-center"
      aria-label="Hero"
    >
      {/* ── Parallax Background Layer ──────────── */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform origin-center"
      >
        {/* Warm gradient orbs for depth */}
        <div className="absolute top-[8%] left-[12%] w-[600px] h-[600px] rounded-full bg-roots-orange/12 blur-[140px]" />
        <div className="absolute bottom-[5%] right-[8%] w-[450px] h-[450px] rounded-full bg-roots-orange/8 blur-[110px]" />
        <div className="absolute top-[45%] right-[30%] w-[350px] h-[350px] rounded-full bg-parchment/5 blur-[90px]" />
        <div className="absolute bottom-[30%] left-[40%] w-[250px] h-[250px] rounded-full bg-roots-orange/6 blur-[80px]" />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── Dark Veil ── */}
      <div className="absolute inset-0 z-10 bg-obsidian/35" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-obsidian/70 to-transparent z-10" />

      {/* ── Bottom blend — fades hero edge into parchment, eliminates hard cut ── */}
      <div
        className="absolute bottom-0 left-0 w-full z-20 pointer-events-none"
        style={{
          height: "160px",
          background: "linear-gradient(to bottom, transparent 0%, #FEFCF8 100%)",
        }}
      />

      {/* ── Central Typography & CTA ─────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-20 text-center max-w-5xl px-6 md:px-8 mx-auto flex flex-col items-center pointer-events-auto will-change-transform"
      >
        <span className="eyebrow-text font-sans text-roots-orange uppercase tracking-[0.15em] text-xs md:text-sm font-semibold mb-6 block drop-shadow-md">
          {homePageData?.heroEyebrow || "Hyderabad's Premium Family Salon"}
        </span>

        <h1 className="font-serif text-[36px] sm:text-[48px] md:text-[64px] lg:text-[84px] text-parchment leading-[1.08] mb-4 tracking-tight drop-shadow-xl w-full">
          {homePageData?.heroHeadline || "Where Every Look"}{" "}
          <br className="md:hidden" />
          <em className="italic text-parchment/90 font-normal">
            {homePageData?.heroHeadlineItalic ||
              "Begins."}
          </em>
        </h1>

        <p className="subtitle-text font-sans text-parchment/70 text-sm md:text-base max-w-2xl mb-10 drop-shadow-md leading-relaxed">
          Hair · Skin · Bridal · Tattoo · Nails — one family salon, two premium locations in Hyderabad.
        </p>

        <div className="cta-wrapper flex flex-col sm:flex-row items-center gap-4">
          {/* ── Rainbow-glow primary CTA ── */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
          >
            {/* Glow ring */}
            <span className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-roots-orange via-amber-400 to-roots-orange bg-[length:200%_100%] animate-shimmer opacity-70 group-hover:opacity-100 blur-[3px] transition-opacity duration-300" />
            <span className="relative btn-primary block shadow-2xl">
              {homePageData?.heroCtaText || "Reserve Your Time"}
            </span>
          </a>

          {/* ── Glassmorphic secondary CTA ── */}
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 rounded-lg font-sans text-xs uppercase tracking-[0.08em] font-medium text-parchment/90 border border-parchment/20 bg-parchment/5 backdrop-blur-sm hover:bg-parchment/10 hover:border-parchment/30 transition-all duration-300 shadow-lg"
          >
            View Services
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none">
        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-parchment/40">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-parchment/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

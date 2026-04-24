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
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

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
        {homePageData?.heroBackgroundImage ? (
          <div className="absolute inset-0">
            <Image
              src={homePageData.heroBackgroundImage}
              alt="Hero Background"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ) : (
          <ImagePlaceholder
            label="HERO IMAGE"
            aspectRatio="1920 × 1080 px · 16:9"
            description="Cinematic shot of premium salon interior or beautiful styling."
            mood="dark"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* ── Dark Veil ── */}
      <div className="absolute inset-0 z-10 bg-obsidian/35" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-obsidian/70 to-transparent z-10" />



      {/* ── Central Typography & CTA ─────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-20 text-center max-w-5xl px-6 md:px-8 mx-auto flex flex-col items-center pointer-events-auto will-change-transform"
      >
        <span className="eyebrow-text font-sans text-roots-orange uppercase tracking-[0.15em] text-xs md:text-sm font-semibold mb-6 block drop-shadow-md">
          {homePageData?.heroEyebrow || "Hyderabad's Premium Family Salon"}
        </span>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-[85px] text-parchment leading-[1.1] mb-10 tracking-tight">
          <span className="font-bold block mb-1 md:mb-2">
            {homePageData?.heroHeadline || "Your Complete Destination for"}
          </span>
          <em className="italic text-parchment/90 font-normal block">
            {homePageData?.heroHeadlineItalic || "Hair, Skin, Bridal & Tattoo in Hyderabad"}
          </em>
        </h1>

        <p className="subtitle-text font-sans text-parchment/70 text-sm md:text-base max-w-2xl mb-10 drop-shadow-md leading-relaxed">
          Walk in. Walk out different. Two premium locations serving your entire family.
        </p>

        <div className="cta-wrapper flex flex-col sm:flex-row items-center gap-4">
          {/* ── Primary CTA ── */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { tab: 'booking' } }))}
            className="relative"
          >
            <span className="relative btn-primary block shadow-2xl">
              {homePageData?.heroCtaText || "Book Your Appointment"}
            </span>
          </button>

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


    </section>
  );
}

"use client";

/**
 * Hero.tsx — Premium "Walk-In" Scroll Transition
 *
 * Architecture (simplified single-image approach):
 *   - One full-bleed salon interior image as background.
 *   - A dark veil overlay starts heavy (~70% opacity) — the "outside darkness".
 *   - On scroll, the section pins. The text sweeps past the camera.
 *     The veil lifts gradually, revealing the salon in full true-color.
 *     The image gently zooms in (1.15 → 1.0), simulating walking forward.
 *   - Result: feels like stepping from the dark street into a bright, warm salon.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "919700744357";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Layers
  const imageRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !imageRef.current || !veilRef.current || !contentRef.current) return;

      // ── Initial State ──
      // Image starts slightly zoomed in — we'll scale down to 1.0 giving the "walk forward" parallax.
      gsap.set(imageRef.current, { scale: 1.15 });

      // ──────────────────────────────────────────────────────────────
      // 1. PAGE LOAD TIMELINE (Intro Reveal)
      // ──────────────────────────────────────────────────────────────
      const introTl = gsap.timeline({ delay: 0.3 });

      // Extract and animate H1 text using SplitType
      const headline = contentRef.current.querySelector("h1");
      let split: SplitType | null = null;
      if (headline) split = new SplitType(headline, { types: "words" });

      const eyebrow = contentRef.current.querySelector("span");
      if (eyebrow) {
        introTl.fromTo(eyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.4);
      }

      if (split?.words) {
        introTl.fromTo(
          split.words,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
          0.5
        );
      }

      const cta = contentRef.current.querySelector("a");
      const scrollHint = contentRef.current.querySelector(".scroll-hint");
      if (cta && scrollHint) {
        introTl.fromTo(
          [cta, scrollHint],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.2 },
          0.8
        );
      }

      // ──────────────────────────────────────────────────────────────
      // 2. SCROLL "WALK-IN" TIMELINE
      // ──────────────────────────────────────────────────────────────
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",    // 2 viewport lengths of pinned scrolling
          pin: true,
          scrub: 1.5,       // Buttery smooth 1.5s friction
          anticipatePin: 1,
        },
      });

      // Part A: Text sweeps past the camera (you're walking through the words)
      scrollTl.to(
        contentRef.current,
        { scale: 1.8, autoAlpha: 0, duration: 1, ease: "none" },
        0
      );

      // Part B: The dark veil lifts — like your eyes adjusting as you step inside
      scrollTl.to(
        veilRef.current,
        { autoAlpha: 0, duration: 2, ease: "none" },
        0.3
      );

      // Part C: The image zooms from 1.15 → 1.0 — subtle forward motion parallax
      scrollTl.to(
        imageRef.current,
        { scale: 1, duration: 2.5, ease: "none" },
        0
      );

    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-obsidian flex flex-col items-center justify-end md:justify-center pb-24 md:pb-0"
      aria-label="Hero"
    >
      {/* ── Salon Interior (Single full-bleed background) ──────────── */}
      <div ref={imageRef} className="absolute inset-0 z-0 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury salon interior"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      {/* ── Dark Veil (simulates "outside darkness" before entering) ── */}
      <div
        ref={veilRef}
        className="absolute inset-0 z-10 bg-obsidian/70"
      />

      {/* ── Central Typography & Interactions ─────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-30 text-center max-w-4xl px-6 md:px-8 mt-auto md:mt-0 flex flex-col items-center gap-0 pointer-events-auto"
      >
        <span className="font-sans text-roots-orange uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-7 block drop-shadow-md">
          The Premium Experience
        </span>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-parchment leading-[1.08] mb-10 tracking-tight drop-shadow-lg">
          Walk in.
          <br />
          <em className="italic text-parchment/80 font-normal">
            Walk out different.
          </em>
        </h1>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary shadow-xl"
        >
          Reserve Your Time
        </a>

        {/* Scroll hint */}
        <div className="scroll-hint mt-12 md:mt-16 flex flex-col items-center gap-2 opacity-50">
          <span className="font-sans text-parchment text-[10px] uppercase tracking-widest drop-shadow-md">
            Scroll to Enter
          </span>
          <span className="block w-px h-8 bg-parchment glow-pulse" />
          <style>{`
            .glow-pulse {
              animation: drop-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes drop-pulse {
              0%, 100% { opacity: 0.1; transform: scaleY(0.8) translateY(-5px); }
              50% { opacity: 0.8; transform: scaleY(1) translateY(0px); filter: drop-shadow(0 0 4px white); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

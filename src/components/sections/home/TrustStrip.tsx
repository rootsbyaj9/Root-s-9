"use client";

/**
 * TrustStrip.tsx — Animated Stat Counter Strip
 *
 * Wireframe Reference: §Home: Trust Strip
 * Design Laws:
 *   - bg-parchment, border-b, py-16
 *   - 4 stats in a responsive row
 *   - Numerals: Playfair Display text-4xl/5xl
 *   - Labels: DM Sans uppercase tracking-widest
 *
 * GSAP:
 *   - Each numeral counts from 0 to target using gsap.to() on a proxy object
 *   - Only triggers once (toggleActions: "play none none none")
 *   - Cards stagger fade-in simultaneously
 *
 * Stats match wireframe: 15+ · 4.9/5 · 3 · 20k+
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

// ── Stat data ──────────────────────────────────────────────────────────────
const STATS = [
  { id: "years",           target: 8,   display: "8+",    suffix: "+",  label: "Years of Mastery",    decimals: 0 },
  { id: "rating",          target: 4.8, display: "4.8/5", suffix: "/5", label: "Google Rating",       decimals: 1 },
  { id: "locations",       target: 2,   display: "2",     suffix: "",   label: "Premium Locations",    decimals: 0 },
  { id: "reviews",         target: 1.6, display: "1.6k+", suffix: "k+", label: "Google Reviews",       decimals: 1 },
] as const;
// ──────────────────────────────────────────────────────────────────────────

export default function TrustStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // ── Cards stagger in ─────────────────────────────────────────────────
      gsap.fromTo(
        ".trust-stat",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Count-up for each stat numeral ───────────────────────────────────
      // Correct GSAP pattern: gsap.to(proxyObject, toVars)
      // gsap.fromTo needs 3 args (target, fromVars, toVars)
      // gsap.to on a plain {val:0} object is the clean way to drive counters.
      STATS.forEach((stat) => {
        const el = document.getElementById(`stat-${stat.id}`);
        if (!el) return;
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: stat.target,
          duration: 2,
          ease: "power2.out",
          onUpdate() {
            if (stat.decimals > 0) {
              el.textContent = proxy.val.toFixed(stat.decimals) + stat.suffix;
            } else {
              el.textContent = Math.floor(proxy.val) + stat.suffix;
            }
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="py-16 border-b border-obsidian/10 bg-parchment"
      aria-label="Trust statistics"
    >
      <div className="container mx-auto px-8 md:px-16">
        <div className="flex flex-wrap justify-between items-center gap-y-10 md:gap-y-0">
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className="trust-stat w-1/2 md:w-auto text-center md:text-left opacity-0"
            >
              {/* Numeral — Playfair large; textContent driven by GSAP */}
              <span
                id={`stat-${stat.id}`}
                className="block font-serif text-4xl md:text-5xl text-obsidian mb-1 tracking-tight tabular-nums"
                aria-label={stat.display}
              >
                {stat.display}
              </span>

              <span className="font-sans text-[10px] uppercase tracking-widest text-obsidian/55">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

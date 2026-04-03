"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";

export default function ServicesHero() {
  const container = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!headlineRef.current) return;
    
    const split = new SplitType(headlineRef.current, { types: 'chars' });
    const chars = split.chars;
    
    if (chars && chars.length > 0) {
      const period = chars[chars.length - 1];
      const rest = chars.slice(0, chars.length - 1);
      
      gsap.set(chars, { yPercent: 100 });
      
      gsap.to(rest, {
        yPercent: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1
      });
      
      gsap.to(period, {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1 + (rest.length * 0.02) + 0.06
      });
    }

    return () => split.revert();
  }, { scope: container });

  return (
    <section ref={container} className="bg-parchment pt-[160px] pb-16 border-b border-obsidian/10">
      <div className="container mx-auto px-8 md:px-16 max-w-[1400px]">
        {/* Eyebrow */}
        <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-roots-orange block mb-4">
          MENU
        </span>

        {/* H1 */}
        <div className="overflow-hidden pb-4 -mb-4">
          <h1 ref={headlineRef} className="font-serif text-5xl md:text-[72px] leading-tight text-obsidian">
            Our Services<span className="italic">.</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="font-sans text-[18px] text-obsidian/60 max-w-[560px] mt-4 leading-relaxed">
          Curated treatments, expert artistry, and real results — from a quick
          blowdry to a full bridal transformation.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface AboutHeroProps {
  eyebrow?: string;
  subtext?: string;
  bgImageUrl?: string;
}

export default function AboutHero({
  eyebrow = "OUR STORY",
  subtext = "Root's is the Hyderabad salon built for every member of your family — without ever compromising on quality.",
  bgImageUrl,
}: AboutHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !bgRef.current || !contentRef.current) return;

      // ── Intro Animation ──
      const introTl = gsap.timeline({ delay: 0.2 });

      const headline = contentRef.current.querySelector("h1");
      let split: SplitType | null = null;
      if (headline) split = new SplitType(headline, { types: "words,chars" });

      const eyebrow = contentRef.current.querySelector(".eyebrow");
      if (eyebrow) {
        introTl.fromTo(
          eyebrow,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0
        );
      }

      if (split?.words) {
        introTl.fromTo(
          split.words,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: "power4.out" },
          0.2
        );
      }

      const p = contentRef.current.querySelector("p");
      if (p) {
        introTl.fromTo(
          p,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.6
        );
      }

      // Parallax effect on scroll
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[85vh] flex items-end bg-obsidian overflow-hidden pt-32 pb-20"
    >
      {/* Background founder portrait mock */}
      <div ref={bgRef} className="absolute inset-0 opacity-30 will-change-transform bg-obsidian">
        {bgImageUrl && (
          <img
            src={bgImageUrl}
            alt="Premium Salon Ambience"
            className="w-full h-full object-cover object-center grayscale mix-blend-luminosity"
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/95 via-obsidian/60 to-transparent" />

      <div ref={contentRef} className="relative z-10 container mx-auto px-6 md:px-16 max-w-7xl">
        <span className="eyebrow text-roots-orange/80 mb-3 block">{eyebrow}</span>
        <h1 className="font-serif text-6xl md:text-8xl text-parchment leading-[0.95] max-w-3xl">
          Where Craft <em className="italic font-normal text-roots-orange">Meets</em> Care.
        </h1>
        <p className="mt-6 font-sans text-parchment/70 text-base md:text-lg max-w-md leading-relaxed">
          {subtext}
        </p>
      </div>
    </section>
  );
}

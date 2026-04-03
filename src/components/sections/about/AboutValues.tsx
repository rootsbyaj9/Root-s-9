"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    number: "01",
    title: "Craft First",
    body: "Every cut, colour, and treatment is executed with precision — never rushed, never guessed. Continuing education is non-negotiable.",
  },
  {
    number: "02",
    title: "Family Warmth",
    body: "From your first walk-in to your tenth visit, you're greeted by name. We build relationships, not just bookings.",
  },
  {
    number: "03",
    title: "Transparent Growth",
    body: "Fair pricing. Clear consultations. No upselling. We grow when you come back because you trust us — not because of a script.",
  },
];

export default function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !gridRef.current) return;

      const cards = gridRef.current.children;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 65%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-linen py-24">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        <SectionHeader
          eyebrow="WHAT WE STAND FOR"
          heading="Our three principles."
          align="center"
        />
        <div 
          ref={gridRef}
          className="mt-16 grid md:grid-cols-3 gap-px bg-obsidian/[0.08] rounded-2xl overflow-hidden"
        >
          {VALUES.map((v) => (
            <div
              key={v.number}
              className="bg-linen p-10 group hover:bg-parchment transition-colors duration-500 flex flex-col"
            >
              <span className="font-serif text-7xl text-obsidian/[0.06] group-hover:text-roots-orange/20 transition-colors duration-500 leading-none block mb-4">
                {v.number}
              </span>
              <h3 className="font-serif text-2xl text-obsidian mb-4">{v.title}</h3>
              <p className="font-sans text-warm-gray text-sm leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

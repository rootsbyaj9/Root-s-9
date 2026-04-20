"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_VALUES = [
  {
    number: "01",
    title: "Craft First",
    body: "Every cut, colour, and treatment is executed with precision — never rushed, never guessed. Continuing education is non-negotiable.",
  },
  {
    number: "02",
    title: "Family Warmth",
    body: "We don\u2019t just remember your name — we remember your last cut, your favourite coffee, your kid\u2019s first haircut. Every visit feels like your tenth, from the very first.",
  },
  {
    number: "03",
    title: "Transparent Growth",
    body: "Fair pricing. Clear consultations. No upselling. We grow when you come back because you trust us — not because of a script.",
  },
  {
    number: "04",
    title: "Hygiene & Safety",
    body: "Sterilized tools. Fresh towels. Single-use kits. We follow salon-grade hygiene protocols so you never have to think about safety — just sit back and enjoy.",
  },
];

interface AboutValuesProps {
  heading?: string;
  values?: { number: string; title: string; body: string }[];
}

export default function AboutValues({
  heading = "Our four principles.",
  values: rawValues,
}: AboutValuesProps) {
  const values = rawValues ?? DEFAULT_VALUES;
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
          heading={heading}
          align="center"
        />
        <div 
          ref={gridRef}
          className="mt-16 grid md:grid-cols-2 gap-px bg-obsidian/[0.08] rounded-2xl overflow-hidden"
        >
          {values.map((v: { number: string; title: string; body: string }) => (
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

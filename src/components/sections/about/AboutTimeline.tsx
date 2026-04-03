"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: "2020", event: "Founded in Hyderabad with one vision — bring premium salon quality to every family." },
  { year: "2023", event: "Crossed 1,000+ loyal clients. Expanded skin and tattoo services." },
  { year: "2025", event: "Third branch opens — a milestone built on trust, craft, and community." },
];

export default function AboutTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !lineRef.current || !milestonesRef.current) return;

      // Draw the vertical line on scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: milestonesRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Fade in milestones
      const milestones = gsap.utils.toArray(milestonesRef.current.children) as HTMLElement[];
      
      milestones.forEach((milestone, i) => {
        const direction = i % 2 === 0 ? -50 : 50; // Slide in from left or right alternately
        const isMobile = window.innerWidth < 768; // On mobile, just slide up
        
        gsap.fromTo(
          milestone,
          { opacity: 0, x: isMobile ? 0 : direction, y: isMobile ? 30 : 0 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: milestone,
              start: "top 70%",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-obsidian py-24">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        <SectionHeader
          eyebrow="OUR JOURNEY"
          heading="Five years of growing together."
          align="center"
          className="[&_.eyebrow]:text-roots-orange/70 [&_h2]:text-parchment"
        />
        
        <div className="mt-20 relative">
          {/* Vertical line drawn via GSAP */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-parchment/10 overflow-hidden">
             <div ref={lineRef} className="w-full h-full bg-roots-orange/50" />
          </div>

          <div ref={milestonesRef} className="flex flex-col gap-16 md:gap-24 relative z-10">
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className={`flex flex-col md:grid md:grid-cols-2 md:gap-16 items-center ${
                  i % 2 === 0 ? "" : "md:[direction:rtl]"
                }`}
              >
                <div className={`md:[direction:ltr] ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  <span className="font-serif text-6xl md:text-8xl text-roots-orange/20 leading-none block drop-shadow-md">
                    {m.year}
                  </span>
                </div>

                <div className="md:[direction:ltr] mt-4 md:mt-0 relative group">
                  {/* Subtle hover connector logic (optional visual polish) */}
                  <div className="hidden md:block absolute top-1/2 -ml-10 w-4 h-4 rounded-full bg-obsidian border-2 border-roots-orange/30 group-hover:bg-roots-orange transition-colors duration-300" style={{ left: i % 2 === 0 ? '-3.3rem' : 'auto', right: i % 2 !== 0 ? '-39rem' : 'auto' }}></div>
                  <p className="font-sans text-parchment/80 text-base md:text-lg leading-relaxed max-w-sm">
                    {m.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

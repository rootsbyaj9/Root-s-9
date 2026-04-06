"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface AboutFounderProps {
  founderName?: string;
  founderHeadline?: string;
  founderQuote?: string;
  founderBio1?: string;
  founderBio2?: string;
  founderImageUrl?: string;
  aboutBackgroundImageUrl?: string; // (Optional: we can use this for the background section if needed)
}

export default function AboutFounder({
  founderName = "Anikanth Jadhav",
  founderHeadline = "I started Root\u2019s for my family.",
  founderQuote = "I wanted one place where my parents, my spouse, my kids \u2014 every generation \u2014 could walk out feeling their best. That\u2019s still why I do this.",
  founderBio1 = "Before Root\u2019s, Hyderabad had a clear gap \u2014 boutique-quality salons were expensive and inaccessible; affordable salons often cut corners. We built the alternative: premium technique, professional-grade products, and a genuinely warm space that welcomes every age and every budget.",
  founderBio2 = "Two branches later \u2014 with a third on the way \u2014 we\u2019re still that same place my family visits every month. We\u2019ve simply invited more families in.",
  founderImageUrl,
  aboutBackgroundImageUrl,
}: AboutFounderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%", // Triggers when the top of the section reaches 65% of the viewport (forces scrolling)
        },
      });

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" },
          0
        );
      }

      if (textRef.current) {
        const textElements = Array.from(textRef.current.children);
        const eyebrow = textElements[0];
        const heading = textElements[1];
        const blockquote = textElements[2];
        const p1 = textElements[3];
        const p2 = textElements[4];

        // Animate up to the blockquote
        tl.fromTo(
          [eyebrow, heading],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
          0.3
        );

        // Prep the blockquote text for line-by-line using SplitType
        const quoteP = blockquote.querySelector("p");
        let splitQuote: SplitType | null = null;
        if (quoteP) {
          splitQuote = new SplitType(quoteP, { types: "lines" });
        }
        const quoteFooter = blockquote.querySelector("footer");

        // Reveal the border of the blockquote
        tl.fromTo(
          blockquote,
          { borderColor: "transparent" },
          { borderColor: "rgb(235, 90, 60)", duration: 0.4 }, // var(--color-roots-orange)
          "-=0.2"
        );

        // Animate the quote lines
        if (splitQuote?.lines) {
          tl.fromTo(
            splitQuote.lines,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
            "-=0.2"
          );
        }

        // Fade in the quote footer
        if (quoteFooter) {
          tl.fromTo(
            quoteFooter,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.4"
          );
        }

        // Animate remaining paragraphs
        tl.fromTo(
          [p1, p2],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
          "-=0.4"
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-parchment py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {aboutBackgroundImageUrl && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none -z-10">
            <img src={aboutBackgroundImageUrl} alt="" className="w-full h-full object-cover rounded-full" />
          </div>
        )}

        {/* Image column */}
        <div 
          ref={imageRef} 
          className="order-2 md:order-1 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative"
        >
          <img
            src={founderImageUrl || "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=1400&auto=format&fit=crop"}
            alt={founderName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-obsidian/10 mix-blend-overlay"></div>
        </div>

        {/* Text column */}
        <div ref={textRef} className="order-1 md:order-2 flex flex-col items-start gap-4">
          <span className="eyebrow block">FOUNDER&apos;S NOTE</span>
          <h2 className="font-serif text-4xl md:text-5xl text-obsidian leading-[1.05] mt-3 mb-4">
            {founderHeadline}
          </h2>

          {/* Pull quote */}
          <blockquote className="border-l-2 border-roots-orange pl-6 my-4 py-2 transition-colors">
            <p className="font-serif italic text-xl text-warm-gray leading-relaxed mb-3">
              &ldquo;{founderQuote}&rdquo;
            </p>
            <footer className="font-sans text-xs font-semibold uppercase tracking-widest text-roots-orange block">
              — {founderName}, Founder
            </footer>
          </blockquote>

          <p className="font-sans text-warm-gray text-base leading-relaxed">
            {founderBio1}
          </p>
          <p className="font-sans text-warm-gray text-base leading-relaxed">
            {founderBio2}
          </p>
        </div>
      </div>
    </section>
  );
}

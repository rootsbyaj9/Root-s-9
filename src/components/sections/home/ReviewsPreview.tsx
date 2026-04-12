"use client";

import { useRef, useState, useEffect } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import LottieStarsPlayer from "@/components/ui/LottieStarsPlayer";

// Swiper integration removed in favor of high-performance CSS marquee

/**
 * ReviewsPreview.tsx
 *
 * A swipeable and draggable horizontal gallery of client testimonials.
 * Uses custom mouse physics for desktop dragging + snap for mobile.
 */

const PREVIEW_REVIEWS = [
  {
    initial: "M",
    name: "Manasa Mahankali",
    quote:
      "I was nervous about trying a new style, but Mr Anikanth Jadhav at Root's Family Salon made me feel so comfortable. He is an artist! My hair looks healthier and more stylish than it has in years.",
  },
  {
    initial: "A",
    name: "Azlaan Pathan",
    quote:
      "Very nice service. I am coming here since 2018 and day by day their service and skills towards customers increases to the peaks. Well maintained and ambience is superb.",
  },
  {
    initial: "S",
    name: "Shailaja Keshapuram",
    quote:
      "Roots The Family Salon is the best!!!! It's an outstanding customer experience and hair services provided by Roots team. They also help us with suggestions and styles.",
  }
];

export default function ReviewsPreview({ reviews = [] }: { reviews?: any[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggerStars, setTriggerStars] = useState(false);

  // We duplicate the reviews array once so that even with only 3 fetched reviews,
  // the Swiper has enough physical DOM nodes to flawlessly infinite-loop on giant desktop monitors.
  // We map 'name' and 'reviewText' from CMS
  const mappedReviews = reviews.length > 0
    ? reviews.map((r: any) => ({
        initial: r.name ? r.name.charAt(0) : "A",
        name: r.name,
        quote: r.reviewText,
      }))
    : PREVIEW_REVIEWS;

  const SWIPER_REVIEWS = [...mappedReviews, ...mappedReviews];

  // Entry GSAP
  useGSAP(() => {
    gsap.fromTo(
      ".review-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2, // increased stagger slightly for premium pacing
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%", // Waits until section is prominently in view
          toggleActions: "play none none none",
          onEnter: () => {
             // 1000ms delay ensures cards are beautifully faded in before the stars slowly draw themselves.
             setTimeout(() => setTriggerStars(true), 1000);
          },
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-linen py-20 md:py-32 px-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 xl:px-24">
        <SectionHeader
          eyebrow="CLIENT LOVE"
          heading="What our"
          headingEmphasis="guests say"
          align="center"
        />
      </div>

      {/* Infinite Autoscroll Marquee Container */}
      <div className="mt-16 pb-12 px-0 overflow-hidden relative fade-edges-horizontal">
        <div className="flex w-max animate-marquee-horizontal hover:[animation-play-state:paused]">
          {SWIPER_REVIEWS.map((review, i) => (
            <div key={i} className="w-[85vw] md:w-[50vw] lg:w-[40vw] max-w-[500px] shrink-0 px-4">
              <div className="review-card h-full bg-parchment border border-obsidian/10 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-500 flex flex-col justify-between opacity-0">
                <div>
                  {/* Lottie 5-Stars triggered remotely */}
                  <LottieStarsPlayer className="mb-6 -ml-2 pointer-events-none" triggerPlay={triggerStars} />

                  <p className="font-serif text-lg text-obsidian italic leading-relaxed mb-10 pointer-events-none">
                    &quot;{review.quote}&quot;
                  </p>
                </div>

                {/* Author Row */}
                <div className="flex items-center gap-4 mt-auto pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-obsidian text-parchment flex items-center justify-center font-serif font-bold pointer-events-none">
                    {review.initial}
                  </div>
                  <div className="font-sans font-medium text-obsidian uppercase tracking-wide text-xs pointer-events-none">
                    {review.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center px-6">
        <Link
          href="/reviews"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-obsidian hover:text-roots-orange transition-colors duration-200 group"
        >
          Read all testimonials
          <span className="transform transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

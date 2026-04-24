"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";



function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-roots-orange"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/** Avatar with graceful fallback to initial circle on load error */
function Avatar({ name, avatar, initial }: { name: string; avatar?: string; initial: string }) {
  const [error, setError] = useState(false);

  if (!avatar || error) {
    return (
      <div className="w-10 h-10 rounded-full bg-obsidian text-parchment flex items-center justify-center font-serif font-bold shrink-0">
        {initial}
      </div>
    );
  }
  return (
    <img
      src={avatar}
      alt={name}
      className="w-10 h-10 rounded-full object-cover shrink-0"
      onError={() => setError(true)}
    />
  );
}

export default function ReviewsPreview({ reviews = [] }: { reviews?: any[] }) {
  const mappedReviews = (reviews || []).map((r: any) => ({
    initial: r.name ? r.name.charAt(0) : "A",
    name: r.name,
    quote: r.reviewText || r.review,
    rating: r.rating ?? 5,
    avatar: r.avatar,
    service: r.service || "Salon Experience",
    branch: r.branch || "Hyderabad"
  }));

  // Deduplicate by name
  let uniqueReviews: any[] = [];
  const seenNames = new Set();
  for (const r of mappedReviews) {
    if (!seenNames.has(r.name)) {
      seenNames.add(r.name);
      uniqueReviews.push(r);
    }
  }

  // Sort so reviews with avatars appear first
  uniqueReviews.sort((a, b) => {
    if (a.avatar && !b.avatar) return -1;
    if (!a.avatar && b.avatar) return 1;
    return 0;
  });

  // Duplicate for seamless loop
  const SWIPER_REVIEWS = [...uniqueReviews, ...uniqueReviews];

  return (
    <section className="bg-linen py-20 md:py-32 px-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 xl:px-24">
        <SectionHeader
          eyebrow="CLIENT LOVE"
          heading="What our"
          headingEmphasis="guests say"
          align="center"
        />
      </div>

      {/* Infinite Autoscroll Marquee — CSS animation with hover-pause */}
      <div className="mt-16 pb-12 px-0 overflow-hidden relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-r from-linen to-transparent pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-l from-linen to-transparent pointer-events-none" />

        <div 
          className="flex w-max"
          style={{ animation: `marquee-horizontal ${Math.max(uniqueReviews.length * 8, 30)}s linear infinite` }}
          onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused'; }}
          onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running'; }}
        >
          {SWIPER_REVIEWS.map((review, i) => (
            <div key={i} className="w-[75vw] md:w-[38vw] lg:w-[30vw] max-w-[420px] shrink-0 px-3">
              <div className="h-full bg-parchment rounded-2xl p-5 md:p-7 flex flex-col border border-obsidian/[0.06] hover:shadow-xl transition-shadow duration-300 w-full">
                {/* Stars */}
                <div className="mb-4">
                  <StarRating count={review.rating} />
                </div>
                
                {/* Quote */}
                <p className="font-serif text-base text-obsidian leading-relaxed mb-5 flex-1 line-clamp-5">
                  &ldquo;{review.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-obsidian/[0.06] pt-4 flex items-center mt-auto">
                  <div className="flex items-center gap-3">
                    <Avatar name={review.name} avatar={review.avatar} initial={review.initial} />
                    <div>
                      <p className="font-sans text-sm font-semibold text-obsidian uppercase tracking-wide">{review.name}</p>
                      <p className="font-sans text-xs text-warm-gray">{review.branch} Location</p>
                    </div>
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

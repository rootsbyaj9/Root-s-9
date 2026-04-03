'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import CTASection from '@/components/sections/shared/CTASection';

const GOOGLE_MAPS_URL_1 = 'https://maps.app.goo.gl/ocq8uts9jYaCp3bu8';
const GOOGLE_MAPS_URL_2 = 'https://maps.app.goo.gl/NSNafg2mqV9acw9m7';

const REVIEWS = [
  {
    id: 'r1',
    name: 'Manasa Mahankali',
    branch: 'Uppal',
    rating: 5,
    date: 'Recent',
    service: 'Hair Styling',
    review:
      'I was nervous about trying a new style, but Mr Anikanth Jadhav at Root\'s family saloon made me feel so comfortable. He is an artist! My hair looks healthier and more stylish than it has in years. I’ve already received so many compliments. Thank you for the incredible service!',
  },
  {
    id: 'r2',
    name: 'Shakib ALi',
    branch: 'Tarnaka',
    rating: 5,
    date: 'Recent',
    service: 'Haircut & Facial',
    review:
      'Visited this salon by Google it was a wonderful experince I ever had and I went along with. My sister for her haircut and facial & dandruff treatments. The way they gave service it was mind blowing and my sister hair cut and facial service …',
  },
  {
    id: 'r3',
    name: 'Divya Panjala',
    branch: 'Uppal',
    rating: 5,
    date: 'Recent',
    service: 'Tattoo Studio',
    review:
      'I’ve had a tattoo on my wrist done twice here, and both times the experience was excellent. Anikanth Kumar is very creative and enthusiastic. He really puts effort into his work and ensures customer satisfaction. Highly recommended.',
  },
  {
    id: 'r4',
    name: 'Shailaja Keshapuram',
    branch: 'Tarnaka',
    rating: 5,
    date: 'Recent',
    service: 'Hair Services',
    review:
      'Roots The Family Salon is the best!!!! It\'s an outstanding customer experience and hair services provided by Roots team. They also help us with suggestions and styles. Very much happy satisfied with the outcome. Thanks again to Anikanth Sir and his team.',
  },
  {
    id: 'r5',
    name: 'Z L',
    branch: 'Uppal',
    rating: 5,
    date: 'Recent',
    service: 'Salon Experience',
    review:
      'I recently visited this "Roots the family salon" and I couldn’t be more impressed with the entire experience. From the moment I walked in, I felt welcomed by the friendly staff. It’s clear that this place is focused on providing top-notch service...',
  },
  {
    id: 'r6',
    name: 'Renee Lazarus',
    branch: 'Tarnaka',
    rating: 5,
    date: 'Recent',
    service: 'Root Touch Up & Facial',
    review:
      'Best service 👍👍✨ swapna didi s head massage, root touch up, facial, eyebrows perfect and the boys who do the hair cut are also professional and great superb ....loved it! …',
  }
];

// Context pulled directly from verified Google Maps logic
const STATS = [
  { value: '1,600+', label: 'Happy Clients' }, // Uppal: 1386, Tarnaka: 275
  { value: '4.8★', label: 'Google Rating' }, // Uppal 4.8, Tarnaka 4.9
  { value: '2', label: 'Branches' },
  { value: '8+', label: 'Years of Excellence' }, // Started in 2018
];

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

// Reusable animated column component
function ReviewColumn({ items, duration, reverse }: { items: typeof REVIEWS, duration: string, reverse?: boolean }) {
  return (
    <div className="relative h-full w-full marquee-group">
      <div 
         className={`h-max flex flex-col gap-6 ${reverse ? 'marquee-vertical-reverse' : 'marquee-vertical'}`}
         style={{ animationDuration: duration }}
      >
        {/* Set 1 */}
        <div className="flex flex-col gap-6 flex-shrink-0">
          {items.map((r, idx) => (
            <ReviewCard key={r.id + idx + 'a'} r={r} />
          ))}
        </div>
        {/* Set 2 (Duplicate for flawless looping) */}
        <div className="flex flex-col gap-6 flex-shrink-0">
          {items.map((r, idx) => (
            <ReviewCard key={r.id + idx + 'b'} r={r} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Independent physical card
function ReviewCard({ r }: { r: typeof REVIEWS[0] }) {
  return (
    <div className="bg-parchment rounded-2xl p-7 flex flex-col border border-obsidian/[0.06] hover:shadow-xl transition-shadow duration-300 w-full">
      <div className="flex items-center justify-between mb-4">
        <StarRating count={r.rating} />
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-roots-orange/80 bg-roots-orange/8 px-2.5 py-1 rounded-full whitespace-nowrap">
          {r.service}
        </span>
      </div>
      <p className="font-serif text-base text-obsidian leading-relaxed mb-5 flex-1">
        &ldquo;{r.review}&rdquo;
      </p>
      <div className="border-t border-obsidian/[0.06] pt-4 flex items-center justify-between mt-auto">
        <div>
          <p className="font-sans text-sm font-semibold text-obsidian">{r.name}</p>
          <p className="font-sans text-xs text-warm-gray">{r.branch} Location</p>
        </div>
        <a 
          href={r.branch === 'Uppal' ? GOOGLE_MAPS_URL_1 : GOOGLE_MAPS_URL_2}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          aria-label="View on Google Maps"
        >
          <svg className="w-5 h-5 text-obsidian/20 group-hover:drop-shadow-md transition-all duration-300" viewBox="0 0 48 48" fill="currentColor">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function ReviewsClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pre-calculate stagger offsets so columns don't look identical
  const col1 = [...REVIEWS];
  const col2 = [...REVIEWS.slice(2), ...REVIEWS.slice(0, 2)];
  const col3 = [...REVIEWS.slice(4), ...REVIEWS.slice(0, 4)];

  useGSAP(() => {
    gsap.from('.hero-text', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });

    gsap.from('.stat-box', {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.stats-container',
        start: 'top 85%'
      }
    });

    // Fade in the whole marquee container elegantly
    gsap.from('.marquee-container', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.marquee-container', start: 'top 75%' }
    });

    gsap.from('.cta-banner-content', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.cta-banner', start: 'top 85%' }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <style>{`
        .fade-edges {
          mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
        }
        .marquee-vertical {
          animation: scrollVert linear infinite;
        }
        .marquee-vertical-reverse {
          animation: scrollVertRev linear infinite;
        }
        .marquee-group:hover .marquee-vertical,
        .marquee-group:hover .marquee-vertical-reverse {
          animation-play-state: paused;
        }

        /* 12px handles exactly half of the 24px gap between sets */
        @keyframes scrollVert {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-50% - 12px)); }
        }
        @keyframes scrollVertRev {
          0% { transform: translateY(calc(-50% - 12px)); }
          100% { transform: translateY(0); }
        }
      `}</style>
      
      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="pt-36 pb-16 bg-parchment">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl text-center">
          <span className="eyebrow hero-text">CLIENT STORIES</span>
          <h1 className="hero-text font-serif text-5xl md:text-7xl text-obsidian leading-[1.0] mt-2 mb-4">
            Heard it from{' '}
            <em className="italic font-normal text-roots-orange">them.</em>
          </h1>
          <p className="hero-text font-sans text-warm-gray text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Every review below is real from our Google Maps. We don&apos;t cherry-pick — we earn them.
          </p>
        </div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────── */}
      <section className="bg-obsidian py-12 stats-container">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-parchment/[0.08] rounded-2xl overflow-hidden shadow-2xl">
            {STATS.map((s) => (
              <div key={s.label} className="stat-box bg-obsidian py-10 px-4 md:px-8 text-center relative overflow-hidden">
                <div className="font-serif text-4xl md:text-5xl text-roots-orange mb-1">{s.value}</div>
                <div className="font-sans text-parchment/50 text-[10px] uppercase tracking-[0.15em] relative z-10">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MULTI-COLUMN INFINITE SCROLL ──────────────── */}
      <section className="bg-linen py-20 marquee-container">
        <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
          {/* We define a strict height container and mask the edges so reviews fade in/out beautifully */}
          <div className="h-[60vh] min-h-[500px] md:h-[800px] flex gap-6 overflow-hidden fade-edges relative">
            <div className="hidden lg:block flex-1 w-full relative">
               <ReviewColumn items={col1} duration="35s" />
            </div>
            <div className="flex-1 w-full relative">
               <ReviewColumn items={col2} duration="40s" reverse />
            </div>
            <div className="hidden md:block flex-1 w-full relative">
               <ReviewColumn items={col3} duration="30s" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── GOOGLE CTA ───────────────────────────────── */}
      <section className="cta-banner bg-parchment py-20 border-t border-obsidian/[0.06]">
        <div className="cta-banner-content container mx-auto px-6 md:px-16 max-w-7xl text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-obsidian mb-4">
            Read all our reviews on Google.
          </h2>
          <p className="font-sans text-warm-gray text-base max-w-md mx-auto mb-8">
            Verified Google reviews from both of our premium branches. Tap below to read them all — and leave us one if you&apos;ve visited.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={GOOGLE_MAPS_URL_1}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-3 bg-white"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Reviews - Uppal
            </a>
            <a
              href={GOOGLE_MAPS_URL_2}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-3 bg-white"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Reviews - Tarnaka
            </a>
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to become our next happy client?"
        subtext="Join 1,600+ Hyderabad families who trust Root's. Book your appointment in seconds via WhatsApp."
        ctaLabel="Book via WhatsApp"
      />
    </div>
  );
}

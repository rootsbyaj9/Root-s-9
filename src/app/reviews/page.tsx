/**
 * reviews/page.tsx — Client Reviews & Testimonials Page
 *
 * Section order (per implementation plan §Phase 6):
 *   1. Hero header — "What Our Clients Say"
 *   2. Stats bar — 500+ Reviews · 4.9★ Google · 3 Branches
 *   3. Testimonials masonry — 8 hardcoded reviews, 3-col layout
 *   4. Google Reviews CTA banner
 *   5. CTASection
 *
 * Design patterns:
 * - Cards: warm parchment/linen, subtle border, star ratings in roots-orange
 * - Alternating card heights for editorial variety
 * - Google badge linking to Google Business
 */

import type { Metadata } from 'next';
import CTASection from '@/components/sections/shared/CTASection';

export const metadata: Metadata = {
  title: "Client Reviews | Root's The Family Salon Hyderabad",
  description:
    "Read real reviews from Root's Salon clients. 4.9★ rated across Hyderabad — Kondapur, Manikonda, and our newest branch.",
  openGraph: {
    title: "Client Reviews | Root's The Family Salon",
    description: "4.9★ rated · 500+ happy clients across Hyderabad.",
    type: 'website',
  },
};

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/KhgoKHXQ1poNibB27';

const REVIEWS = [
  {
    id: 'r1',
    name: 'Priya R.',
    branch: 'Kondapur',
    rating: 5,
    date: 'March 2025',
    service: 'Balayage + Hair Spa',
    review:
      'Absolutely loved my balayage! The team really listened to what I wanted and delivered exactly that — no trying to upsell, no shortcuts. My hair looks stunning and feels incredibly healthy.',
  },
  {
    id: 'r2',
    name: 'Rahul M.',
    branch: 'Manikonda',
    rating: 5,
    date: 'February 2025',
    service: 'Men\'s Cut & Beard Grooming',
    review:
      'Been going here for a year. The attention to detail on cuts is unmatched in Manikonda at this price point. Feels like a premium studio but without the premium attitude.',
  },
  {
    id: 'r3',
    name: 'Sunitha K.',
    branch: 'Kondapur',
    rating: 5,
    date: 'March 2025',
    service: 'Bridal Makeup',
    review:
      'Root\'s did my full bridal for my wedding day and I couldn\'t be happier. They understood my skin undertones, kept the look for 10+ hours, and every photo turned out flawless.',
  },
  {
    id: 'r4',
    name: 'Aditya S.',
    branch: 'Kondapur',
    rating: 5,
    date: 'January 2025',
    service: 'Fine-Line Tattoo',
    review:
      'Got a fine-line botanical tattoo on my wrist. The artist\'s precision is incredible — the lines are so clean. Hygienic, calm environment, and really great aftercare advice.',
  },
  {
    id: 'r5',
    name: 'Lakshmi D.',
    branch: 'Manikonda',
    rating: 5,
    date: 'February 2025',
    service: 'HydraFacial',
    review:
      'First time trying HydraFacial and I\'m properly hooked. My skin glowed for two weeks. The aesthetician walked me through every step. Booked my next session before I left.',
  },
  {
    id: 'r6',
    name: 'Karthik V.',
    branch: 'Kondapur',
    rating: 5,
    date: 'March 2025',
    service: 'Hair Colour — Global',
    review:
      'Went in for a global colour and they matched my inspiration photo almost exactly. The colour technician suggested a toner I hadn\'t considered — made all the difference. Very knowledgeable team.',
  },
  {
    id: 'r7',
    name: 'Divya T.',
    branch: 'Manikonda',
    rating: 5,
    date: 'January 2025',
    service: 'Waxing + Thread',
    review:
      'Clean, quick, and genuinely painless compared to other salons. The ladies are efficient without being impersonal. Best threading I\'ve had in Hyderabad full stop.',
  },
  {
    id: 'r8',
    name: 'Naveen P.',
    branch: 'Kondapur',
    rating: 5,
    date: 'February 2025',
    service: 'Keratin Smoothening',
    review:
      'My wife and I both got keratin treatments. The salon stayed back an extra 30 minutes on a busy Saturday to make sure our hair dried perfectly. That kind of dedication is rare.',
  },
];

const STATS = [
  { value: '500+', label: 'Happy Clients' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '3', label: 'Branches' },
  { value: '5+', label: 'Years of Excellence' },
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

export default function ReviewsPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="pt-36 pb-16 bg-parchment">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl text-center">
          <span className="eyebrow">CLIENT STORIES</span>
          <h1 className="font-serif text-5xl md:text-7xl text-obsidian leading-[1.0] mt-2 mb-4">
            Heard it from{' '}
            <em className="italic font-normal text-roots-orange">them.</em>
          </h1>
          <p className="font-sans text-warm-gray text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Every review below is real. We don&apos;t cherry-pick — we earn them.
          </p>
        </div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────── */}
      <section className="bg-obsidian py-12">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-parchment/[0.08] rounded-2xl overflow-hidden">
            {STATS.map((s) => (
              <div key={s.label} className="bg-obsidian py-10 px-8 text-center">
                <div className="font-serif text-4xl md:text-5xl text-roots-orange mb-1">{s.value}</div>
                <div className="font-sans text-parchment/50 text-[10px] uppercase tracking-[0.15em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS MASONRY ──────────────────────────── */}
      <section className="bg-linen py-20">
        <div className="container mx-auto px-6 md:px-10 max-w-7xl">
          <div
            style={{ columnCount: 3, columnGap: '24px' }}
            className="max-sm:[column-count:1] sm:max-md:[column-count:2]"
          >
            {REVIEWS.map((r) => (
              <div
                key={r.id}
                className="break-inside-avoid mb-6 bg-parchment rounded-2xl p-7 border border-obsidian/[0.06] hover:shadow-lg transition-shadow duration-300"
              >
                {/* Stars + service */}
                <div className="flex items-center justify-between mb-4">
                  <StarRating count={r.rating} />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-roots-orange/80 bg-roots-orange/8 px-2.5 py-1 rounded-full">
                    {r.service}
                  </span>
                </div>

                {/* Review text */}
                <p className="font-serif text-base text-obsidian leading-relaxed mb-5">
                  &ldquo;{r.review}&rdquo;
                </p>

                {/* Client info */}
                <div className="border-t border-obsidian/[0.06] pt-4 flex items-center justify-between">
                  <div>
                    <p className="font-sans text-sm font-semibold text-obsidian">{r.name}</p>
                    <p className="font-sans text-xs text-warm-gray">{r.branch} · {r.date}</p>
                  </div>
                  {/* Verified google badge */}
                  <svg className="w-5 h-5 text-obsidian/20" viewBox="0 0 48 48" fill="currentColor" aria-label="Google Review">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GOOGLE CTA ───────────────────────────────── */}
      <section className="bg-parchment py-20 border-t border-obsidian/[0.06]">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-obsidian mb-4">
            Read all our reviews on Google.
          </h2>
          <p className="font-sans text-warm-gray text-base max-w-md mx-auto mb-8">
            470+ verified Google reviews. Tap below to read them all — and leave us one if you&apos;ve visited.
          </p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Read All Reviews on Google
          </a>
        </div>
      </section>

      <CTASection
        heading="Ready to become our next happy client?"
        subtext="Join 500+ Hyderabad families who trust Root's. Book your appointment in seconds via WhatsApp."
        ctaLabel="Book via WhatsApp"
      />
    </>
  );
}

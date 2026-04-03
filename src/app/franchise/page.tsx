/**
 * franchise/page.tsx — Franchise Enquiry Page
 *
 * Section order (per implementation plan §Phase 8):
 *   1. Hero — "Own a Root's" cinematic header
 *   2. Why Root's — 3 reasons (brand, training, territory)
 *   3. Franchise model overview (investment, ROI, support)
 *   4. Enquiry CTA — WhatsApp + email
 *   5. FAQ accordion
 *   6. CTASection
 *
 * This is a lead-generation page. Every section points to the WhatsApp CTA.
 */

import type { Metadata } from 'next';
import CTASection from '@/components/sections/shared/CTASection';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: "Franchise Opportunity | Root's The Family Salon Hyderabad",
  description:
    "Own a Root's The Family Salon franchise in Hyderabad or beyond. Low investment, proven model, full training & support. Enquire today.",
  openGraph: {
    title: "Franchise With Root's | The Family Salon",
    description: "Own a Root's Salon. Proven model, full training, exclusive territory.",
    type: 'website',
  },
};

const REASONS = [
  {
    number: '01',
    icon: '🏆',
    title: 'A Brand People Trust',
    body: 'Root\'s has built a loyal customer base across Hyderabad over 5 years. When you open a Root\'s franchise, you inherit that trust immediately — not having to build it from zero.',
  },
  {
    number: '02',
    icon: '🎓',
    title: 'Full Training & Ongoing Support',
    body: 'From recruitment and pricing to operations and client management — we train your team and stay available. Our franchise partners never feel alone.',
  },
  {
    number: '03',
    icon: '📍',
    title: 'Exclusive Territory Rights',
    body: 'Each franchise is given exclusive geographic territory. No Root\'s outlet will open within your zone — your market is protected.',
  },
];

const MODEL_POINTS = [
  { label: 'Investment Range', value: '₹15L – ₹30L (depending on location & size)' },
  { label: 'Avg. Break-even', value: '12–18 months' },
  { label: 'Royalty', value: '6% of monthly revenue' },
  { label: 'Training Duration', value: '4 weeks (on-site at Hyderabad HQ)' },
  { label: 'Launch Support', value: 'Grand Opening marketing, local social campaign' },
  { label: 'Territories Open', value: 'Pan-India (priority to Hyderabad expanded zones)' },
];

const FAQS = [
  {
    q: 'Do I need prior experience in the beauty industry?',
    a: 'No. Business acumen and a passion for customer experience are more important. We train your staff on all technical skills. You focus on running an excellent business.',
  },
  {
    q: 'How long does it take to open after signing?',
    a: 'Typically 60–90 days from agreement to grand opening. This includes location fit-out, staff recruitment, and training.',
  },
  {
    q: 'What kind of support do I receive after launch?',
    a: 'Ongoing: dedicated franchise coordinator, monthly performance reviews, access to Root\'s marketing materials, product sourcing at partner rates, and priority support for any operational issues.',
  },
  {
    q: 'Can I open in a city outside Hyderabad?',
    a: 'Yes. We are actively looking for franchise partners across Telangana and Andhra Pradesh. Pan-India expansion is in the pipeline for 2025–26.',
  },
  {
    q: 'Is there a minimum salon size requirement?',
    a: 'We recommend a minimum of 800 sq. ft. to accommodate hair, skin, and beauty services comfortably. Smaller formats (600 sq. ft.) are possible for express-service outlets.',
  },
];

export default function FranchisePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-end bg-obsidian pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <ImagePlaceholder
            label="FRANCHISE SALON INTERIOR"
            description="Premium salon interior — spacious, modern, warm lighting. Shows the scale and ambiance of a Root's salon. 16:9, 1440×810px."
            mood="dark"
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />

        <div className="relative container mx-auto px-6 md:px-16 max-w-7xl">
          <span className="eyebrow text-roots-orange/80 mb-3">FRANCHISE OPPORTUNITY</span>
          <h1 className="font-serif text-6xl md:text-8xl text-parchment leading-[0.95] max-w-3xl">
            Own a{' '}
            <em className="italic font-normal text-roots-orange">Root&apos;s</em>.
          </h1>
          <p className="mt-6 font-sans text-parchment/70 text-base md:text-lg max-w-lg leading-relaxed">
            Bring Hyderabad&apos;s most trusted family salon to your city.
            We&apos;ll give you the brand, the training, and the support.
            You bring the ambition.
          </p>
          <a
            href="https://wa.me/919550071714?text=Hi%20Root%27s%20Team!%20I%27m%20interested%20in%20a%20franchise%20opportunity."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10 inline-flex items-center gap-2"
          >
            Enquire via WhatsApp
          </a>
        </div>
      </section>

      {/* ─── WHY ROOT'S ───────────────────────────────── */}
      <section className="bg-parchment py-24">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <SectionHeader
            eyebrow="WHY PARTNER WITH US"
            heading="Built for successful franchise partners."
            align="center"
          />
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {REASONS.map((r) => (
              <div
                key={r.number}
                className="bg-linen rounded-2xl p-10 border border-obsidian/[0.06] hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-5">{r.icon}</div>
                <span className="font-serif text-5xl text-obsidian/[0.05] leading-none block -mt-4 mb-3">
                  {r.number}
                </span>
                <h3 className="font-serif text-2xl text-obsidian mb-4">{r.title}</h3>
                <p className="font-sans text-warm-gray text-sm leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MODEL OVERVIEW ───────────────────────────── */}
      <section className="bg-obsidian py-24">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <SectionHeader
            eyebrow="THE NUMBERS"
            heading="A model built to win."
            align="center"
            className="[&_.eyebrow]:text-roots-orange/70 [&_h2]:text-parchment"
          />
          <div className="mt-16 grid md:grid-cols-2 gap-px bg-parchment/[0.06] rounded-2xl overflow-hidden">
            {MODEL_POINTS.map((point) => (
              <div key={point.label} className="bg-obsidian px-10 py-8 flex items-start justify-between gap-6 border-b border-parchment/[0.06]">
                <span className="font-sans text-sm text-parchment/50 uppercase tracking-widest flex-shrink-0">
                  {point.label}
                </span>
                <span className="font-serif text-lg text-parchment text-right">{point.value}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 font-sans text-parchment/30 text-xs text-center">
            All figures indicative — final numbers depend on location, size, and market. Detailed projection shared post-enquiry.
          </p>
        </div>
      </section>

      {/* ─── ENQUIRY CTA ──────────────────────────────── */}
      <section className="bg-roots-orange py-20">
        <div className="container mx-auto px-6 md:px-16 max-w-4xl text-center">
          <h2 className="font-serif text-4xl md:text-6xl text-parchment leading-[1.05] mb-5">
            Ready to start the conversation?
          </h2>
          <p className="font-sans text-parchment/80 text-base md:text-lg max-w-lg mx-auto mb-10">
            Reach out via WhatsApp or email. We&apos;ll share our franchise kit,
            arrange a call with the founder, and walk you through every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919550071714?text=Hi%20Root%27s%20Team!%20I%27m%20interested%20in%20the%20franchise%20opportunity.%20Please%20share%20the%20franchise%20kit."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-parchment text-obsidian font-sans text-sm font-semibold uppercase tracking-[0.1em] px-8 py-4 rounded-full hover:bg-parchment/90 transition-colors duration-200 inline-flex items-center justify-center gap-2"
            >
              WhatsApp Us
            </a>
            <a
              href="mailto:rootsbyaj9@gmail.com?subject=Franchise%20Enquiry%20%E2%80%94%20Root%27s%20The%20Family%20Salon"
              className="border border-parchment text-parchment font-sans text-sm font-semibold uppercase tracking-[0.1em] px-8 py-4 rounded-full hover:bg-parchment/10 transition-colors duration-200 inline-flex items-center justify-center gap-2"
            >
              Email: rootsbyaj9@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────── */}
      <section className="bg-parchment py-24">
        <div className="container mx-auto px-6 md:px-16 max-w-3xl">
          <SectionHeader
            eyebrow="COMMON QUESTIONS"
            heading="FAQ"
            align="left"
          />
          <div className="mt-12 divide-y divide-obsidian/[0.08]">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-8">
                <h3 className="font-sans text-sm font-semibold text-obsidian mb-3">
                  {faq.q}
                </h3>
                <p className="font-sans text-warm-gray text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Take the first step today."
        subtext="Every Root's branch started with one conversation. Let's have ours."
        ctaLabel="Enquire via WhatsApp"
      />
    </>
  );
}

/**
 * about/page.tsx — About Page
 *
 * Section order (per implementation plan §Phase 4):
 *   1. Hero — "Where Craft Meets Care." full-width with founder portrait
 *   2. Founder Story — editorial 2-col with pull quote
 *   3. Values Grid — 3 cards (Craft, Warmth, Growth)
 *   4. Timeline — 3 milestones ("Founded", "1000 Clients", "3rd Branch")
 *   5. Team strip — image + name + role (placeholder)
 *   6. CTASection
 */

import type { Metadata } from 'next';
import CTASection from '@/components/sections/shared/CTASection';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: "About Us | Root's The Family Salon Hyderabad",
  description:
    "Meet the founder and team behind Root's The Family Salon — a family destination for premium hair, skin, and beauty services across Hyderabad.",
  openGraph: {
    title: "About Root's The Family Salon",
    description:
      "Our story, mission, and the values that drive every appointment.",
    type: 'website',
  },
};

const VALUES = [
  {
    number: '01',
    title: 'Craft First',
    body: 'Every cut, colour, and treatment is executed with precision — never rushed, never guessed. Continuing education is non-negotiable.',
  },
  {
    number: '02',
    title: 'Family Warmth',
    body: 'From your first walk-in to your tenth visit, you\'re greeted by name. We build relationships, not just bookings.',
  },
  {
    number: '03',
    title: 'Transparent Growth',
    body: 'Fair pricing. Clear consultations. No upselling. We grow when you come back because you trust us — not because of a script.',
  },
];

const MILESTONES = [
  { year: '2020', event: 'Founded in Hyderabad with one vision — bring premium salon quality to every family.' },
  { year: '2023', event: 'Crossed 1,000+ loyal clients. Expanded skin and tattoo services.' },
  { year: '2025', event: 'Third branch opens — a milestone built on trust, craft, and community.' },
];

export default function AboutPage() {
  return (
    <>
      {/* ─── 1. HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-end bg-obsidian overflow-hidden pt-32 pb-20">
        {/* Background founder portrait */}
        <div className="absolute inset-0 opacity-30">
          <ImagePlaceholder
            label="FOUNDER PORTRAIT"
            description="Half-body portrait of Anikanth Jadhav (founder). Professional, warm-toned studio light or salon background. 16:9, 1440×810px."
            mood="dark"
            className="w-full h-full"
          />
        </div>

        {/* Gradient overlay — text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/60 to-transparent" />

        <div className="relative container mx-auto px-6 md:px-16 max-w-7xl">
          <span className="eyebrow text-roots-orange/80 mb-3">OUR STORY</span>
          <h1 className="font-serif text-6xl md:text-8xl text-parchment leading-[0.95] max-w-3xl">
            Where Craft{' '}
            <em className="italic font-normal text-roots-orange">Meets</em>{' '}
            Care.
          </h1>
          <p className="mt-6 font-sans text-parchment/70 text-base md:text-lg max-w-md leading-relaxed">
            Root&apos;s is the Hyderabad salon built for every member of your family —
            without ever compromising on quality.
          </p>
        </div>
      </section>

      {/* ─── 2. FOUNDER STORY ────────────────────────────── */}
      <section className="bg-parchment py-24">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          {/* Image column */}
          <div className="order-2 md:order-1 aspect-[3/4] rounded-2xl overflow-hidden">
            <ImagePlaceholder
              label="FOUNDER CANDID"
              description="Anikanth Jadhav candid shot at the salon — working, styling, or consulting a client. Warm editorial tone. 3:4 portrait, 600×800px."
              mood="warm"
              className="w-full h-full"
            />
          </div>

          {/* Text column */}
          <div className="order-1 md:order-2">
            <span className="eyebrow">FOUNDER'S NOTE</span>
            <h2 className="font-serif text-4xl md:text-5xl text-obsidian leading-[1.05] mt-3 mb-8">
              I started Root&apos;s for my family.
            </h2>

            {/* Pull quote */}
            <blockquote className="border-l-2 border-roots-orange pl-6 mb-8">
              <p className="font-serif italic text-xl text-warm-gray leading-relaxed">
                &ldquo;I wanted one place where my parents, my spouse, my kids — every
                generation — could walk out feeling their best. That&apos;s still why
                I do this.&rdquo;
              </p>
              <footer className="mt-3 font-sans text-xs font-semibold uppercase tracking-widest text-roots-orange">
                — Anikanth Jadhav, Founder
              </footer>
            </blockquote>

            <p className="font-sans text-warm-gray text-base leading-relaxed mb-4">
              Before Root&apos;s, Hyderabad had a clear gap — boutique-quality
              salons were expensive and inaccessible; affordable salons often
              cut corners. We built the alternative: premium technique,
              professional-grade products, and a genuinely warm space that
              welcomes every age and every budget.
            </p>
            <p className="font-sans text-warm-gray text-base leading-relaxed">
              Three branches later, we&apos;re still that same place my family visits
              every month. We&apos;ve simply invited more families in.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 3. VALUES GRID ──────────────────────────────── */}
      <section className="bg-linen py-24">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <SectionHeader
            eyebrow="WHAT WE STAND FOR"
            heading="Our three principles."
            align="center"
          />
          <div className="mt-16 grid md:grid-cols-3 gap-px bg-obsidian/[0.08] rounded-2xl overflow-hidden">
            {VALUES.map((v) => (
              <div key={v.number} className="bg-linen p-10 group hover:bg-parchment transition-colors duration-300">
                <span className="font-serif text-7xl text-obsidian/[0.06] leading-none block mb-4">
                  {v.number}
                </span>
                <h3 className="font-serif text-2xl text-obsidian mb-4">{v.title}</h3>
                <p className="font-sans text-warm-gray text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. TIMELINE ─────────────────────────────────── */}
      <section className="bg-obsidian py-24">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <SectionHeader
            eyebrow="OUR JOURNEY"
            heading="Five years of growing together."
            align="center"
            className="[&_.eyebrow]:text-roots-orange/70 [&_h2]:text-parchment"
          />
          <div className="mt-16 relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-parchment/10" />

            <div className="flex flex-col gap-16">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`md:grid md:grid-cols-2 md:gap-16 items-center ${i % 2 === 0 ? '' : 'md:[direction:rtl]'}`}
                >
                  <div className={`md:[direction:ltr] ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    <span className="font-serif text-6xl md:text-8xl text-roots-orange/20 leading-none block">
                      {m.year}
                    </span>
                  </div>
                  <div className="md:[direction:ltr] mt-4 md:mt-0">
                    <p className="font-sans text-parchment/80 text-base md:text-lg leading-relaxed">
                      {m.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Come meet us in person."
        subtext="Book a complimentary consultation at any of our three branches. Let's talk about what a transformation looks like for you."
        ctaLabel="Book via WhatsApp"
      />
    </>
  );
}

/**
 * locations/page.tsx — Locations Page
 *
 * Section order (per implementation plan §Phase 5):
 *   1. Hero header — "Find Your Nearest Root's"
 *   2. Three branch cards — address, hours, map link, WhatsApp CTA
 *   3. NEW branch badge on branch #3
 *   4. Embedded map section (iframe or Google Maps link CTA)
 *   5. CTASection
 *
 * Branch data pulled from CLAUDE.md:
 *  - Kondapur: https://maps.app.goo.gl/KhgoKHXQ1poNibB27
 *  - Manikonda: https://maps.app.goo.gl/DVKd2j2KB39Ubmat6
 *  - New Branch (opening soon — address TBC by client)
 */

import type { Metadata } from 'next';
import CTASection from '@/components/sections/shared/CTASection';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

export const metadata: Metadata = {
  title: "Locations | Root's The Family Salon Hyderabad",
  description:
    "Find Root's The Family Salon near you. Three branches across Hyderabad — Kondapur, Manikonda, and our newly opened third location.",
  openGraph: {
    title: "Our Locations | Root's The Family Salon",
    description: "Three branches across Hyderabad. Find your nearest Root's.",
    type: 'website',
  },
};

const BRANCHES = [
  {
    id: 'kondapur',
    name: 'Kondapur',
    address: 'Kondapur, Hyderabad, Telangana',
    hours: 'Mon–Sun: 10 AM – 9 PM',
    mapUrl: 'https://maps.app.goo.gl/KhgoKHXQ1poNibB27',
    phone: '+919550071714',
    isNew: false,
    description: 'Our flagship branch — full-service hair, skin, bridal, and tattoo studio.',
    imgDescription: 'Interior shot of Kondapur branch — warm lighting, styling chairs, modern salon. 4:3, 600×450px.',
  },
  {
    id: 'manikonda',
    name: 'Manikonda',
    address: 'Manikonda, Hyderabad, Telangana',
    hours: 'Mon–Sun: 10 AM – 9 PM',
    mapUrl: 'https://maps.app.goo.gl/DVKd2j2KB39Ubmat6',
    phone: '+919550071714',
    isNew: false,
    description: 'Our second branch, serving the Manikonda community with the full Root\'s experience.',
    imgDescription: 'Exterior or interior shot of Manikonda branch. Professional, welcoming. 4:3, 600×450px.',
  },
  {
    id: 'new-branch',
    name: 'New Branch',
    address: 'Hyderabad — Address Coming Soon',
    hours: 'Opening Very Soon',
    mapUrl: '#',
    phone: '+919550071714',
    isNew: true,
    description: 'Our third and newest branch — watch this space for the exact address and grand opening details.',
    imgDescription: 'Teaser/coming-soon shot of new salon fit-out or area. Slight motion blur or construction-to-complete feel. 4:3, 600×450px.',
  },
];

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.527 5.847L.057 23.25a.75.75 0 0 0 .923.924l5.485-1.467A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.714 9.714 0 0 1-4.95-1.353l-.355-.211-3.68.984.987-3.607-.23-.37A9.72 9.72 0 0 1 2.25 12C2.25 6.61 6.61 2.25 12 2.25S21.75 6.61 21.75 12 17.39 21.75 12 21.75z" />
    </svg>
  );
}

export default function LocationsPage() {
  return (
    <>
      {/* ─── HERO HEADER ───────────────────────────────── */}
      <section className="pt-36 pb-16 bg-parchment">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl text-center">
          <span className="eyebrow">FIND US</span>
          <h1 className="font-serif text-5xl md:text-7xl text-obsidian leading-[1.0] mt-2 mb-4">
            Root&apos;s is{' '}
            <em className="italic font-normal text-roots-orange">near you.</em>
          </h1>
          <p className="font-sans text-warm-gray text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Three branches across Hyderabad — each one offering the full
            Root&apos;s experience. Pick the one closest to home.
          </p>
        </div>
      </section>

      {/* ─── BRANCH CARDS ──────────────────────────────── */}
      <section className="bg-linen py-16">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-6">
            {BRANCHES.map((branch) => (
              <div
                key={branch.id}
                className="bg-parchment rounded-2xl overflow-hidden border border-obsidian/[0.06] flex flex-col group hover:shadow-xl transition-shadow duration-300"
              >
                {/* Branch photo */}
                <div className="aspect-[4/3] relative">
                  <ImagePlaceholder
                    label={`${branch.name.toUpperCase()} BRANCH`}
                    description={branch.imgDescription}
                    mood="warm"
                    className="w-full h-full"
                  />
                  {branch.isNew && (
                    <div className="absolute top-4 left-4 bg-roots-orange text-parchment font-sans text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                      Now Open
                    </div>
                  )}
                  {branch.isNew && (
                    <div className="absolute top-4 right-4 bg-obsidian/80 text-parchment font-sans text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      10% Off — Opening Special
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="font-serif text-2xl text-obsidian">{branch.name}</h2>
                    {!branch.isNew && (
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-roots-orange bg-roots-orange/10 px-2.5 py-1 rounded-full">
                        Open Now
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-warm-gray text-sm leading-relaxed mb-6 flex-1">
                    {branch.description}
                  </p>

                  {/* Info grid */}
                  <div className="space-y-3 mb-8 border-t border-obsidian/[0.06] pt-6">
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-roots-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
                      </svg>
                      <span className="font-sans text-obsidian text-sm">{branch.address}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-roots-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                      </svg>
                      <span className="font-sans text-obsidian text-sm">{branch.hours}</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3">
                    <a
                      href={`https://wa.me/${branch.phone}?text=Hi%20Root%27s%20Salon!%20I%27d%20like%20to%20book%20an%20appointment%20at%20your%20${encodeURIComponent(branch.name)}%20branch.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center justify-center gap-2 text-sm"
                    >
                      <WhatsAppIcon />
                      Book at {branch.name}
                    </a>
                    {branch.mapUrl !== '#' && (
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline text-sm flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                        </svg>
                        Get Directions
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OFFER CALLOUT ────────────────────────────── */}
      <section className="bg-roots-orange py-16">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-parchment mb-4">
            20% off at our new branch.
          </h2>
          <p className="font-sans text-parchment/80 text-base md:text-lg max-w-xl mx-auto mb-8">
            Walk in to our newest Hyderabad location during opening week and receive 20% off your entire bill.
            Just mention &ldquo;Grand Opening&rdquo; — no code needed.
          </p>
          <p className="font-sans text-parchment/60 text-xs uppercase tracking-widest">
            Other branches: 10% off for first-time visitors
          </p>
        </div>
      </section>

      <CTASection
        heading="Ready to visit us?"
        subtext="Book your appointment in under a minute on WhatsApp. We'll confirm your slot instantly."
        ctaLabel="Book via WhatsApp"
      />
    </>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/client';
import { getLocationsQuery } from '@/sanity/lib/queries';
import { BRANCHES_FIXTURE } from '@/fixtures/locations';
import { REVIEWS_FIXTURE } from '@/fixtures/reviews';
import CTASection from '@/components/sections/shared/CTASection';
import { cn } from '@/lib/utils';

export const revalidate = 60;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getAllBranches() {
  const cmsLocations = await client?.fetch(getLocationsQuery).catch(() => null) ?? [];
  if (Array.isArray(cmsLocations) && cmsLocations.length > 0) {
    return cmsLocations.map((loc: any) => {
      const slug = (loc.slug || loc.shortName || loc.name.split(/[-—]/).pop()?.trim() || loc._id).toLowerCase();
      const fixtureMatch = BRANCHES_FIXTURE.find(
        (f) => f.slug === slug || f.shortName.toLowerCase() === (loc.shortName || '').toLowerCase()
      );
      const fullFormatted =
        typeof loc.address === 'string'
          ? loc.address
          : (loc.address?.fullFormatted || fixtureMatch?.address.fullFormatted || '');
      const area = fixtureMatch?.address.area || loc.shortName || loc.name;
      const city = fixtureMatch?.address.city || 'Hyderabad';
      const landmark = fixtureMatch?.address.landmark || (fullFormatted.split(',')[1]?.trim() || fullFormatted);
      const pincode = fixtureMatch?.address.pincode || (fullFormatted.match(/\d{6}/)?.[0] || '500001');

      return {
        _id: loc._id,
        name: loc.name,
        shortName: loc.shortName || fixtureMatch?.shortName || loc.name,
        slug,
        address: {
          street: fixtureMatch?.address.street || fullFormatted.split(',')[0] || fullFormatted,
          colony: fixtureMatch?.address.colony || '',
          landmark,
          area,
          city,
          pincode,
          fullFormatted,
        },
        phone: loc.phone || fixtureMatch?.phone || '+919700744357',
        phoneFormatted: fixtureMatch?.phoneFormatted || loc.phone || '+91 97007 44357',
        whatsappNumber: loc.whatsappNumber || fixtureMatch?.whatsappNumber || '919700744357',
        hours: loc.hours || fixtureMatch?.hours || 'Mon–Sun: 10 AM – 9 PM',
        googleMapsUrl:
          loc.googleMapsUrl ||
          fixtureMatch?.googleMapsUrl ||
          `https://maps.google.com/?q=${encodeURIComponent(loc.name)}`,
        embedUrl:
          loc.embedUrl ||
          fixtureMatch?.embedUrl ||
          `https://www.google.com/maps?q=${encodeURIComponent(fullFormatted)}&hl=en&z=15&output=embed`,
        description:
          loc.description ||
          fixtureMatch?.description ||
          `Experience premium styling at our signature ${loc.shortName || loc.name} location. Let our experts craft your perfect look.`,
        accessNotes: fixtureMatch?.accessNotes || 'Convenient parking available at the salon premises.',
        servicesAvailable: fixtureMatch?.servicesAvailable || [
          'Hair Cuts & Styling',
          'Hair Colour & Balayage',
          'Facials & D-Tan',
          'Bridal Makeover',
          'Family Grooming',
        ],
        isSignature: fixtureMatch?.isSignature || false,
        isNew: loc.isNew || fixtureMatch?.isNew || false,
      };
    });
  }
  return BRANCHES_FIXTURE;
}

export async function generateStaticParams() {
  const branches = await getAllBranches();
  return branches.map((b: any) => ({
    slug: b.slug,
  }));
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rootssalons.in';

const LOCAL_AREAS: Record<string, string[]> = {
  uppal: ['Uppal', 'Peerzadiguda', 'Boduppal', 'Medipally', 'Habsiguda', 'Nacharam', 'Ramanthapur'],
  tarnaka: ['Tarnaka', 'South Lallaguda', 'Secunderabad', 'Osmania University', 'Moula Ali', 'Malkajgiri', 'Sitaphalmandi'],
  yamjal: ['Yamjal', 'Medchal', 'Kompally', 'Alwal', 'Bolarum', 'Hakimpet'],
};

const GEO_COORDS: Record<string, { lat: number; lng: number }> = {
  uppal: { lat: 17.397388, lng: 78.5885877 },
  tarnaka: { lat: 17.4304751, lng: 78.5329607 },
  yamjal: { lat: 17.5451, lng: 78.5447 },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const branches = await getAllBranches();
  const branch = branches.find((b: any) => b.slug === slug || b.shortName.toLowerCase() === slug.toLowerCase());
  if (!branch) return {};

  const areas = LOCAL_AREAS[slug]?.join(', ') || branch.address.area;

  const titles: Record<string, string> = {
    uppal: "Best Family Salon in Uppal, Hyderabad | Hair, Skin & Bridal | Root's",
    tarnaka: "Best Salon in Tarnaka, Secunderabad | Hair & Beauty | Root's Family Salon",
    yamjal: "Best Family Salon in Yamjal, Hyderabad | Hair & Skin Rituals | Root's",
  };

  const descriptions: Record<string, string> = {
    uppal: `Looking for the best salon in Uppal? Root's The Family Salon on Peerzadiguda Road offers expert haircuts, balayage, facials, bridal makeover, and tattoos. Serving ${areas}. Book your slot today.`,
    tarnaka: `Top-rated family salon in Tarnaka (opp. St. Ann's School, South Lallaguda). Expert haircut, colour, keratin, bridal styling & skin rituals in Secunderabad. Serving ${areas}.`,
    yamjal: `Root's Family Salon in Yamjal, Hyderabad. Premium hygiene, hair masterclass, skin treatments, and family grooming near Sagar Ring Road. Serving ${areas}. Book online.`,
  };

  const pageTitle = titles[slug] || `${branch.name} | Best Salon in ${branch.shortName}`;
  const pageDescription = descriptions[slug] || branch.description;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      `salon in ${branch.shortName.toLowerCase()}`,
      `best salon in ${branch.shortName.toLowerCase()}`,
      `hair salon ${branch.shortName.toLowerCase()}`,
      `beauty parlour in ${branch.shortName.toLowerCase()}`,
      `family salon ${branch.shortName.toLowerCase()}`,
      `salon near me ${branch.shortName.toLowerCase()}`,
      `bridal makeup in ${branch.shortName.toLowerCase()}`,
      'hyderabad salon',
    ],
    alternates: {
      canonical: `${BASE_URL}/locations/${slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${BASE_URL}/locations/${slug}`,
      type: 'website',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: branch.name,
        },
      ],
    },
  };
}

export default async function BranchLocationPage({ params }: PageProps) {
  const { slug } = await params;
  const branches = await getAllBranches();
  const branch = branches.find((b: any) => b.slug === slug || b.shortName.toLowerCase() === slug.toLowerCase());

  if (!branch) {
    notFound();
  }

  const coords = GEO_COORDS[slug] || { lat: 17.397388, lng: 78.5885877 };
  const servedAreas = LOCAL_AREAS[slug] || [branch.address.area, branch.address.city];
  const otherBranches = branches.filter((b: any) => b.slug !== branch.slug);
  const branchReviews = REVIEWS_FIXTURE.filter(
    (r) => r.branch.toLowerCase() === branch.shortName.toLowerCase()
  );

  const branchFaqs = [
    {
      q: `Where is Root's Family Salon located in ${branch.shortName}?`,
      a: `Our ${branch.shortName} salon is located at ${branch.address.fullFormatted}. Landmark: ${branch.address.landmark}.`,
    },
    {
      q: `Do I need to book in advance or can I walk in to Root's ${branch.shortName}?`,
      a: `We warmly welcome walk-in clients at ${branch.shortName}. However, for bridal trials, balayage, or weekend appointments, booking in advance ensures zero waiting time.`,
    },
    {
      q: `What services are available at Root's ${branch.shortName}?`,
      a: `Our ${branch.shortName} branch provides: ${branch.servicesAvailable.join(', ')}.`,
    },
    {
      q: `Is parking available at the ${branch.shortName} branch?`,
      a: branch.accessNotes || 'Yes, convenient parking is available directly at the salon premises.',
    },
  ];

  // Schema.org LocalBusiness + BreadcrumbList + FAQPage
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'HairSalon',
      '@id': `${BASE_URL}/locations/${slug}#salon`,
      name: branch.name,
      url: `${BASE_URL}/locations/${slug}`,
      image: `${BASE_URL}/logo-nobg1.svg`,
      telephone: branch.phone,
      priceRange: '₹₹',
      hasMap: branch.googleMapsUrl,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: coords.lat,
        longitude: coords.lng,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${branch.address.street}, ${branch.address.colony}`,
        addressLocality: branch.address.area,
        addressRegion: 'Telangana',
        postalCode: branch.address.pincode,
        addressCountry: 'IN',
      },
      areaServed: servedAreas,
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '21:00',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: BASE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Locations',
          item: `${BASE_URL}/locations`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: branch.shortName,
          item: `${BASE_URL}/locations/${slug}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: branchFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <main className="bg-linen min-h-screen text-obsidian">
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* ─── BREADCRUMB & HERO HEADER ─────────────────────── */}
      <section className="bg-parchment border-b border-obsidian/[0.08] pt-32 pb-16">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-warm-gray font-sans tracking-wide">
            <Link href="/" className="hover:text-roots-orange transition-colors">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-roots-orange transition-colors">Locations</Link>
            <span>/</span>
            <span className="text-obsidian font-medium">{branch.shortName}</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="eyebrow bg-roots-orange/10 text-roots-orange px-3.5 py-1.5 rounded-full font-semibold">
              {branch.isSignature ? 'Flagship Branch' : branch.isNew ? 'New Location' : 'Premium Salon'}
            </span>
            <span className="text-xs font-sans text-warm-gray flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open Daily 10 AM – 9 PM
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-obsidian mb-4 leading-tight">
            Best Family Salon in {branch.shortName}, Hyderabad
          </h1>
          <p className="font-sans text-warm-gray text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            {branch.description}
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/book?branch=${branch.slug}`}
              className="btn-primary flex items-center justify-center gap-2 text-xs sm:text-sm px-6 py-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Book at {branch.shortName}
            </Link>

            <a
              href={branch.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center justify-center gap-2 text-xs sm:text-sm px-6 py-3"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get Directions
            </a>

            <a
              href={`tel:${branch.phone}`}
              className="bg-obsidian/5 hover:bg-obsidian/10 text-obsidian font-sans text-xs sm:text-sm px-5 py-3 rounded-full flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4 text-warm-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {branch.phoneFormatted}
            </a>

            <a
              href={`https://wa.me/${branch.whatsappNumber}?text=Hi%20Root%27s%20${branch.shortName}%20team%2C%20I%20would%20like%20to%20inquire%20about%20a%20service`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600/10 hover:bg-emerald-600/15 text-emerald-700 font-sans text-xs sm:text-sm px-5 py-3 rounded-full flex items-center gap-2 transition-colors"
            >
              <span>💬</span> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─── LOCATION KEY DETAILS & MAP ─────────────────────── */}
      <section className="py-14">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Info Side */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-parchment p-6 rounded-2xl border border-obsidian/[0.06] shadow-sm">
                <h2 className="font-serif text-xl text-obsidian mb-4">Branch Details</h2>
                <div className="space-y-4 text-sm font-sans">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-warm-gray font-semibold block mb-1">
                      Full Address
                    </span>
                    <p className="text-obsidian leading-relaxed">{branch.address.fullFormatted}</p>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider text-warm-gray font-semibold block mb-1">
                      Landmark & Access
                    </span>
                    <p className="text-obsidian">{branch.address.landmark}</p>
                    {branch.accessNotes && (
                      <p className="text-warm-gray text-xs mt-1">{branch.accessNotes}</p>
                    )}
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider text-warm-gray font-semibold block mb-1">
                      Operating Hours
                    </span>
                    <p className="text-obsidian">{branch.hours}</p>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider text-warm-gray font-semibold block mb-1">
                      Direct Contact
                    </span>
                    <a href={`tel:${branch.phone}`} className="text-roots-orange hover:underline font-medium">
                      {branch.phoneFormatted}
                    </a>
                  </div>
                </div>
              </div>

              {/* Local Areas Served */}
              <div className="bg-parchment p-6 rounded-2xl border border-obsidian/[0.06] shadow-sm">
                <h3 className="font-serif text-lg text-obsidian mb-2">Nearby Localities We Serve</h3>
                <p className="text-xs text-warm-gray mb-3">Conveniently accessible from:</p>
                <div className="flex flex-wrap gap-2">
                  {servedAreas.map((area) => (
                    <span
                      key={area}
                      className="bg-linen text-obsidian text-xs px-3 py-1 rounded-full border border-obsidian/[0.06]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Embed Side */}
            <div className="md:col-span-7 bg-parchment rounded-2xl overflow-hidden border border-obsidian/[0.06] shadow-sm min-h-[420px] flex flex-col">
              <div className="p-4 border-b border-obsidian/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">🗺️</span>
                  <span className="font-sans font-medium text-xs text-obsidian">Live Google Maps</span>
                </div>
                <a
                  href={branch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-roots-orange hover:underline font-sans font-medium flex items-center gap-1"
                >
                  Open in Google Maps ↗
                </a>
              </div>
              <div className="flex-1 w-full relative min-h-[360px]">
                <iframe
                  src={branch.embedUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Google Map - ${branch.name}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES AVAILABLE AT THIS BRANCH ──────────────── */}
      <section className="py-12 bg-parchment border-y border-obsidian/[0.06]">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="eyebrow text-roots-orange mb-2 block">Menu & Specialties</span>
            <h2 className="font-serif text-2xl md:text-3xl text-obsidian mb-3">
              Signature Services at {branch.shortName}
            </h2>
            <p className="font-sans text-warm-gray text-sm">
              All services performed with single-use sterile tools and professional salon formulations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {branch.servicesAvailable.map((svc) => (
              <div
                key={svc}
                className="bg-linen p-5 rounded-xl border border-obsidian/[0.05] flex items-center justify-between group hover:border-roots-orange/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-roots-orange" />
                  <span className="font-sans text-sm text-obsidian font-medium">{svc}</span>
                </div>
                <Link
                  href={`/book?branch=${branch.slug}`}
                  className="text-xs text-roots-orange opacity-0 group-hover:opacity-100 transition-opacity font-medium"
                >
                  Book →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/book?branch=${branch.slug}`}
              className="btn-primary inline-flex items-center gap-2 text-xs"
            >
              Reserve a Slot at {branch.shortName}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BRANCH REVIEWS (IF ANY) ───────────────────────── */}
      {branchReviews.length > 0 && (
        <section className="py-14">
          <div className="container mx-auto px-6 md:px-16 max-w-5xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="eyebrow text-roots-orange block mb-1">Guest Experiences</span>
                <h2 className="font-serif text-2xl text-obsidian">Reviews for {branch.shortName} Branch</h2>
              </div>
              <a
                href={branch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs hidden sm:inline-flex"
              >
                Read on Google
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {branchReviews.slice(0, 4).map((rev) => (
                <div
                  key={rev._id}
                  className="bg-parchment p-6 rounded-2xl border border-obsidian/[0.06] shadow-sm flex flex-col justify-between"
                >
                  <div className="mb-4">
                    <div className="flex items-center gap-1 text-amber-500 mb-2 text-sm">
                      {'★'.repeat(rev.rating)}
                    </div>
                    <p className="font-sans text-obsidian text-sm leading-relaxed italic">
                      &ldquo;{rev.reviewText}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-warm-gray pt-3 border-t border-obsidian/[0.06]">
                    <span className="font-medium text-obsidian">{rev.name}</span>
                    <span>{rev.service}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FREQUENTLY ASKED QUESTIONS (LOCAL FAQS) ────────── */}
      <section className="py-14 bg-linen">
        <div className="container mx-auto px-6 md:px-16 max-w-4xl">
          <div className="text-center mb-10">
            <span className="eyebrow text-roots-orange mb-2 block">Quick Answers</span>
            <h2 className="font-serif text-2xl md:text-3xl text-obsidian mb-2">
              Frequently Asked Questions — {branch.shortName}
            </h2>
            <p className="font-sans text-warm-gray text-sm">
              Everything you need to know before visiting our {branch.shortName} salon.
            </p>
          </div>

          <div className="space-y-4">
            {branchFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-parchment rounded-xl p-5 border border-obsidian/[0.06] [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex items-center justify-between font-sans text-sm md:text-base font-medium text-obsidian select-none">
                  <span>{faq.q}</span>
                  <span className="text-warm-gray text-xl group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="font-sans text-warm-gray text-sm leading-relaxed mt-3 pt-3 border-t border-obsidian/[0.06]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OTHER LOCATIONS SWITCHER ───────────────────────── */}
      <section className="py-12 bg-parchment border-t border-obsidian/[0.06]">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <h2 className="font-serif text-xl text-obsidian mb-4 text-center">Other Root&apos;s Locations in Hyderabad</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {otherBranches.map((other) => (
              <Link
                key={other.slug}
                href={`/locations/${other.slug}`}
                className="bg-linen p-4 rounded-xl border border-obsidian/[0.06] hover:border-roots-orange/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <h3 className="font-serif text-base text-obsidian">{other.name}</h3>
                  <p className="font-sans text-xs text-warm-gray">{other.address.area}, {other.address.city}</p>
                </div>
                <span className="text-roots-orange text-sm font-medium">View →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─────────────────────────────────────── */}
      <CTASection
        heading={`Experience Root's in ${branch.shortName}`}
        subtext="Step in for a complete transformation or schedule your service in advance."
        ctaLabel={`Book at ${branch.shortName}`}
      />
    </main>
  );
}

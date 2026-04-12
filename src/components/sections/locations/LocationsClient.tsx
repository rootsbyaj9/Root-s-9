'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import CTASection from '@/components/sections/shared/CTASection';

const BRANCHES = [
  {
    id: 'branch-1',
    name: 'Root\'s The Family Salon - Uppal',
    address: 'Peerzadiguda, Uppal, Hyderabad',
    hours: 'Mon–Sun: 10 AM – 9 PM',
    mapUrl: 'https://maps.app.goo.gl/ocq8uts9jYaCp3bu8',
    embedUrl: "https://www.google.com/maps?q=17.397388,78.5885877&hl=en&z=15&output=embed",
    phone: '+919700744357',
    description: 'Experience premium styling at our signature Uppal location. Let our experts craft your perfect look.',
  },
  {
    id: 'branch-2',
    name: 'Root\'s The Family Salon - Tarnaka',
    address: 'Tarnaka Main Rd, Tarnaka, Hyderabad',
    hours: 'Mon–Sun: 10 AM – 9 PM',
    mapUrl: 'https://maps.app.goo.gl/NSNafg2mqV9acw9m7',
    embedUrl: "https://www.google.com/maps?q=17.4304751,78.5329607&hl=en&z=15&output=embed",
    phone: '+919700744357',
    description: 'Our second branch offering the identical luxurious Root\'s experience in Tarnaka.',
  },
  {
    id: 'branch-3',
    name: 'Root\'s The Family Salon - COMING SOON',
    address: 'Hyderabad',
    hours: 'Opening in 3 Days',
    phone: '+919700744357',
    description: 'Our third branch is opening soon! We are bringing the premium Root\'s experience to a new neighborhood in just 3 days.',
    isNew: true,
  }
];

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.527 5.847L.057 23.25a.75.75 0 0 0 .923.924l5.485-1.467A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.714 9.714 0 0 1-4.95-1.353l-.355-.211-3.68.984.987-3.607-.23-.37A9.72 9.72 0 0 1 2.25 12C2.25 6.61 6.61 2.25 12 2.25S21.75 6.61 21.75 12 17.39 21.75 12 21.75z" />
    </svg>
  );
}

export default function LocationsClient({ locationsData = [] }: { locationsData?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // If CMS returns data, merge or replace. We'll replace it entirely if it exists.
  const activeBranches = locationsData.length > 0 ? locationsData : BRANCHES;

  useGSAP(() => {
    // Cards: fade up on scroll
    gsap.from('.location-card', {
      autoAlpha: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
      }
    });

    gsap.from('.hero-text', {
      autoAlpha: 0,
      y: -20,
      duration: 0.8,
      ease: 'power2.out'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* ─── HERO HEADER ───────────────────────────────── */}
      <section className="pt-36 pb-16 bg-parchment">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl text-center">
          <span className="eyebrow hero-text">FIND US</span>
          <h1 className="hero-text font-serif text-5xl md:text-7xl text-obsidian leading-[1.0] mt-2 mb-4">
            Root&apos;s is{' '}
            <em className="italic font-normal text-roots-orange">near you.</em>
          </h1>
          <p className="hero-text font-sans text-warm-gray text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Leading salons across Hyderabad — pick the branch closest to your home and step into your best version.
          </p>
        </div>
      </section>

      {/* ─── BRANCH CARDS WITH MAPS ─────────────────────── */}
      <section className="bg-linen py-16">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex flex-col gap-12">
            {activeBranches.map((branch: any, idx: number) => {
              const name = branch.branchName || branch.name;
              const addr = branch.address;
              const phone = branch.phone;
              const whatsapp = branch.whatsappNumber;
              const hours = branch.timings || branch.hours;
              const mapUrl = branch.googleMapsLink || branch.mapUrl;
              const embed = branch.embedUrl || "https://www.google.com/maps?q=17.397388,78.5885877&hl=en&z=15&output=embed";

              return (
              <div 
                key={branch._id || branch.id || idx} 
                className="location-card bg-parchment rounded-2xl overflow-hidden border border-obsidian/[0.06] flex flex-col md:flex-row hover:shadow-2xl transition-shadow duration-500 relative"
              >
                {branch.isNew && (
                  <div className="absolute top-0 right-0 bg-roots-orange text-parchment px-4 py-1 text-xs font-sans tracking-widest uppercase z-10">
                    New
                  </div>
                )}
                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col flex-1 order-2 md:order-1 justify-center">
                  <h2 className="font-serif text-3xl text-obsidian mb-4">{name}</h2>
                  <p className="font-sans text-warm-gray text-sm md:text-base leading-relaxed mb-8">
                    {branch.description || "Experience premium styling at our signature location. Let our experts craft your perfect look."}
                  </p>

                  {/* Details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-roots-orange/10 p-2 rounded-full">
                        <svg className="w-4 h-4 text-roots-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
                        </svg>
                      </div>
                      <span className="font-sans text-obsidian text-sm uppercase tracking-wide mt-1">{addr}</span>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-roots-orange/10 p-2 rounded-full">
                        <svg className="w-4 h-4 text-roots-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                        </svg>
                      </div>
                      <span className="font-sans text-obsidian text-sm uppercase tracking-wide mt-1">{hours}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4 mt-auto">
                    {whatsapp && (
                      <a
                        href={`https://wa.me/${whatsapp}?text=Hi%20Root%27s%20Salon!%20I%27d%20like%20to%20book%20an%20appointment%20with%20you.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center justify-center gap-2 text-xs w-full sm:w-auto"
                      >
                        <WhatsAppIcon />
                        Book Appointment
                      </a>
                    )}
                    {mapUrl && (
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline text-xs flex items-center justify-center gap-2 w-full sm:w-auto"
                      >
                        Open in Maps
                      </a>
                    )}
                  </div>
                </div>

                {/* Map Side */}
                <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative min-h-[350px] order-1 md:order-2 bg-obsidian/[0.03]">
                  {/* Embedded Google Map */}
                  <iframe 
                    src={embed} 
                    className="absolute inset-0 w-full h-full border-0 filter contrast-125 saturate-50 mix-blend-multiply" 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Subtle overlay to fit the parchment branding smoothly */}
                  <div className="absolute inset-0 bg-parchment/10 pointer-events-none mix-blend-overlay"></div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready for a change?"
        subtext="Drop by any of our branches or secure your slot instantly on WhatsApp."
        ctaLabel="Book via WhatsApp"
      />
    </div>
  );
}

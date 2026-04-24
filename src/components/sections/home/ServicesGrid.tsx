"use client";

/**
 * ServicesGrid.tsx — Interactive Service Showcase
 *
 * - Desktop: 6 vertical slices expanding horizontally on hover (accordion).
 * - Mobile: 2×3 bento grid with fixed cards for better touch usability.
 * - F-reading pattern: name at top-left, catchy tagline at bottom, CTA at bottom-right.
 */

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import SectionHeader from "@/components/ui/SectionHeader";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { urlForImage } from "@/sanity/lib/image";

// ── CMS-Compatible Service Data ───────────────────────────────────────────────
const SERVICES = [
  {
    id: "hair",
    number: "01",
    title: "Hair",
    tagline: "Where your signature look begins.",
    href: "/services?tab=womens",
    placeholder: {
      label: "Hair · High-Res Image",
      description: "Close-up of styled hair. Warm background.",
    },
    dark: false,
  },
  {
    id: "bridal",
    number: "02",
    title: "Bridal",
    tagline: "The spotlight, perfected.",
    href: "/services?tab=bridal",
    placeholder: {
      label: "Bridal · High-Res Image",
      description: "Bridal full look. Golden hour.",
    },
    dark: false,
  },
  {
    id: "skin",
    number: "03",
    title: "Skin",
    tagline: "Radiance redefined.",
    href: "/services?tab=womens",
    placeholder: {
      label: "Skin · High-Res Image",
      description: "Glowing skin close-up. Radiant.",
    },
    dark: false,
  },
  {
    id: "tattoo",
    number: "04",
    title: "Tattoo",
    tagline: "Art styled for your skin.",
    href: "/services?tab=tattoo",
    placeholder: {
      label: "Tattoo · High-Res Image",
      description: "Fine-line tattoo. High contrast.",
    },
    dark: true,
  },
  {
    id: "nails",
    number: "05",
    title: "Nails",
    tagline: "Elegance at your fingertips.",
    href: "/services?tab=womens",
    placeholder: {
      label: "Nails · High-Res Image",
      description: "Manicured nails, elegant style.",
    },
    dark: false,
  },
  {
    id: "piercing",
    number: "06",
    title: "Piercing",
    tagline: "Bold accents. Safely done.",
    href: "/services?tab=womens",
    placeholder: {
      label: "Piercing · High-Res Image",
      description: "Ear piercing, modern jewelry.",
    },
    dark: true,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

type ServicesGridProps = {
  cmsServices?: any[];
  cmsImages?: any;
};

export default function ServicesGrid({ cmsServices = [], cmsImages = {} }: ServicesGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  
  const mergedServices = SERVICES.map((base) => {
    const cmsMatch = cmsServices.find((s) => s.slug === base.id);
    const title = cmsMatch?.title || base.title;

    let cmsImageUrl;
    let fallbackPosition = "center";
    let hotspot;
    
    try {
      const imageFieldMap: Record<string, string> = {
        hair: "hairServiceImage",
        bridal: "bridalServiceImage",
        skin: "skinServiceImage",
        tattoo: "tattooServiceImage",
        nails: "nailsServiceImage",
        piercing: "piercingServiceImage",
      };
      const fieldName = imageFieldMap[base.id];
      if (fieldName && cmsImages?.[fieldName]) {
        cmsImageUrl = urlForImage(cmsImages[fieldName]).url();
        hotspot = cmsImages[fieldName].hotspot;
      }
    } catch(e) {
      // Graceful fallback if url builder fails
      console.error(e);
    }

    if (hotspot && hotspot.x !== undefined && hotspot.y !== undefined) {
      fallbackPosition = `${hotspot.x * 100}% ${hotspot.y * 100}%`;
    }

    return { ...base, title, cmsImageUrl, objectPosition: fallbackPosition };
  });

  // Track which accordion panel is active (desktop only).
  const [activeId, setActiveId] = useState<string>(mergedServices[0].id);

  // GSAP: Premium Entry Animation
  useGSAP(
    () => {
      const panels = gsap.utils.toArray(".service-panel");
      gsap.from(
        panels as HTMLElement[],
        {
          opacity: 0,
          y: 40,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".panels-container",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          clearProps: "all", // Clears inline styles after animation so they stay fully visible
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-linen"
      id="services"
      aria-label="Our Services"
    >
      <div className="container mx-auto px-6 md:px-16">
        <SectionHeader
          eyebrow="Our Expertise"
          heading={cmsImages?.servicesHeadline ? cmsImages.servicesHeadline.split(" ")[0] : "Curated"}
          headingEmphasis={cmsImages?.servicesHeadline ? cmsImages.servicesHeadline.split(" ").slice(1).join(" ") : "Services"}
          subheading={cmsImages?.servicesSubheadline}
          className="mb-12 md:mb-16"
          action={
            <Link
              href="/services"
              className="font-sans uppercase text-xs tracking-widest text-obsidian border-b border-obsidian pb-0.5 hover:text-roots-orange hover:border-roots-orange transition-colors duration-200"
            >
              View All Services
            </Link>
          }
        />

        {/* ── Mobile: Bento Grid ── */}
        <div className="md:hidden panels-container grid grid-cols-2 gap-3">
          {mergedServices.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="service-panel relative overflow-hidden rounded-lg aspect-[3/4] group"
            >
              {/* Image Layer */}
              <div className="absolute inset-0">
                {service.cmsImageUrl ? (
                  <img 
                    src={service.cmsImageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover" 
                    style={{ objectPosition: service.objectPosition }}
                    loading="lazy"
                  />
                ) : (
                  <ImagePlaceholder
                    label={service.placeholder.label}
                    description={service.placeholder.description}
                    mood={service.dark ? "dark" : "warm"}
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/25 to-transparent" />
              </div>

              {/* Content: F-Pattern — name top-left, tagline + CTA at bottom */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                {/* Top: Number + Name */}
                <div>
                  <span className="font-sans text-parchment/50 text-[10px] uppercase tracking-widest block">
                    {service.number}
                  </span>
                  <h3 className="font-serif text-parchment text-xl mt-1">
                    {service.title}
                  </h3>
                </div>
                
                {/* Bottom: Tagline + Arrow */}
                <div className="flex items-end justify-between">
                  <p className="font-sans text-parchment/70 text-[11px] italic leading-snug max-w-[70%]">
                    {service.tagline}
                  </p>
                  <span className="text-roots-orange text-lg group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Desktop: Accordion ── */}
        <div className="panels-container hidden md:flex gap-3 h-[600px] w-full">
          {mergedServices.map((service) => {
            const isActive = activeId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveId(service.id)}
                onClick={() => setActiveId(service.id)}
                className={`
                  service-panel relative overflow-hidden bg-parchment rounded-sm cursor-pointer
                  transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${isActive ? "flex-[4]" : "flex-[1]"}
                `}
                style={{
                  minWidth: "3rem",
                  transform: "translateZ(0)"
                }}
              >
                {/* Image Layer */}
                <div className="absolute inset-0 overflow-hidden">
                  {service.cmsImageUrl ? (
                    <img 
                      src={service.cmsImageUrl} 
                      alt={service.title} 
                      className="accordion-img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none" 
                      style={{ objectPosition: service.objectPosition }}
                    />
                  ) : (
                    <ImagePlaceholder
                      label={service.placeholder.label}
                      description={service.placeholder.description}
                      mood={service.dark ? "dark" : "warm"}
                      className="accordion-img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
                    />
                  )}
                  
                  {/* Dynamic Darkening Overlay */}
                  <div 
                    className={`absolute inset-0 transition-colors duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isActive ? "bg-obsidian/10" : "bg-obsidian/60"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent pointer-events-none" />
                </div>

                {/* Content Layer — F-Pattern */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10 pointer-events-none">
                  
                  {/* Top: Number + Name */}
                  <div>
                    <span 
                      className={`
                        font-sans text-parchment/60 text-[10px] uppercase tracking-widest block mb-1
                        transition-all duration-500 transform
                        ${isActive ? "translate-y-0 opacity-100 delay-100" : "translate-y-4 opacity-0"}
                      `}
                    >
                      {service.number}
                    </span>
                    <h3 
                      className={`
                        font-serif text-parchment whitespace-nowrap
                        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                        ${isActive ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}
                      `}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Bottom: Tagline + CTA — revealed when active */}
                  <div 
                    className={`
                      flex items-end justify-between
                      transition-all duration-700 ease-in-out
                      ${isActive ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
                    `}
                  >
                    <p className="font-sans text-parchment/70 text-[12px] italic max-w-[60%] leading-snug">
                      {service.tagline}
                    </p>
                    <Link
                      href={service.href}
                      className="text-roots-orange uppercase text-[10px] tracking-widest font-sans flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Discover <span className="text-base">→</span>
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

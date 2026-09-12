"use client";

/**
 * ServicesGrid.tsx — Interactive Service Showcase
 *
 * - Desktop: 6 vertical slices expanding horizontally on hover (accordion).
 * - Mobile: 2×3 bento grid with fixed cards for better touch usability.
 * - F-reading pattern: name at top-left, catchy tagline at bottom, CTA at bottom-right.
 */

import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

import type { SanityServiceCategory, SanityHomePageData } from "@/types/sanity";

// ── CMS-Compatible Service Data ───────────────────────────────────────────────
const SERVICES = [
  {
    id: "hair",
    number: "01",
    title: "Hair",
    tagline: "Where your signature look begins.",
    href: "/services?tab=womens",
    fallbackImage: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80",
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
    fallbackImage: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80",
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
    fallbackImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
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
    fallbackImage: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=80",
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
    fallbackImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
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
    fallbackImage: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80",
    placeholder: {
      label: "Piercing · High-Res Image",
      description: "Ear piercing, modern jewelry.",
    },
    dark: true,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

type ServicesGridProps = {
  cmsServices?: SanityServiceCategory[];
  cmsImages?: Partial<SanityHomePageData>;
};

export default function ServicesGrid({ cmsServices = [], cmsImages = {} }: ServicesGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  
  const mergedServices = useMemo(() => {
    return SERVICES.map((base) => {
      const cmsMatch = cmsServices.find((s) => s.slug === base.id);
      const title = cmsMatch?.title || base.title;

      let cmsImageUrl;
      let fallbackPosition = "center";
      let hotspot;
      
      try {
        // Map base service IDs to the projected URL and hotspot fields
        const urlFieldMap: Record<string, string> = {
          hair: "hairImageUrl",
          bridal: "bridalImageUrl",
          skin: "skinImageUrl",
          tattoo: "tattooImageUrl",
          nails: "nailsImageUrl",
          piercing: "piercingImageUrl",
        };
        const hotspotFieldMap: Record<string, string> = {
          hair: "hairImageHotspot",
          bridal: "bridalImageHotspot",
          skin: "skinImageHotspot",
          tattoo: "tattooImageHotspot",
          nails: "nailsImageHotspot",
          piercing: "piercingImageHotspot",
        };
        
        const urlField = urlFieldMap[base.id];
        const hotspotField = hotspotFieldMap[base.id];

        if (urlField && (cmsImages as Record<string, any>)?.[urlField]) {
          cmsImageUrl = (cmsImages as Record<string, any>)[urlField];
          hotspot = (cmsImages as Record<string, any>)[hotspotField];
        } else {
          cmsImageUrl = (base as any).fallbackImage;
        }
      } catch(e) {
        // Graceful fallback
        cmsImageUrl = (base as any).fallbackImage;
      }

      if (hotspot && hotspot.x !== undefined && hotspot.y !== undefined) {
        fallbackPosition = `${hotspot.x * 100}% ${hotspot.y * 100}%`;
      }

      return { ...base, title, cmsImageUrl, objectPosition: fallbackPosition };
    });
  }, [cmsServices, cmsImages]);

  // Desktop accordion state
  const [activeId, setActiveId] = useState<string>(mergedServices[0].id);

  return (
    <section
      ref={sectionRef}
      className="pt-6 pb-24 md:pt-16 md:pb-32"
      style={{ backgroundColor: "#f7f3ee" }}
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
                <Image
                  src={service.cmsImageUrl || (service as any).fallbackImage}
                  alt={service.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 45vw, 33vw"
                  className="object-cover"
                  style={{ objectPosition: service.objectPosition }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/25 to-transparent" />
              </div>

                {/* Content: F-Pattern — name top-left, action at bottom */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                {/* Top: Number + Name */}
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest block"
                    style={{ color: "rgba(255,253,249,0.45)" }}>
                    {service.number}
                  </span>
                  <h3 className="font-serif text-xl mt-1" style={{ color: "#fffdf9" }}>
                    {service.title}
                  </h3>
                </div>

                {/* Bottom: DISCOVER link */}
                <div className="flex items-end justify-between">
                  <p className="font-sans text-[11px] leading-snug max-w-[65%]"
                    style={{ color: "rgba(255,253,249,0.65)" }}>
                    {service.tagline}
                  </p>
                  <span className="font-sans text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-transform group-hover:translate-x-0.5"
                    style={{ color: "#f0a46c" }}>
                    Discover
                    <span className="text-sm">→</span>
                  </span>
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
                className="service-panel relative overflow-hidden bg-parchment rounded-sm cursor-pointer"
                style={{
                  minWidth: "3.5rem",
                  flex: isActive ? 5 : 1,
                  willChange: "flex",
                  // Spring curve: fast out, soft settle—no rebound
                  transition: "flex 0.28s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                {/* Image Layer */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={service.cmsImageUrl || (service as any).fallbackImage}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="accordion-img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] min-w-[520px] h-full max-w-none object-cover pointer-events-none"
                    style={{ objectPosition: service.objectPosition }}
                  />
                  
                  {/* Overlay: use opacity not transition-colors to stay compositor-only */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: "#17120f",
                      opacity: isActive ? 0.1 : 0.6,
                      transition: "opacity 0.28s ease-out",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent pointer-events-none" />
                </div>

                {/* Content Layer — F-Pattern */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10 pointer-events-none">

                  {/* Top: Number + Name */}
                  <div>
                    <span
                      className="font-sans text-[10px] uppercase tracking-widest block mb-1"
                      style={{
                        color: "rgba(255,253,249,0.50)",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(6px)",
                        transition: "opacity 0.22s ease-out, transform 0.22s ease-out",
                      }}
                    >
                      {service.number}
                    </span>
                    <h3
                      className="font-serif text-2xl md:text-3xl whitespace-nowrap"
                      style={{ color: "#fffdf9" }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Bottom: Tagline + DISCOVER link — revealed when active */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(6px)",
                      transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <p className="font-sans text-[12px] max-w-[60%] leading-snug"
                      style={{ color: "rgba(255,253,249,0.70)" }}>
                      {service.tagline}
                    </p>
                    <Link
                      href={service.href}
                      className="font-sans uppercase text-[10px] tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                      style={{ color: "#f0a46c" }}
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

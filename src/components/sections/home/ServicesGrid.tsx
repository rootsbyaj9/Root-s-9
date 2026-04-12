"use client";

/**
 * ServicesGrid.tsx — Interactive Accordion Gallery
 *
 * A premium, CMS-compatible horizontal/vertical accordion.
 * - Desktop: 4 vertical slices expanding horizontally on hover.
 * - Mobile: 4 horizontal slices expanding vertically on tap.
 */

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SectionHeader from "@/components/ui/SectionHeader";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { urlForImage } from "@/sanity/lib/image";

// ── CMS-Compatible Service Data ───────────────────────────────────────────────
const SERVICES = [
  {
    id: "hair",
    number: "01",
    title: "Hair",
    href: "/services#hair",
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
    href: "/services#bridal",
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
    href: "/services#skin",
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
    href: "/services#tattoo",
    placeholder: {
      label: "Tattoo · High-Res Image",
      description: "Fine-line tattoo. High contrast.",
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
      if (base.id === "hair" && cmsImages?.hairServiceImage) {
        cmsImageUrl = urlForImage(cmsImages.hairServiceImage).url();
        hotspot = cmsImages.hairServiceImage.hotspot;
      } else if (base.id === "bridal" && cmsImages?.bridalServiceImage) {
        cmsImageUrl = urlForImage(cmsImages.bridalServiceImage).url();
        hotspot = cmsImages.bridalServiceImage.hotspot;
      } else if (base.id === "skin" && cmsImages?.skinServiceImage) {
        cmsImageUrl = urlForImage(cmsImages.skinServiceImage).url();
        hotspot = cmsImages.skinServiceImage.hotspot;
      } else if (base.id === "tattoo" && cmsImages?.tattooServiceImage) {
        cmsImageUrl = urlForImage(cmsImages.tattooServiceImage).url();
        hotspot = cmsImages.tattooServiceImage.hotspot;
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

  // Track which accordion panel is active. Default to the first one.
  const [activeId, setActiveId] = useState<string>(mergedServices[0].id);

  // GSAP: Premium Entry Animation
  useGSAP(
    () => {
      const panels = gsap.utils.toArray(".service-panel");
      gsap.fromTo(
        panels as HTMLElement[],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".panels-container",
            start: "top 85%",
            toggleActions: "play none none none",
          },
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

        {/* 
          Interactive Accordion Container 
          - Mobile: Column (stacked vertically)
          - Desktop: Row (side by side horizontally)
        */}
        <div className="panels-container flex flex-col md:flex-row gap-2 md:gap-4 h-[70vh] min-h-[500px] md:min-h-[600px] md:h-[600px] w-full">
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
                // Adding a min width/height ensures collapsed state remains clickable and visible
                style={{
                  minHeight: "4rem", 
                  minWidth: "4rem"
                }}
              >
                {/* Image Layer */}
                <div className="absolute inset-0 transition-transform duration-1000 ease-out transform scale-105 group-hover:scale-100">
                  {service.cmsImageUrl ? (
                    <img 
                      src={service.cmsImageUrl} 
                      alt={service.title} 
                      className="absolute inset-0 w-full h-full object-cover" 
                      style={{ objectPosition: service.objectPosition }}
                    />
                  ) : (
                    <ImagePlaceholder
                      label={service.placeholder.label}
                      description={service.placeholder.description}
                      mood={service.dark ? "dark" : "warm"}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Dynamic Darkening Overlay to focus attention on the active element */}
                  <div 
                    className={`absolute inset-0 transition-colors duration-700 ease-in-out ${
                      isActive ? "bg-obsidian/20" : "bg-obsidian/60"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent pointer-events-none" />
                </div>

                {/* Content Layer */}
                <div className="absolute bottom-0 left-0 w-full h-full p-5 md:p-8 flex flex-col justify-end z-10 pointer-events-none">
                  
                  {/* Number Badge */}
                  <span 
                    className={`
                      font-sans text-parchment/60 text-[10px] uppercase tracking-widest block mb-2
                      transition-all duration-500 transform
                      ${isActive ? "translate-y-0 opacity-100 delay-100" : "translate-y-4 opacity-0"}
                    `}
                  >
                    {service.number}
                  </span>
                  
                  {/* Title (Uses whitespace-nowrap so long titles slide in gracefully out of the overflow clipping) */}
                  <h3 
                    className={`
                      font-serif text-parchment whitespace-nowrap origin-bottom-left md:origin-left
                      transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                      ${isActive ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}
                    `}
                  >
                    {service.title}
                  </h3>

                  {/* Call to action — revealed when active */}
                  <div 
                    className={`
                      overflow-hidden transition-all duration-700 ease-in-out
                      ${isActive ? "max-h-12 opacity-100 mt-4 pointer-events-auto" : "max-h-0 opacity-0 mt-0 pointer-events-none"}
                    `}
                  >
                    <Link
                      href={service.href}
                      className="text-roots-orange uppercase text-[10px] tracking-widest font-sans flex items-center gap-2 hover:gap-3 transition-all inline-flex w-max"
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

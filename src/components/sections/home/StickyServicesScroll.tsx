"use client";

/**
 * StickyServicesScroll.tsx — Ally21 Sticky Scroll Feature Section (Root's Palette)
 *
 * Design tokens strictly mapped to Root's Family Salon design system:
 * - Surfaces: bg-parchment (#fffdf9), bg-linen (#f7f3ee)
 * - Text: text-obsidian (#17120f), text-warm-gray (#8a7d72)
 * - Accents: text-roots-orange (#d96b1f), bg-roots-orange
 * - Borders: border-obsidian/[0.08]
 *
 * Mechanics:
 * - Desktop: Left column natural scroll with heading + 8 service cards.
 *            Right column sticky 100vh image card with smooth crossfade.
 *            Inactive cards dimmed to 30% and subtly blurred (1px).
 * - Mobile:  Top sticky 40vh image container with crossfade.
 *            Text cards slide over with rounded-t-3xl and warm drop-shadow.
 * - Interaction: IntersectionObserver with rootMargin: -20% 0px -20% 0px.
 */

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  cmsKey?: string;
  cmsHotspotKey?: string;
  link?: string;
  objectPositionMobile?: string;
  objectPositionDesktop?: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "haircuts-styling",
    title: "Precision Haircuts & Styling",
    description:
      "Experience the art of precision cutting tailored to your face shape and lifestyle. From classic bobs to trendy layers and men’s grooming, our expert stylists deliver a look that defines you. We finish every cut with a professional blow-dry and styling session.",
    image:
      "https://res.cloudinary.com/dlajlrod8/image/upload/f_auto/q_auto/c_auto,g_auto,w_1200/v1/ally21/services/hair-cut",
    alt: "Precision Haircuts & Styling",
    cmsKey: "scrollHairCutImageUrl",
    cmsHotspotKey: "scrollHairCutHotspot",
    link: "/services?tab=womens",
    objectPositionMobile: "center 68%",
    objectPositionDesktop: "center 25%",
  },
  {
    id: "hair-coloring",
    title: "Expert Hair Coloring & Highlights",
    description:
      "Transform your look with our premium hair coloring services. Whether you want a subtle global color, vibrant fashion shades, or dimension-adding highlights and balayage, we use ammonia-free, damage-free products to ensure your hair stays healthy and shiny.",
    image:
      "https://res.cloudinary.com/dlajlrod8/image/upload/f_auto/q_auto/c_auto,g_auto,w_1200/v1/ally21/services/hair-color",
    alt: "Expert Hair Coloring & Highlights",
    cmsKey: "scrollHairColorImageUrl",
    cmsHotspotKey: "scrollHairColorHotspot",
    link: "/services?tab=womens",
    objectPositionMobile: "center 42%",
    objectPositionDesktop: "center 28%",
  },
  {
    id: "texture-treatments",
    title: "Advanced Texture Treatments",
    description:
      "Tame frizz and restore shine with our signature treatments including Nanoplastia, Keratin, and Botox. Ideal for humid weather, these treatments deeply nourish your hair, making it manageable, smooth, and frizz-free for months.",
    image:
      "https://res.cloudinary.com/dlajlrod8/image/upload/f_auto/q_auto/c_auto,g_auto,w_1200/v1/ally21/services/hair-texture",
    alt: "Advanced Texture Treatments",
    cmsKey: "scrollHairTextureImageUrl",
    cmsHotspotKey: "scrollHairTextureHotspot",
    link: "/services?tab=womens",
    objectPositionMobile: "center 45%",
    objectPositionDesktop: "center 30%",
  },
  {
    id: "nail-services",
    title: "Luxury Nail Extensions & Art",
    description:
      "Flaunt beautiful hands with our gel and acrylic nail extensions. Our nail technicians are artists who specialize in intricate nail art, french tips, and chrome finishes. We adhere to the highest hygiene standards for a safe and stunning experience.",
    image:
      "https://res.cloudinary.com/dlajlrod8/image/upload/f_auto/q_auto/c_auto,g_auto,w_1200/v1/ally21/services/nail-artistry",
    alt: "Luxury Nail Extensions & Art",
    cmsKey: "scrollNailArtImageUrl",
    cmsHotspotKey: "scrollNailArtHotspot",
    link: "/services?tab=womens",
    objectPositionMobile: "center 48%",
    objectPositionDesktop: "center 45%",
  },
  {
    id: "manicure-pedicure",
    title: "Relaxing Manicure & Pedicure",
    description:
      "Treat your hands and feet to the pampering they deserve. Our spa manicure and pedicure sessions include exfoliation, massage, and mask application to rejuvenate tired skin. Perfect for de-stressing after a long week.",
    image:
      "https://res.cloudinary.com/dlajlrod8/image/upload/f_auto/q_auto/c_auto,g_auto,w_1200/v1/ally21/services/pedicure",
    alt: "Relaxing Manicure & Pedicure",
    cmsKey: "scrollPedicureImageUrl",
    cmsHotspotKey: "scrollPedicureHotspot",
    link: "/services?tab=womens",
    objectPositionMobile: "center 50%",
    objectPositionDesktop: "center 50%",
  },
  {
    id: "facials-skincare",
    title: "Premium Facials & Skincare",
    description:
      "Glow from within with our range of international facials. From hydrating cleanup to anti-aging rituals, we customize everyday treatment to your skin type. We use top-tier dermocosmetic brands to target acne, pigmentation, and dullness effectively.",
    image:
      "https://res.cloudinary.com/dlajlrod8/image/upload/f_auto/q_auto/c_auto,g_auto,w_1200/v1/ally21/images/spa-treatment",
    alt: "Premium Facials & Skincare",
    cmsKey: "scrollFacialsImageUrl",
    cmsHotspotKey: "scrollFacialsHotspot",
    link: "/services?tab=womens",
    objectPositionMobile: "center 38%",
    objectPositionDesktop: "center 28%",
  },

  {
    id: "makeup-bridal",
    title: "Elite Bridal & Party Makeup",
    description:
      "Look your absolute best on your special day. Our makeup artists are experts in creating flawless, long-lasting looks for weddings, engagements, and parties. We offer HD and Airbrush makeup trials to help you decide your perfect look.",
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80",
    alt: "Elite Bridal & Party Makeup",
    cmsKey: "scrollBridalImageUrl",
    cmsHotspotKey: "scrollBridalHotspot",
    link: "/services?tab=bridal",
    objectPositionMobile: "center 25%",
    objectPositionDesktop: "center 22%",
  },
];

type Props = {
  cmsImages?: Record<string, any>;
};

export default function StickyServicesScroll({ cmsImages }: Props) {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);

  // ── IntersectionObserver for active service card tracking ───────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SERVICES.forEach((service) => {
      const el = document.getElementById(`service-block-${service.id}`);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveId(service.id);
              }
            });
          },
          {
            rootMargin: "-20% 0px -20% 0px",
            threshold: 0.2,
          }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const getImageSrc = (service: ServiceItem) => {
    if (service.cmsKey && cmsImages?.[service.cmsKey]) {
      return cmsImages[service.cmsKey];
    }
    return service.image;
  };

  const getObjectPosition = (service: ServiceItem, isMobile: boolean) => {
    if (service.cmsHotspotKey && cmsImages?.[service.cmsHotspotKey]) {
      const hs = cmsImages[service.cmsHotspotKey];
      if (hs && typeof hs.x === "number" && typeof hs.y === "number") {
        return `${Math.round(hs.x * 100)}% ${Math.round(hs.y * 100)}%`;
      }
    }
    return isMobile
      ? (service.objectPositionMobile || "center 20%")
      : (service.objectPositionDesktop || "center center");
  };

  return (
    <section className="relative bg-parchment border-t border-obsidian/[0.08]">
      {/* ── MOBILE STICKY TOP IMAGE (lg:hidden) ────────────────────────── */}
      <div className="lg:hidden sticky top-16 z-0 h-[42vh] max-h-[420px] bg-linen overflow-hidden">
        {SERVICES.map((service) => (
          <img
            key={service.id}
            src={getImageSrc(service)}
            alt={service.alt}
            decoding="async"
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out brightness-100 contrast-100",
              activeId === service.id ? "opacity-100" : "opacity-0"
            )}
            style={{ objectPosition: getObjectPosition(service, true) }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-parchment/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ── MAIN CONTENT CONTAINER ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 transition-colors duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Section heading + 7 scrolling text blocks */}
          <div className="flex flex-col lg:gap-24 lg:py-12 -mt-[10vh] lg:mt-0">
            
            {/* Header Block */}
            <div className="mb-8 lg:mb-0 bg-parchment/95 backdrop-blur-sm lg:bg-transparent p-6 lg:p-0 rounded-2xl shadow-sm lg:shadow-none border border-obsidian/[0.08] lg:border-none">
              <span className="block text-xs font-bold tracking-[0.2em] uppercase text-roots-orange mb-4">
                Why Choose Root&apos;s
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-obsidian leading-[1.1]">
                Defining Beauty <br /> Standards in <br />{" "}
                <span className="italic text-warm-gray">Hyderabad.</span>
              </h2>
            </div>

            {/* 7 Service Cards */}
            {SERVICES.map((service) => (
              <div key={service.id} className="relative">
                {/* Mobile spacer: keeps sticky image visible for 30vh before card slides up */}
                <div className="h-[30vh] lg:hidden w-full pointer-events-none" aria-hidden="true" />
                
                {/* Service Card */}
                <div
                  id={`service-block-${service.id}`}
                  className={cn(
                    "transition-all duration-500 py-8 px-6 lg:px-0 bg-parchment rounded-t-3xl lg:rounded-none shadow-[0_-8px_30px_-8px_rgba(23,18,15,0.12)] lg:shadow-none border-t lg:border-t-0 border-obsidian/[0.08]",
                    activeId === service.id
                      ? "opacity-100"
                      : "lg:opacity-30 lg:blur-[1px]"
                  )}
                >
                  <h3 className="font-serif text-3xl md:text-4xl text-obsidian mb-6">
                    {service.title}
                  </h3>
                  <p className="font-sans text-warm-gray leading-relaxed text-base md:text-lg mb-8">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Mobile bottom buffer */}
            <div className="h-[20vh] lg:hidden" />
          </div>

          {/* RIGHT COLUMN: DESKTOP STICKY IMAGE (hidden lg:block) ───────── */}
          <div className="hidden lg:block relative h-[calc(100vh-120px)] sticky top-20 rounded-3xl overflow-hidden bg-linen shadow-2xl border border-obsidian/[0.08]">
            {SERVICES.map((service) => (
              <img
                key={service.id}
                src={getImageSrc(service)}
                alt={service.alt}
                decoding="async"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out brightness-100 contrast-100",
                  activeId === service.id ? "opacity-100" : "opacity-0"
                )}
                style={{ objectPosition: getObjectPosition(service, false) }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 text-parchment z-10">
              <p className="text-xs font-bold tracking-widest uppercase mb-2 bg-obsidian/85 backdrop-blur-md inline-flex items-center px-3.5 py-1.5 rounded-full border border-parchment/15 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-roots-orange mr-2 inline-block" />
                Featured Service
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

/**
 * StickyServicesScroll.tsx — Ally21-Style Scroll Feature
 *
 * Layout:
 *   DESKTOP (md+): Left side scrolling text, Right side sticky 3:4 image.
 *   MOBILE (<md):  Sticky image at top crossfades via IntersectionObserver as text blocks scroll in.
 */

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Link from "next/link";
import type { SanityHomePageData } from "@/types/sanity";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  {
    id: "hair",
    eyebrow: "Hair Masterclass",
    heading: "Precision Cuts &\nColour Artistry",
    body: "From sharp bobs to lived-in balayage — our stylists are trained in the latest techniques, using only damage-free, ammonia-free products so your hair stays healthy and luminous.",
    cta: { label: "Explore Hair", href: "/services?tab=womens" },
    placeholder: {
      label: "Hair Service",
      description: "Close-up of a beautifully styled, glossy hair transformation.",
      aspectRatio: "600 × 800 px · 3:4",
      mood: "warm" as const,
    },
    cmsImageKey: "featuredHairImageUrl",
    cmsAltKey: "featuredHairImageAlt",
  },
  {
    id: "bridal",
    eyebrow: "Bridal Studio",
    heading: "Your Biggest Day,\nMade Flawless",
    body: "Complete bridal packages — HD makeup, elegant updo, manicure, and more — tailored to your look, skin tone, and dream. We've dressed hundreds of Hyderabad brides.",
    cta: { label: "Book Bridal Trial", href: "/services?tab=bridal" },
    placeholder: {
      label: "Bridal Look",
      description: "A radiant bride in full bridal makeup, shot in golden hour lighting.",
      aspectRatio: "600 × 800 px · 3:4",
      mood: "warm" as const,
    },
    cmsImageKey: "featuredBridalImageUrl",
    cmsAltKey: "featuredBridalImageAlt",
  },
  {
    id: "skin",
    eyebrow: "Skin Rituals",
    heading: "Glow That Goes\nSkin-Deep",
    body: "Advanced facials, cleanup treatments, and skin-specific rituals that target your concerns — not just today's glow, but long-term skin health.",
    cta: { label: "Explore Skin", href: "/services?tab=womens" },
    placeholder: {
      label: "Skin Ritual",
      description: "Close-up of glowing, radiant skin after a premium facial treatment.",
      aspectRatio: "600 × 800 px · 3:4",
      mood: "warm" as const,
    },
    cmsImageKey: "featuredSkinImageUrl",
    cmsAltKey: "featuredSkinImageAlt",
  },
  {
    id: "tattoo",
    eyebrow: "Tattoo Artistry",
    heading: "Fine-Line Realism.\nPermanent Art.",
    body: "Our resident tattoo artists specialise in fine-line, geometric, and realism styles. Every piece is unique — inked in a fully sterile, private studio.",
    cta: { label: "View Tattoo Gallery", href: "/services?tab=tattoo" },
    placeholder: {
      label: "Tattoo Art",
      description: "Detailed fine-line tattoo on wrist, high contrast photography.",
      aspectRatio: "600 × 800 px · 3:4",
      mood: "dark" as const,
    },
    cmsImageKey: "featuredTattooImageUrl",
    cmsAltKey: "featuredTattooImageAlt",
  },
];

type Props = { cmsImages?: any };

export default function StickyServicesScroll({ cmsImages }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  // ── Desktop: GSAP ScrollTrigger crossfade ──────────────────────────────────
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const root = sectionRef.current;
        if (!root) return;
        const textBlocks = root.querySelectorAll<HTMLElement>('.desktop-text-block');
        const imageBlocks = root.querySelectorAll<HTMLElement>('.desktop-image-block');

        function activateDesktopIndex(index: number) {
          imageBlocks.forEach((el, i) => {
            gsap.to(el, {
              opacity: i === index ? 1 : 0,
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: true,
            });
          });
        }

        textBlocks.forEach((textEl, i) => {
          ScrollTrigger.create({
            trigger: textEl,
            start: "top center",
            end: "bottom center",
            onEnter: () => activateDesktopIndex(i),
            onEnterBack: () => activateDesktopIndex(i),
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // ── Mobile: IntersectionObserver crossfade ─────────────────────────────────
  // IntersectionObserver is used instead of GSAP ScrollTrigger on mobile because
  // ScrollTrigger mis-measures positions when elements slide under a sticky header.
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    // Only run on mobile
    const mq = window.matchMedia("(max-width: 767px)");
    if (!mq.matches) return;

    const textBlocks = Array.from(root.querySelectorAll<HTMLElement>('.mobile-text-block'));
    const images = Array.from(root.querySelectorAll<HTMLElement>('.mobile-image-block'));
    const dots = Array.from(root.querySelectorAll<HTMLElement>('.mobile-dot'));
    const contents = Array.from(root.querySelectorAll<HTMLElement>('.mobile-text-content'));

    function activate(index: number) {
      images.forEach((el, i) => {
        el.style.transition = 'opacity 0.45s ease';
        el.style.opacity = i === index ? '1' : '0';
      });
      contents.forEach((el, i) => {
        el.style.transition = 'opacity 0.3s ease';
        el.style.opacity = i === index ? '1' : '0.4';
      });
      dots.forEach((el, i) => {
        el.style.transition = 'width 0.3s ease, opacity 0.3s ease';
        el.style.width = i === index ? '18px' : '6px';
        el.style.opacity = i === index ? '1' : '0.5';
      });
    }

    // Threshold 0.5 = fire when 50% of the text block is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = textBlocks.indexOf(entry.target as HTMLElement);
            if (idx !== -1) activate(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    textBlocks.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const getImageUrl = (key: string) => {
    return cmsImages?.[key] || null;
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-parchment w-full overflow-clip"
      aria-label="Featured Services"
      style={{ isolation: "isolate" }}
    >
      {/* ── DESKTOP LAYOUT (Sticky Right) ────────────────────────────── */}
      <div
        className="hidden md:grid pb-32 pt-24 mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "4rem",
          paddingRight: "4rem",
          gridTemplateColumns: "42% 54%",
          columnGap: "4%",
          alignItems: "start", // Critical for sticky right column to work
        }}
      >
        {/* LEFT: Scrolling Text */}
        <div className="flex flex-col w-full">
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={item.id}
              className="desktop-text-block flex flex-col justify-center"
              style={{
                minHeight: "100vh", // Each block takes up full screen height so they trigger cleanly
                paddingTop: i === 0 ? "10vh" : 0,
                paddingBottom: i === HIGHLIGHTS.length - 1 ? "20vh" : 0,
              }}
            >
              <span className="item-eyebrow eyebrow mb-5 block">{item.eyebrow}</span>
              <h3
                className="item-heading font-serif text-obsidian whitespace-pre-line mb-6"
                style={{ fontSize: "clamp(2rem, 3vw, 3.25rem)", lineHeight: 1.1 }}
              >
                {item.heading}
              </h3>
              <p className="item-body font-sans text-warm-gray leading-relaxed mb-8" style={{ fontSize: "1rem", maxWidth: "420px" }}>
                {item.body}
              </p>
              <Link
                href={item.cta.href}
                className="item-cta inline-flex items-center gap-2 font-sans uppercase tracking-[0.08em] text-roots-orange-dark font-medium group/link text-sm"
              >
                {item.cta.label}
                <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* RIGHT: Sticky Image Container */}
        <div
          className="rounded-2xl overflow-hidden relative shadow-2xl"
          style={{
            position: "sticky",
            top: "120px", // Clears the navbar
            aspectRatio: "3 / 4",
            maxHeight: "calc(100vh - 140px)",
            width: "100%",
          }}
        >
          {HIGHLIGHTS.map((item, i) => {
            const rawImage = getImageUrl(item.cmsImageKey);
            return (
              <div
                key={item.id}
                className="desktop-image-block absolute inset-0 w-full h-full"
                style={{ opacity: i === 0 ? 1 : 0 }} // First image visible by default
              >
                <ImagePlaceholder
                  label={item.placeholder.label}
                  description={item.placeholder.description}
                  aspectRatio={item.placeholder.aspectRatio}
                  mood={item.placeholder.mood}
                  imageUrl={rawImage}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent pointer-events-none" />
                <div
                  className="absolute bottom-6 left-6 text-parchment/90 font-sans uppercase rounded-md"
                  style={{
                    background: "rgba(26,16,8,0.9)",
                    fontSize: "0.625rem",
                    letterSpacing: "0.12em",
                    padding: "0.4rem 0.75rem",
                  }}
                >
                  {item.eyebrow}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE LAYOUT (Sticky Image + Scrolling Text) ─────────────── */}
      <div className="md:hidden pb-16 relative">
        {/* Sticky image panel wrapper — pins to top-0 to completely mask text sliding beneath */}
        <div className="sticky top-0 z-20 w-full bg-parchment pt-[80px] pb-6">
          <div
            className="mx-4 rounded-2xl overflow-hidden shadow-lg relative"
            style={{ height: "60vw", minHeight: "260px", maxHeight: "380px" }}
          >
            {HIGHLIGHTS.map((item, i) => {
              const rawImage = getImageUrl(item.cmsImageKey);
              return (
                <div
                  key={item.id}
                  className="mobile-image-block absolute inset-0 w-full h-full"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <ImagePlaceholder
                    label={item.placeholder.label}
                    description={item.placeholder.description}
                    mood={item.placeholder.mood}
                    imageUrl={rawImage}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent pointer-events-none" />
                  <div
                    className="absolute bottom-4 left-4 text-parchment/90 font-sans uppercase rounded-md"
                    style={{
                      background: "rgba(26,16,8,0.9)",
                      fontSize: "0.625rem",
                      letterSpacing: "0.12em",
                      padding: "0.35rem 0.65rem",
                    }}
                  >
                    <span>{item.eyebrow}</span>
                  </div>
                </div>
              );
            })}

            {/* Progress dots */}
            <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
              {HIGHLIGHTS.map((_, i) => (
                <div
                  key={i}
                  className="mobile-dot rounded-full bg-parchment shadow-sm"
                  style={{
                    width: i === 0 ? "18px" : "6px",
                    height: "6px",
                    opacity: i === 0 ? 1 : 0.5,
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Subtle bottom shadow to separate the sticky wrapper from text sliding under it */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-parchment to-transparent translate-y-full z-20" />
        </div>

        {/* Scrolling text blocks — z-10 so they slide behind the z-20 sticky wrapper */}
        <div className="flex flex-col relative z-10 px-2 mt-4">
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={item.id}
              className="mobile-text-block px-6 py-12 border-b border-obsidian/[0.06] last:border-0 bg-parchment"
            >
              <div 
                className="mobile-text-content transition-opacity duration-300" 
                style={{ opacity: i === 0 ? 1 : 0.4 }}
              >
                <span className="eyebrow mb-3 block">{item.eyebrow}</span>
                <h3 className="font-serif text-obsidian leading-[1.15] mb-4" style={{ fontSize: "1.75rem" }}>
                  {item.heading}
                </h3>
                <p className="font-sans text-obsidian/70 leading-relaxed mb-6" style={{ fontSize: "0.9375rem" }}>
                  {item.body}
                </p>
                <Link
                  href={item.cta.href}
                  className="inline-flex items-center gap-2 font-sans uppercase tracking-[0.08em] text-roots-orange font-medium"
                  style={{ fontSize: "0.75rem" }}
                >
                  {item.cta.label} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

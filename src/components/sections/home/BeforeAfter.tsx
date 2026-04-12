"use client";

/**
 * BeforeAfter.tsx — Interactive Drag-to-Compare Slider
 *
 * Support for multiple transformations via tabs (Hair / Skin).
 */

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import SectionHeader from "@/components/ui/SectionHeader";

type TransformationType = "hair" | "skin";

type BeforeAfterProps = {
  homePageData?: any;
};

export default function BeforeAfter({ homePageData = {} }: BeforeAfterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // percentage — 0 to 100
  const [activeTab, setActiveTab] = useState<TransformationType>("hair");
  const isDragging = useRef(false);

  // ── GSAP: section reveal on scroll ───────────────────────────────────────
  useGSAP(
    () => {
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [] }
  );

  // ── Drag / pointer handlers ───────────────────────────────────────────────
  const getPositionFromEvent = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const slider = sliderRef.current;
      if (!slider) return 50;
      const rect = slider.getBoundingClientRect();
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const relative = clientX - rect.left;
      const percent = (relative / rect.width) * 100;
      return Math.min(95, Math.max(5, percent)); // clamp 5–95%
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      isDragging.current = true;
      setPosition(getPositionFromEvent(e));
    },
    [getPositionFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      setPosition(getPositionFromEvent(e));
    },
    [getPositionFromEvent]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTabSwitch = (tab: TransformationType) => {
    setActiveTab(tab);
    setPosition(50); // Reset position when switching
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-parchment"
      aria-label="Before and After transformations"
    >
      {/* Section header — centered */}
      <div className="container mx-auto px-6 md:px-16 mb-10">
        <SectionHeader
          eyebrow="The Root's Difference"
          heading={homePageData?.transformationsHeadline ? homePageData.transformationsHeadline.split(" ")[0] : "Visible"}
          headingEmphasis={homePageData?.transformationsHeadline ? homePageData.transformationsHeadline.split(" ").slice(1).join(" ") : "Transformations"}
          subheading={homePageData?.transformationsSubheadline}
          align="center"
        />
      </div>

      {/* ── Transformation Tabs ────────────────────────────────────────────── */}
      <div className="flex justify-center gap-4 mb-10 px-4">
        <button
          onClick={() => handleTabSwitch("hair")}
          className={`px-6 py-2 rounded-full uppercase tracking-widest text-[11px] font-semibold transition-colors duration-200 ${
            activeTab === "hair"
              ? "bg-obsidian text-parchment"
              : "border border-obsidian/20 text-obsidian hover:border-obsidian"
          }`}
        >
          Hair Styling
        </button>
        <button
          onClick={() => handleTabSwitch("skin")}
          className={`px-6 py-2 rounded-full uppercase tracking-widest text-[11px] font-semibold transition-colors duration-200 ${
            activeTab === "skin"
              ? "bg-obsidian text-parchment"
              : "border border-obsidian/20 text-obsidian hover:border-obsidian"
          }`}
        >
          Skin Services
        </button>
      </div>

      {/* ── Slider container ─────────────────────────────────────────────── */}
      <div
        ref={sliderRef}
        className="w-full max-w-7xl mx-auto px-4 md:px-16 opacity-0"
      >
        <div
          className="relative w-full overflow-hidden select-none touch-none rounded-sm"
          style={{ height: "60vh", minHeight: "320px", maxHeight: "640px" }}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          role="img"
          aria-label={`Before and after ${activeTab} transformation comparison. Drag to compare.`}
        >
          {/* ── AFTER image (full width, visible behind BEFORE) ─────────── */}
          <div className="absolute inset-0">
            {(activeTab === "hair" && homePageData?.beforeAfterHairAfterUrl) || (activeTab === "skin" && homePageData?.beforeAfterSkinAfterUrl) ? (
              <img 
                src={activeTab === "hair" ? homePageData.beforeAfterHairAfterUrl : homePageData.beforeAfterSkinAfterUrl} 
                alt="After Transformation" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            ) : (
              <ImagePlaceholder
                label={activeTab === "hair" ? "HAIR AFTER · 1400×800px" : "SKIN AFTER · 1400×800px"}
                description={
                  activeTab === "hair"
                    ? "Hair styling after. Rich colour, professional lighting."
                    : "Skin treatment after. Clear, glowing, radiant skin."
                }
                mood="dark"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute top-4 right-4 md:top-6 md:right-6">
              <span className="bg-roots-orange text-parchment font-sans leading-none rounded-none text-[10px] uppercase tracking-widest px-3 py-1.5 flex items-center justify-center">
                After
              </span>
            </div>
          </div>

          {/* ── BEFORE image (clips at slider position) ──────────────── */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <div className="relative" style={{ width: `${100 / (position / 100)}%`, height: "100%" }}>
              {(activeTab === "hair" && homePageData?.beforeAfterHairBeforeUrl) || (activeTab === "skin" && homePageData?.beforeAfterSkinBeforeUrl) ? (
                <img 
                  src={activeTab === "hair" ? homePageData.beforeAfterHairBeforeUrl : homePageData.beforeAfterSkinBeforeUrl} 
                  alt="Before Transformation" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              ) : (
                <ImagePlaceholder
                  label={activeTab === "hair" ? "HAIR BEFORE · 1400×800px" : "SKIN BEFORE · 1400×800px"}
                  description={
                    activeTab === "hair"
                      ? "Hair styling before. Natural, slightly flat colour."
                      : "Skin treatment before. Natural, uneven tone."
                  }
                  mood="warm"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
            <div className="absolute top-4 left-4 md:top-6 md:left-6">
              <span className="bg-obsidian text-parchment font-sans leading-none rounded-none text-[10px] uppercase tracking-widest px-3 py-1.5 flex items-center justify-center">
                Before
              </span>
            </div>
          </div>

          {/* ── Orange divider line ───────────────────────────────────── */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-roots-orange z-10 pointer-events-none"
            style={{ left: `${position}%` }}
          />

          {/* ── Drag handle ──────────────────────────────────────────── */}
          <div
            className="absolute top-1/2 z-20 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-roots-orange flex items-center justify-center text-parchment shadow-[0_0_20px_rgba(232,119,34,0.4)] cursor-ew-resize hover:scale-110 transition-transform duration-150"
            style={{ left: `${position}%` }}
            aria-hidden="true"
          >
            <span className="text-sm font-bold select-none">↔</span>
          </div>
        </div>

        {/* CTA below slider */}
        <div className="text-center mt-12">
          <Link href="/transformations" className="btn-outline">
            View Transformation Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

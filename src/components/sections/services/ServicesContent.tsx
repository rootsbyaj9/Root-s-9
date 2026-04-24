"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Scissors, Sparkles, Gem, Crown, Droplet, Palette, Star } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type ServiceCategory = {
  _id: string;
  title: string;
  slug: string;
  gender: "womens" | "mens" | "bridal" | "tattoo" | "both";
  displayOrder?: number;
  imageUrl?: string;
  description?: string;
};

type TabType = "womens" | "mens" | "bridal" | "tattoo";

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ─── URL param sync ───────────────────────────────────────────────────────────
function TabSyncer({ onTab }: { onTab: (t: TabType) => void }) {
  const searchParams = useSearchParams();
  const rawTab = searchParams.get("tab") as TabType;
  useEffect(() => {
    if (rawTab && ["womens", "mens", "bridal", "tattoo"].includes(rawTab)) {
      onTab(rawTab);
    }
  }, [rawTab, onTab]);
  return null;
}

// ─── Category icons (Lucide React) ──────────────────────────────────────────
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "hair-masterclass": <Scissors className="w-12 h-12 text-roots-orange" strokeWidth={1.5} />,
  "skin-rituals": <Sparkles className="w-12 h-12 text-roots-orange" strokeWidth={1.5} />,
  "refinement": <Gem className="w-12 h-12 text-roots-orange" strokeWidth={1.5} />,
  "bridal-studio": <Crown className="w-12 h-12 text-roots-orange" strokeWidth={1.5} />,
  "mens-grooming": <Scissors className="w-12 h-12 text-roots-orange" strokeWidth={1.5} />,
  "mens-skin": <Droplet className="w-12 h-12 text-roots-orange" strokeWidth={1.5} />,
  "tattoo-artistry": <Palette className="w-12 h-12 text-roots-orange" strokeWidth={1.5} />,
};

function CategoryCard({ cat }: { cat: ServiceCategory }) {
  const icon = CATEGORY_ICONS[cat.slug] || <Star className="w-12 h-12 text-roots-orange" strokeWidth={1.5} />;

  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col bg-parchment border border-obsidian/8 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-obsidian/5 hover:border-roots-orange/30 hover:-translate-y-1"
    >
      {/* Image area */}
      {cat.imageUrl ? (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={cat.imageUrl}
            alt={cat.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 to-transparent" />
        </div>
      ) : (
        <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-linen to-[#EDE3D5] flex items-center justify-center overflow-hidden">
          {/* Decorative circle */}
          <div className="absolute w-32 h-32 rounded-full bg-roots-orange/5 -top-8 -right-8" />
          <div className="absolute w-24 h-24 rounded-full bg-roots-orange/5 -bottom-6 -left-6" />
          {/* Icon */}
          <span className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            {icon}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 md:p-7">
        {/* Title */}
        <h3 className="font-serif text-[22px] md:text-[24px] text-obsidian leading-snug">
          {cat.title}
        </h3>

        {/* Description */}
        {cat.description && (
          <p className="font-sans text-[14px] text-obsidian/55 leading-relaxed mt-3 flex-1">
            {cat.description}
          </p>
        )}

        {/* CTA */}
        <button
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent("open-booking-modal"));
          }}
          className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.08em] text-roots-orange font-medium mt-5 transition-colors hover:text-[#C9621E] group/link text-left"
        >
          Book Now
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Tab meta ─────────────────────────────────────────────────────────────────
const TAB_META: Record<
  TabType,
  { label: string; eyebrow: string; heading: string; description: string }
> = {
  womens: {
    label: "Women's Menu",
    eyebrow: "CURATED FOR HER",
    heading: "Women's Menu.",
    description:
      "From essential grooming to complete transformations. Experience personalized care with premium products and expert artistry.",
  },
  mens: {
    label: "Men's Menu",
    eyebrow: "DISTINCTIVE GROOMING",
    heading: "Men's Menu.",
    description:
      "Tailored cuts, precision shaves, and advanced skincare designed specifically for men.",
  },
  bridal: {
    label: "Bridal Studio",
    eyebrow: "THE BIG DAY",
    heading: "Bridal Studio.",
    description:
      "Complete bridal transformations tailored for your special day — from HD makeup to elegant hairstyles and nail art.",
  },
  tattoo: {
    label: "Tattoo Artistry",
    eyebrow: "PERMANENT ART",
    heading: "Tattoo Artistry.",
    description:
      "Fine-line precision. Realism artistry. Permanent marks worth wearing.",
  },
};

import { FALLBACK_CATEGORIES } from "@/lib/fallback-services";

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ServicesContent({
  cmsCategories = [],
}: {
  cmsCategories?: ServiceCategory[];
}) {
  const [activeTab, setActiveTab] = useState<TabType>("womens");
  const meta = TAB_META[activeTab];

  const router = useRouter();

  // Use CMS data if available, otherwise fallback
  const dataToUse =
    cmsCategories.length > 0 ? cmsCategories : FALLBACK_CATEGORIES;

  const filtered = dataToUse.filter(
    (c) => c.gender === activeTab || c.gender === "both"
  );

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`, { scroll: false });
  };

  return (
    <>
      {/* URL → tab sync */}
      <Suspense fallback={null}>
        <TabSyncer onTab={setActiveTab} />
      </Suspense>

      {/* Tab toggles */}
      <div className="bg-parchment pt-8 pb-12 border-b border-obsidian/10">
        <div className="flex overflow-x-auto scrollbar-hide gap-3 px-6 md:px-16 max-w-[1400px] mx-auto">
          {(Object.keys(TAB_META) as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`inline-flex items-center justify-center font-sans text-[12px] uppercase tracking-[0.05em] px-6 py-[10px] rounded-md transition-colors whitespace-nowrap flex-shrink-0 ${
                activeTab === tab
                  ? "bg-roots-orange text-parchment border border-roots-orange"
                  : "border border-[#E8D4BE] text-obsidian/60 hover:text-obsidian hover:border-obsidian/30"
              }`}
            >
              {TAB_META[tab].label}
            </button>
          ))}
        </div>
      </div>

      {/* Active tab content */}
      <section className="py-16 md:py-24 bg-parchment">
        <div className="container mx-auto px-6 md:px-16 max-w-[1400px]">
          {/* Section header */}
          <div className="mb-12 md:mb-16 text-center md:text-left">
            <span className="eyebrow">{meta.eyebrow}</span>
            <h2 className="font-serif text-[40px] md:text-[52px] text-obsidian mt-2">
              {meta.heading}
            </h2>
            <p className="font-sans text-[16px] text-obsidian/55 max-w-[560px] mt-4 mx-auto md:mx-0 leading-relaxed">
              {meta.description}
            </p>
          </div>

          {/* Category cards grid */}
          {filtered.length > 0 ? (
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((cat) => (
                <CategoryCard key={cat._id} cat={cat} />
              ))}
            </motion.div>
          ) : (
            <p className="font-sans text-[15px] text-obsidian/40 italic text-center py-20">
              Services coming soon — check back shortly.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

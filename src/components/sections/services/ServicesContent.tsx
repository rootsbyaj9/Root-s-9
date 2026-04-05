"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
type ServiceItem = {
  name: string;
  price?: string;
  description?: string;
  isHighlighted?: boolean;
};

export type ServiceCategory = {
  _id: string;
  title: string;
  slug: string;
  gender: "womens" | "mens" | "bridal" | "tattoo" | "both";
  displayOrder?: number;
  imageUrl?: string;
  items?: ServiceItem[];
};

type TabType = "womens" | "mens" | "bridal" | "tattoo";

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
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

// ─── Single service row ───────────────────────────────────────────────────────
function ServiceRow({ name, price, description, isHighlighted }: ServiceItem) {
  return (
    <div
      className={`flex justify-between items-baseline border-b pb-3 mb-3 gap-4 ${
        isHighlighted ? "border-roots-orange/30" : "border-obsidian/10"
      }`}
    >
      <div className="flex-1">
        <span
          className={`font-sans text-[15px] ${
            isHighlighted ? "text-roots-orange font-medium" : "text-obsidian"
          }`}
        >
          {name}
          {isHighlighted && (
            <span className="ml-2 text-[10px] uppercase tracking-widest text-roots-orange/70">
              ★ Popular
            </span>
          )}
        </span>
        {description && (
          <p className="font-sans text-[12px] text-obsidian/50 mt-0.5">{description}</p>
        )}
      </div>
      {price && (
        <span
          className={`font-sans text-[13px] font-medium whitespace-nowrap ${
            isHighlighted ? "text-roots-orange" : "text-obsidian/70"
          }`}
        >
          {price}
        </span>
      )}
    </div>
  );
}

// ─── Category block ───────────────────────────────────────────────────────────
function CategoryBlock({ cat, index }: { cat: ServiceCategory; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      id={cat.slug}
      className="grid md:grid-cols-2 gap-[64px] items-start mb-24"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Image column */}
      <div className={`${isEven ? "order-1" : "order-1 md:order-2"}`}>
        {cat.imageUrl ? (
          <motion.div variants={fadeUp} className="relative w-full aspect-[3/4] overflow-hidden rounded-md">
            <Image
              src={cat.imageUrl}
              alt={cat.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp}
            className="w-full aspect-[3/4] bg-[#F5EDE0] flex items-center justify-center rounded-md"
          >
            <span className="font-sans text-[13px] uppercase tracking-widest text-obsidian/30">
              {cat.title}
            </span>
          </motion.div>
        )}
      </div>

      {/* Service list column */}
      <div className={`${isEven ? "order-2" : "order-2 md:order-1"}`}>
        <motion.div variants={fadeUp} className="mb-8">
          <span className="font-sans text-[36px] text-obsidian/15 inline-block mr-3">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-[38px] text-obsidian inline-block">{cat.title}</h3>
          <div className="w-full h-px bg-[#E8D4BE] mt-4" />
        </motion.div>

        {cat.items && cat.items.length > 0 ? (
          <motion.div variants={stagger}>
            {cat.items.map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <ServiceRow {...item} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="font-sans text-[14px] text-obsidian/40 italic">
            No services listed yet. Add them in the CMS → ✂️ Services Menu.
          </p>
        )}

        <motion.div variants={fadeUp} className="mt-8">
          <a
            href="https://wa.me/919700744357"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-roots-orange text-parchment font-sans text-[11px] uppercase tracking-[0.08em] px-[28px] py-[14px] rounded-md transition-colors hover:bg-[#C9621E]"
          >
            BOOK THIS SERVICE
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Tab panel ────────────────────────────────────────────────────────────────
function TabPanel({
  tab,
  categories,
  eyebrow,
  heading,
  description,
}: {
  tab: TabType;
  categories: ServiceCategory[];
  eyebrow: string;
  heading: string;
  description: string;
}) {
  const filtered = categories.filter(
    (c) => c.gender === tab || c.gender === "both"
  );

  return (
    <section id={tab} className="py-section md:py-section-md bg-parchment">
      <div className="container mx-auto px-8 md:px-16 max-w-[1400px]">
        {/* Section header */}
        <div className="mb-20 text-center md:text-left">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="font-serif text-[48px] md:text-[56px] text-obsidian">
            {heading}
          </h2>
          <p className="font-sans text-[16px] text-obsidian/60 max-w-[600px] mt-4 mx-auto md:mx-0">
            {description}
          </p>

          {/* Jump links */}
          {filtered.length > 1 && (
            <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
              {filtered.map((cat) => (
                <a
                  key={cat._id}
                  href={`#${cat.slug}`}
                  className="inline-flex items-center justify-center font-sans text-[11px] uppercase tracking-[0.05em] px-4 py-2 border border-roots-orange/30 text-roots-orange bg-roots-orange/5 hover:bg-roots-orange hover:text-parchment rounded-md transition-colors"
                >
                  {cat.title}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Category blocks */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-0">
            {filtered.map((cat, i) => (
              <CategoryBlock key={cat._id} cat={cat} index={i} />
            ))}
          </div>
        ) : (
          <p className="font-sans text-[15px] text-obsidian/40 italic text-center py-20">
            Services coming soon — check back shortly.
          </p>
        )}
      </div>
    </section>
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
  
  // Checking if Sanity actually contains populated items (in case empty categories were created manually)
  const hasPopulatedServices = cmsCategories.some(cat => cat.items && cat.items.length > 0);
  const dataToUse = hasPopulatedServices ? cmsCategories : FALLBACK_CATEGORIES;

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    // Replace URL without scrolling the page so it stays preserved on reload
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
        <div className="container mx-auto px-8 md:px-16 max-w-[1400px] flex flex-wrap gap-4">
          {(Object.keys(TAB_META) as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`inline-flex items-center justify-center font-sans text-[12px] uppercase tracking-[0.05em] px-6 py-[10px] rounded-md transition-colors ${
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
      <TabPanel
        tab={activeTab}
        categories={dataToUse}
        eyebrow={meta.eyebrow}
        heading={meta.heading}
        description={meta.description}
      />
    </>
  );
}

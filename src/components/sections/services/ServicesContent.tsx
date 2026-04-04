"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import WomensServices from "./WomensServices";
import BridalServices from "./BridalServices";
import MensServices from "./MensServices";
import TattooServices from "./TattooServices";

type TabType = "womens" | "mens" | "bridal" | "tattoo";

/**
 * Inner component that reads searchParams — isolated in its own Suspense boundary
 * so the rest of ServicesContent renders immediately without suspending.
 */
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

export default function ServicesContent() {
  const [activeTab, setActiveTab] = useState<TabType>("womens");

  return (
    <>
      {/* Read URL param without suspending the whole component */}
      <Suspense fallback={null}>
        <TabSyncer onTab={setActiveTab} />
      </Suspense>

      {/* Toggles */}
      <div className="bg-parchment pt-8 pb-12 border-b border-obsidian/10">
        <div className="container mx-auto px-8 md:px-16 max-w-[1400px] flex flex-wrap gap-4">
          <button
            onClick={() => setActiveTab("womens")}
            className={`inline-flex items-center justify-center font-sans text-[12px] uppercase tracking-[0.05em] px-6 py-[10px] rounded-md transition-colors ${
              activeTab === "womens"
                ? "bg-roots-orange text-parchment border border-roots-orange"
                : "border border-[#E8D4BE] text-obsidian/60 hover:text-obsidian hover:border-obsidian/30"
            }`}
          >
            Women&apos;s Menu
          </button>

          <button
            onClick={() => setActiveTab("mens")}
            className={`inline-flex items-center justify-center font-sans text-[12px] uppercase tracking-[0.05em] px-6 py-[10px] rounded-md transition-colors ${
              activeTab === "mens"
                ? "bg-roots-orange text-parchment border border-roots-orange"
                : "border border-[#E8D4BE] text-obsidian/60 hover:text-obsidian hover:border-obsidian/30"
            }`}
          >
            Men&apos;s Menu
          </button>

          <button
            onClick={() => setActiveTab("bridal")}
            className={`inline-flex items-center justify-center font-sans text-[12px] uppercase tracking-[0.05em] px-6 py-[10px] rounded-md transition-colors ${
              activeTab === "bridal"
                ? "bg-roots-orange text-parchment border border-roots-orange"
                : "border border-[#E8D4BE] text-obsidian/60 hover:text-obsidian hover:border-obsidian/30"
            }`}
          >
            Bridal Studio
          </button>

          <button
            onClick={() => setActiveTab("tattoo")}
            className={`inline-flex items-center justify-center font-sans text-[12px] uppercase tracking-[0.05em] px-6 py-[10px] rounded-md transition-colors ${
              activeTab === "tattoo"
                ? "bg-roots-orange text-parchment border border-roots-orange"
                : "border border-[#E8D4BE] text-obsidian/60 hover:text-obsidian hover:border-obsidian/30"
            }`}
          >
            Tattoo Artistry
          </button>
        </div>
      </div>

      {/* Conditionally Render Sections */}
      <div>
        {activeTab === "womens" && <WomensServices />}
        {activeTab === "mens" && <MensServices />}
        {activeTab === "bridal" && <BridalServices />}
        {activeTab === "tattoo" && <TattooServices />}
      </div>
    </>
  );
}

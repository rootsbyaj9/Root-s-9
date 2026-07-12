"use client";

/**
 * Header.tsx
 *
 * Manages the OfferStrip + Navbar as a unified fixed header unit.
 *
 * Architecture:
 *   <div fixed top-0 z-50 flex-col [translate]>
 *     <OfferStrip />   (conditional — 40px, bg-roots-orange)
 *     <Navbar />       (transparent → solid on scroll)
 *   </div>
 *
 * Scroll behaviour:
 *   - Entire header slides UP (−100%) when scrolling DOWN
 *   - Entire header slides DOWN (0) when scrolling UP
 *   - Always visible at the top of the page (scrollY ≤ 80)
 *   - Never hides while mobile menu is open (Navbar emits this via a
 *     custom event — see below)
 *
 * State management:
 *   - `stripVisible` — OfferStrip shown/hidden via localStorage
 *   - `hidden`       — header slide state from scroll direction
 */

import { useState, useEffect } from "react";
import OfferStrip from "./OfferStrip";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/sanity";


export default function Header({ settings }: { settings: SiteSettings | null }) {
  const [stripVisible, setStripVisible] = useState(false);
  const [hidden, setHidden]             = useState(false);

  // ── OfferStrip visibility ────────────────────────────────────────────────
  useEffect(() => {
    // Only show the strip when Sanity explicitly enables it
    setStripVisible(settings?.offerBannerEnabled === true);
  }, [settings]);

  // ── Direction-aware scroll detection (Removed as per user request) ───────
  // The header is now always sticky and never hides on scroll down.
  useEffect(() => {
    // Only keeping a simple scroll listener if we need to track if we're at the top,
    // but the actual hiding logic is removed so `hidden` is always false.
    setHidden(false);
  }, []);

  const handleDismiss = () => {
    setStripVisible(false);
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-[9999] flex flex-col",
        "transition-transform duration-[350ms] ease-in-out",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      {stripVisible && <OfferStrip onDismiss={handleDismiss} settings={settings} />}
      <div className="flex-none pt-0 pb-0">
        <Navbar settings={settings} />
      </div>
    </div>
  );
}

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


export default function Header({ settings }: { settings: any }) {
  const [stripVisible, setStripVisible] = useState(false);
  const [hidden, setHidden]             = useState(false);

  // ── OfferStrip visibility ────────────────────────────────────────────────
  useEffect(() => {
    if (settings && settings.offerBannerEnabled === false) {
      setStripVisible(false);
      return;
    }
    setStripVisible(true);
  }, [settings]);

  // ── Direction-aware scroll detection ─────────────────────────────────────
  useEffect(() => {
    const THRESHOLD  = 80;  // px — below this, always show
    const HIDE_DELTA = 8;   // min px movement to trigger hide/show

    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta    = currentY - lastY;

      if (currentY <= THRESHOLD) {
        // At the top — always show
        setHidden(false);
      } else if (delta > HIDE_DELTA) {
        // Scrolling DOWN → hide
        setHidden(true);
      } else if (delta < -HIDE_DELTA) {
        // Scrolling UP → reveal
        setHidden(false);
      }

      lastY = currentY;
    };

    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <Navbar settings={settings} />
    </div>
  );
}

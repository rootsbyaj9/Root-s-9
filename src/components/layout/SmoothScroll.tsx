"use client";

/**
 * SmoothScroll.tsx
 *
 * Lenis smooth scroll provider for Next.js App Router.
 *
 * CRITICAL RULES:
 *   1. `autoRaf: false` — GSAP ticker drives the RAF loop.
 *      Never use autoRaf: true when using GSAP ScrollTrigger.
 *      Running both causes Lenis to tick twice → visible stutter.
 *
 *   2. Lenis + ScrollTrigger SYNC is mandatory.
 *      Without it, ScrollTrigger calculates wrong scroll positions
 *      and all scroll animations fire at incorrect times.
 *
 *   3. gsap.ticker.remove() requires the EXACT same function reference
 *      as gsap.ticker.add(). A new arrow function in cleanup will NOT
 *      remove the listener — causing a memory leak on unmount.
 *      Solution: store the RAF callback in a ref.
 *
 *   4. `data-lenis-prevent` on elements that should not smooth-scroll
 *      (modals, dropdowns, custom scroll containers).
 *
 * Ref: https://lenis.darkroom.engineering/
 */

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "@/lib/gsap-config"; // ensures plugins are registered

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  // Store the RAF callback in a ref so the SAME reference is passed
  // to both gsap.ticker.add() and gsap.ticker.remove()
  const rafCallbackRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    // autoRaf: false — GSAP ticker drives the RAF loop
    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;

    // ── LENIS + GSAP SCROLLTRIGGER SYNC ──────────────────────────
    // Step 1: Notify ScrollTrigger of every Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // Step 2: Store callback reference so we can remove it on cleanup
    rafCallbackRef.current = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Step 3: Drive Lenis via GSAP's ticker (replaces lenis autoRaf)
    gsap.ticker.add(rafCallbackRef.current);

    // Step 4: Disable lag smoothing so GSAP doesn't skip frames
    gsap.ticker.lagSmoothing(0);
    // ─────────────────────────────────────────────────────────────

    return () => {
      // Remove the EXACT same function reference — not a new arrow function
      if (rafCallbackRef.current) {
        gsap.ticker.remove(rafCallbackRef.current);
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

"use client";

import { useEffect, useRef } from "react";
import type LenisType from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisType | null>(null);

  useEffect(() => {
    let lenisInstance: LenisType | null = null;
    // Store ticker fn ref so we can remove the exact same fn on cleanup
    let tickerFn: ((time: number) => void) | null = null;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.innerWidth < 768;

    import("lenis").then((module) => {
      const Lenis = module.default;

      lenisInstance = new Lenis({
        lerp: isMobile ? 0.09 : 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: false, // Allow native touch momentum scroll on mobile
        autoRaf: false, // We drive Lenis via GSAP ticker
      });

      lenisRef.current = lenisInstance;
      (window as any).__lenis = lenisInstance;

      // ── Single RAF loop: hand Lenis off to GSAP's ticker ──────────────
      tickerFn = (time: number) => lenisInstance?.raf(time * 1000);
      gsap.ticker.add(tickerFn);

      // Default lagSmoothing prevents animation teleporting/jerking during heavy image decodes
      gsap.ticker.lagSmoothing(500, 33);

      // Sync Lenis scroll position → GSAP ScrollTrigger
      lenisInstance.on("scroll", ScrollTrigger.update);

      // Refresh ScrollTrigger as images load to prevent layout-shift jitter
      const doRefresh = () => {
        ScrollTrigger.refresh();
      };

      if (document.readyState === "complete") {
        doRefresh();
      } else {
        window.addEventListener("load", doRefresh, { once: true });
      }

      // Re-measure after initial images mount
      const refreshTimeout = setTimeout(doRefresh, 1000);
    });

    return () => {
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (lenisInstance) {
        lenisInstance.destroy();
        (window as any).__lenis = null;
      }
    };
  }, []);

  return <>{children}</>;
}

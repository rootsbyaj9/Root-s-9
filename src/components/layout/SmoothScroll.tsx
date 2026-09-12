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
    let reqId: number;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.innerWidth < 768;

    import("lenis").then((module) => {
      const Lenis = module.default;

      lenisInstance = new Lenis({
        lerp: isMobile ? 0.08 : 0.1,
        smoothWheel: true,
        wheelMultiplier: isMobile ? 1.2 : 1,
        // syncTouch enables Lenis on mobile touch devices for smooth inertia
        syncTouch: isMobile,
        touchMultiplier: isMobile ? 2.0 : 1,
      });

      lenisRef.current = lenisInstance;
      (window as any).__lenis = lenisInstance;

      // Sync Lenis scroll position → GSAP ScrollTrigger
      lenisInstance.on("scroll", ScrollTrigger.update);

      // Give GSAP's ticker and Lenis's rAF their own breathing room.
      gsap.ticker.lagSmoothing(1000, 16);

      function raf(time: number) {
        lenisInstance?.raf(time);
        reqId = requestAnimationFrame(raf);
      }
      reqId = requestAnimationFrame(raf);

      // Refresh after full page load to ensure GSAP knows all heights
      const doRefresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
      if (document.readyState === "complete") {
        doRefresh();
      } else {
        window.addEventListener("load", doRefresh, { once: true });
      }
    });

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
        (window as any).__lenis = null;
      }
      if (reqId) {
        cancelAnimationFrame(reqId);
      }
    };
  }, []);

  return <>{children}</>;
}

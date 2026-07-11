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
    let updateFn: (time: number) => void;

    import("lenis").then((module) => {
      const Lenis = module.default;
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenisInstance;

      // Sync Lenis with GSAP ScrollTrigger
      lenisInstance.on("scroll", ScrollTrigger.update);

      // Sync GSAP's ticker with Lenis' requestAnimationFrame
      updateFn = (time: number) => {
        lenisInstance?.raf(time * 1000); // GSAP sends time in seconds, Lenis needs ms
      };
      
      gsap.ticker.add(updateFn);
      gsap.ticker.lagSmoothing(0); // Prevent GSAP from adjusting time based on lag

      // Delay ScrollTrigger refresh to allow DOM and images to settle, preventing initial scroll jank
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    });

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      if (updateFn) {
        gsap.ticker.remove(updateFn);
      }
    };
  }, []);

  return <>{children}</>;
}

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
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenisInstance;

      // Sync Lenis with GSAP ScrollTrigger
      lenisInstance.on("scroll", ScrollTrigger.update);

      // Sync GSAP's ticker with Lenis' requestAnimationFrame
      updateFn = (time: number) => {
        lenisInstance?.raf(time * 1000);
      };

      gsap.ticker.add(updateFn);

      // Refresh after full page load — never mid-scroll like a setTimeout would
      if (document.readyState === 'complete') {
        ScrollTrigger.refresh();
      } else {
        window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
      }
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

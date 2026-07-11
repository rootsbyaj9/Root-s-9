"use client";

/**
 * ScrollToTop.tsx
 *
 * Scrolls the page to the top on every route change.
 * Works with Lenis smooth scroll by calling window.scrollTo(0,0)
 * which Lenis intercepts and smoothly animates.
 */

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

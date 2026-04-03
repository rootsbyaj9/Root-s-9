/**
 * gsap-config.ts
 *
 * Single registration point for all GSAP plugins.
 * Import this file ONCE in layout.tsx or any top-level client component.
 *
 * Rules (from CLAUDE.md):
 *   — Only animate `transform` and `opacity` — never layout-triggering props
 *   — Use useGSAP() from @gsap/react — never raw useEffect for GSAP
 *   — Always pass { scope: containerRef } to useGSAP to prevent selector leaks
 *   — ScrollTrigger must be synced with Lenis (see SmoothScroll.tsx)
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register all plugins once at module level.
// SplitText is free since Webflow acquired GSAP (May 2025).
gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

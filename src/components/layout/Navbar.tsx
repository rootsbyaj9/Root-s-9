"use client";

/**
 * Navbar.tsx
 *
 * Smart navigation:
 *   - Transparent with parchment text when scrollY < 80 (over hero, homepage only)
 *   - Solid bg-parchment/95 with obsidian text on inner pages or when scrolled
 *   - HIDE on scroll-down (translateY -100%), SHOW on scroll-up — 350ms ease
 *   - Never hides at the top of the page (scrollY < 80)
 *   - Never hides while the mobile menu is open
 *
 * Mobile:
 *   - Hamburger → X on toggle (pure CSS transform, no GSAP)
 *   - Full-screen parchment overlay with centered links
 *
 * CLAUDE.md rules applied:
 *   - 'use client' (scroll + state)
 *   - CSS transitions via className (not GSAP — that's scroll-reveal only)
 *   - usePathname for active link state
 *   - React 19: no forwardRef, ref as regular prop
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// ── Site navigation links ─────────────────────────────────────────────────────
const PRIMARY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Transformations", href: "/transformations" },
  { label: "Locations", href: "/locations" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
];

const SECONDARY_LINKS = [{ label: "Franchise", href: "/franchise" }];

const WHATSAPP_NUMBER = "919550071714";
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false); // past 80px threshold
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // ── Scroll detection — only for bg/text colour, not for hide/show ────────
  // Hide/show is handled by <Header> which wraps this component.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);;

  // ── Close menu on route change ────────────────────────────────────────────
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // ── Lock body scroll when mobile menu is open ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Only the homepage has a dark full-screen hero behind the navbar.
  // Every other page has a light background, so we must ALWAYS show
  // the solid/dark navbar from the very top on inner pages.
  const isHomePage = pathname === "/";

  // isLight drives text colour: dark obsidian text when true, parchment when false
  // → Always solid on inner pages, OR when scrolled, OR mobile menu is open
  const isLight = !isHomePage || scrolled || menuOpen;

  return (
    <>
      {/* ── Main nav bar ───────────────────────────────────────────────────── */}
      <nav
        className={cn(
          "w-full transition-all duration-300 ease-out",
          // Solid bg: always on inner pages, or when scrolled, or when mobile menu is open
          !isHomePage || scrolled || menuOpen
            ? "bg-parchment/95 backdrop-blur-md border-b border-obsidian/[0.06]"
            : "bg-transparent"
        )}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5">

          {/* Logo wordmark — replace with SVG when asset arrives */}
          <Link
            href="/"
            className={cn(
              "font-serif text-xl md:text-2xl tracking-[0.2em] transition-colors duration-300 hover:opacity-70 whitespace-nowrap",
              isLight ? "text-obsidian" : "text-parchment"
            )}
            aria-label="Root's — Home"
          >
            R O O T&apos;S
          </Link>

          {/* ── Desktop links ─────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {PRIMARY_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sans text-[11px] uppercase tracking-widest transition-colors duration-200 relative group",
                    isActive
                      ? "text-roots-orange"
                      : isLight
                      ? "text-obsidian hover:text-roots-orange"
                      : "text-parchment hover:text-roots-orange"
                  )}
                >
                  {link.label}
                  {/* Underline grows from center on hover */}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px bg-roots-orange transition-all duration-200",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}

            {/* Separator */}
            <span
              className={cn(
                "transition-colors duration-300 select-none",
                isLight ? "text-obsidian/20" : "text-parchment/25"
              )}
            >
              |
            </span>

            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-[11px] uppercase tracking-widest transition-colors duration-200",
                  pathname === link.href
                    ? "text-roots-orange"
                    : isLight
                    ? "text-obsidian hover:text-roots-orange"
                    : "text-parchment hover:text-roots-orange"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Book CTA — always roots-orange */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !py-2.5 !px-5 !text-[10px]"
            >
              Book Now
            </a>
          </div>

          {/* ── Mobile hamburger ──────────────────────────────────────────── */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="lg:hidden flex flex-col gap-[5px] w-6 py-1 hover:opacity-70 transition-opacity focus-visible:outline-roots-orange"
          >
            <span
              className={cn(
                "block w-full h-px transition-all duration-300 origin-center",
                isLight ? "bg-obsidian" : "bg-parchment",
                menuOpen && "rotate-45 translate-y-[8.5px]"
              )}
            />
            <span
              className={cn(
                "block w-full h-px transition-all duration-200",
                isLight ? "bg-obsidian" : "bg-parchment",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block w-full h-px transition-all duration-300 origin-center",
                isLight ? "bg-obsidian" : "bg-parchment",
                menuOpen && "-rotate-45 -translate-y-[8.5px]"
              )}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu full-screen overlay ────────────────────────────────── */}
      {/*
       * CSS-only open/close transition — GSAP stagger added in Phase 9.
       * pointer-events-none when closed prevents any accidental clicks.
       */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-parchment flex flex-col items-center justify-center gap-8 transition-all duration-300",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!menuOpen}
        id="mobile-menu"
      >
        {[...PRIMARY_LINKS, ...SECONDARY_LINKS].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "mobile-nav-link font-serif text-4xl text-obsidian hover:text-roots-orange transition-colors duration-200",
              pathname === link.href && "text-roots-orange"
            )}
            tabIndex={menuOpen ? 0 : -1}
          >
            {link.label}
          </Link>
        ))}

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-nav-link btn-primary mt-4"
          tabIndex={menuOpen ? 0 : -1}
        >
          Book via WhatsApp
        </a>
      </div>
    </>
  );
}

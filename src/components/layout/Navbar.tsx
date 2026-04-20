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
 *   - SERVICES Mega Menu on desktop, Slide-in on mobile
 *
 * CLAUDE.md rules applied:
 *   - 'use client' (scroll + state)
 *   - CSS transitions via className
 *   - usePathname for active link state
 *   - React 19: no forwardRef, ref as regular prop
 */

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

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

const SERVICES_SECTIONS = [
  { label: "Women's Menu", href: "/services?tab=womens" },
  { label: "Men's Menu", href: "/services?tab=mens" },
  { label: "Bridal Studio", href: "/services?tab=bridal" },
  { label: "Tattoo Artistry", href: "/services?tab=tattoo" }
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar({ settings }: { settings: any }) {
  const WHATSAPP_NUMBER = settings?.contactWhatsApp || "919700744357";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  
  // Mega menu states
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  
  const pathname = usePathname();
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // ── Scroll & Keyboard event listeners ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      /* Close desktop menu on scroll for UX */
      if (window.scrollY > 150) setDesktopServicesOpen(false);
    };
    onScroll();

    const handleClickOutside = (e: MouseEvent) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(e.target as Node)) {
        setDesktopServicesOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDesktopServicesOpen(false);
        setMobileServicesOpen(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // ── Close menus on route change ───────────────────────────────────────────
  useEffect(() => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
    setDesktopServicesOpen(false);
  }, [pathname]);

  // ── Lock body scroll when any mobile menu is open ────────────────────────
  useEffect(() => {
    document.body.style.overflow = (menuOpen || mobileServicesOpen) ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, mobileServicesOpen]);

  // ── GSAP mobile menu reveal ────────────────────────────────────────────────
  useGSAP(() => {
    if (menuOpen && !mobileServicesOpen) {
      // Animate only Y position — never touch opacity so links stay visible if animation misfires
      gsap.fromTo(
        ".mobile-nav-link",
        { y: 24 },
        { y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, { dependencies: [menuOpen], scope: menuRef });

  const isHomePage = pathname === "/";
  const isLight = !isHomePage || scrolled || menuOpen || desktopServicesOpen;

  return (
    <>
      {/* ── Main nav bar ───────────────────────────────────────────────────── */}
      <nav
        className={cn(
          "w-full transition-all duration-300 ease-out relative z-50",
          (!isHomePage || scrolled || menuOpen || desktopServicesOpen)
            ? "bg-[#FEFCF8]/95 backdrop-blur-md border-b border-[#1A1008]/[0.06]"
            : "bg-transparent"
        )}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-[80px]">

          {/* Logo */}
          <Link
            href="/"
            className="relative flex items-center transition-all duration-500 hover:opacity-85 z-50 group"
            aria-label="Root's — Home"
          >
            <img
              src="/logo-nobg1.svg"
              alt="Root's Family Salon"
              className={cn(
                "h-14 md:h-16 w-auto object-contain transition-opacity duration-500 ease-out",
                isLight ? "opacity-100" : "opacity-0 absolute inset-0"
              )}
            />
            <img
              src="/logo-nobg2.svg"
              alt="Root's Family Salon"
              className={cn(
                "h-14 md:h-16 w-auto object-contain transition-opacity duration-500 ease-out",
                !isLight ? "opacity-100" : "opacity-0 absolute inset-0"
              )}
            />
          </Link>

          {/* ── Desktop links ─────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 h-full">
            {PRIMARY_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href === "/" && pathname === "/");

              if (link.label === "Services") {
                return (
                  <div 
                    key={link.href} 
                    ref={desktopDropdownRef}
                    className="flex flex-col items-center justify-center h-full relative"
                    onMouseEnter={() => setDesktopServicesOpen(true)}
                    onMouseLeave={() => setDesktopServicesOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "font-sans text-[11px] uppercase tracking-widest transition-colors duration-200 relative flex items-center justify-center gap-1",
                        (isActive || desktopServicesOpen)
                          ? "text-[#E87722]"
                          : isLight
                          ? "text-[#1A1008] hover:text-[#E87722]"
                          : "text-[#FEFCF8] hover:text-[#E87722]"
                      )}
                    >
                      {link.label}
                      <span className={cn(
                        "text-[8px] opacity-70 transition-transform duration-200", 
                        desktopServicesOpen ? "rotate-180" : "translate-y-[1px]"
                      )}>▼</span>
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px bg-[#E87722] transition-all duration-200",
                          isActive ? "w-full" : "w-0" // Using custom state for logic
                        )}
                      />
                    </Link>

                    {/* Simple Dropdown */}
                    <div 
                      className={cn(
                        "absolute top-[80px] bg-[#FEFCF8] border-t-2 border-[#E87722] border-x border-b border-[#1A1008]/10 shadow-lg z-40 transition-all duration-200 ease-out w-48 flex flex-col p-2",
                        desktopServicesOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
                      )}
                    >
                      <ul className="flex flex-col w-full">
                        {SERVICES_SECTIONS.map((sub, j) => (
                          <li key={j} className="w-full">
                            <Link 
                              href={sub.href} 
                              className="font-sans text-[11px] uppercase tracking-widest text-[#1A1008] hover:text-[#E87722] transition-colors duration-150 py-3 px-4 block w-full text-left"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sans text-[11px] uppercase tracking-widest transition-colors duration-200 relative group",
                    isActive
                      ? "text-[#E87722]"
                      : isLight
                      ? "text-[#1A1008] hover:text-[#E87722]"
                      : "text-[#FEFCF8] hover:text-[#E87722]"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px bg-[#E87722] transition-all duration-200",
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
                isLight ? "text-[#1A1008]/20" : "text-[#FEFCF8]/25"
              )}
            >
              |
            </span>

            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-[11px] uppercase tracking-widest transition-colors duration-200 relative group",
                  pathname === link.href
                    ? "text-[#E87722]"
                    : isLight
                    ? "text-[#1A1008] hover:text-[#E87722]"
                    : "text-[#FEFCF8] hover:text-[#E87722]"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px bg-[#E87722] transition-all duration-200",
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}

            {/* Book CTA */}
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
            aria-expanded={menuOpen || mobileServicesOpen}
            className="lg:hidden flex flex-col gap-[5px] w-6 py-1 hover:opacity-70 transition-opacity focus-visible:outline-[#E87722] z-50"
          >
            <span
              className={cn(
                "block w-full h-px transition-all duration-300 origin-center",
                isLight ? "bg-[#1A1008]" : "bg-[#FEFCF8]",
                (menuOpen || mobileServicesOpen) && "rotate-45 translate-y-[8.5px]"
              )}
            />
            <span
              className={cn(
                "block w-full h-px transition-all duration-200",
                isLight ? "bg-[#1A1008]" : "bg-[#FEFCF8]",
                (menuOpen || mobileServicesOpen) && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block w-full h-px transition-all duration-300 origin-center",
                isLight ? "bg-[#1A1008]" : "bg-[#FEFCF8]",
                (menuOpen || mobileServicesOpen) && "-rotate-45 -translate-y-[8.5px]"
              )}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay — portalled to document.body so it escapes
           the Header's CSS transform stacking context. Without this,
           position:fixed is clipped to the Header's bounding box. ── */}
      {mounted && createPortal(
        <div
          ref={menuRef}
          className={cn(
            "lg:hidden fixed inset-0 bg-[#FEFCF8] flex flex-col items-center justify-start overflow-y-auto transition-opacity duration-300",
            menuOpen
              ? "opacity-100 pointer-events-auto z-[9998]"
              : "opacity-0 pointer-events-none z-[-1]"
          )}
          aria-hidden={!menuOpen}
          id="mobile-menu"
        >
          <div className="flex flex-col items-center gap-8 w-full pt-28 pb-16">
            {[...PRIMARY_LINKS, ...SECONDARY_LINKS].map((link) => {
              if (link.label === "Services") {
                return (
                  <div key="services" className="mobile-nav-link flex flex-col items-center w-full">
                    <div className="font-serif text-4xl text-[#1A1008] mb-4">
                      {link.label}
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      {SERVICES_SECTIONS.map((sub, j) => (
                        <Link
                          key={j}
                          href={sub.href}
                          onClick={() => setMenuOpen(false)}
                          className="font-sans text-[13px] uppercase tracking-widest text-[#1A1008]/80 hover:text-[#E87722] transition-colors"
                          tabIndex={menuOpen ? 0 : -1}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "mobile-nav-link font-serif text-4xl text-[#1A1008] hover:text-[#E87722] transition-colors duration-200",
                    pathname === link.href && "text-[#E87722]"
                  )}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.label}
                </Link>
              );
            })}

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
        </div>,
        document.body
      )}
    </>
  );
}

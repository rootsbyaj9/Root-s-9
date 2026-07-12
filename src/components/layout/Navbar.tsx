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
import { gsap } from "@/lib/gsap-config";

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

  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  
  // Mega menu states
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  
  const [isOverDark, setIsOverDark] = useState(true);
  const [isTop, setIsTop] = useState(true);
  
  const pathname = usePathname();
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // ── Scroll & Resize listeners ───────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      // Find all dark theme elements globally
      const darkElements = document.querySelectorAll('[data-theme="dark"]');
      let currentlyOverDark = false;
      const logoY = 40; // Approx vertical center of the logo in the viewport

      darkElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= logoY && rect.bottom >= logoY) {
          currentlyOverDark = true;
        }
      });

      // Fallback: If we are at the very top of the homepage, it's guaranteed to be the dark hero
      if (pathname === "/" && window.scrollY < 50) {
        currentlyOverDark = true;
      }

      setIsOverDark(currentlyOverDark);
      setIsTop(window.scrollY < 10);
      
      /* Close desktop menu on scroll for UX */
      if (window.scrollY > 150) setDesktopServicesOpen(false);
    };

    const onResize = () => {
      onScroll(); // Re-evaluate on resize
    };

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
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    
    // Initial check
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [pathname]);

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

  const isLight = !isOverDark || menuOpen || desktopServicesOpen;

  /** Scroll to top when clicking nav link for the current page */
  const handleNavClick = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Header row: logo left, pill nav right ─────────────────────── */}
      <div className="w-full px-4 sm:px-6 py-0 relative z-50 flex items-center justify-between gap-4 pointer-events-none">

        {/* Logo — switches light/dark based on background */}
        <Link
          href="/"
          onClick={() => handleNavClick("/")}
          className="pointer-events-auto relative flex items-center shrink-0 z-50 group"
          aria-label="Root's — Home"
        >
          {/* Logo on dark bg — white+orange text */}
          <img
            src="/logo-nobg2.svg"
            alt="Root's Family Salon"
            width="480"
            height="135"
            className={cn(
              "w-52 md:w-72 h-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:opacity-85",
              isLight ? "opacity-0 absolute" : "opacity-100 relative"
            )}
          />
          {/* Logo on light bg — dark+orange text */}
          <img
            src="/logo-nobg1.svg"
            alt="Root's Family Salon"
            width="480"
            height="135"
            className={cn(
              "w-52 md:w-72 h-auto object-contain drop-shadow-[0_1px_6px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:opacity-85",
              isLight ? "opacity-100 relative" : "opacity-0 absolute"
            )}
          />
        </Link>

        {/* Pill nav */}
        <nav
          className={cn(
            "transition-all duration-300 ease-out rounded-full pointer-events-auto",
            "bg-parchment/95 backdrop-blur-md shadow-lg border border-obsidian/[0.08]"
          )}
          aria-label="Main navigation"
        >
          <div className="flex items-center px-5 md:px-7 h-[64px] gap-4 md:gap-6">

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
                        "font-serif text-[15px] capitalize font-medium transition-colors duration-200 relative flex items-center justify-center gap-1",
                        (isActive || desktopServicesOpen)
                          ? "text-roots-orange"
                          : "text-obsidian hover:text-roots-orange"
                      )}
                    >
                      {link.label}
                      <span className={cn(
                        "text-[8px] opacity-70 transition-transform duration-200", 
                        desktopServicesOpen ? "rotate-180" : "translate-y-[1px]"
                      )}>▼</span>
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px bg-roots-orange transition-all duration-200",
                          isActive ? "w-full" : "w-0" // Using custom state for logic
                        )}
                      />
                    </Link>

                    {/* Simple Dropdown */}
                    <div 
                      className={cn(
                        "absolute top-[80px] bg-parchment border-t-2 border-roots-orange border-x border-b border-obsidian/10 shadow-lg z-40 transition-all duration-200 ease-out w-48 flex flex-col p-2",
                        desktopServicesOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
                      )}
                    >
                      <ul className="flex flex-col w-full">
                        {SERVICES_SECTIONS.map((sub, j) => (
                          <li key={j} className="w-full">
                            <Link 
                              href={sub.href} 
                              className="font-serif text-[14px] capitalize font-medium text-obsidian hover:text-roots-orange transition-colors duration-150 py-3 px-4 block w-full text-left"
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
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "font-serif text-[15px] capitalize font-medium transition-colors duration-200 relative group",
                    isActive
                      ? "text-roots-orange"
                      : "text-obsidian hover:text-roots-orange"
                  )}
                >
                  {link.label}
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
                  "font-serif text-[15px] capitalize font-medium transition-colors duration-200 relative group",
                  pathname === link.href
                    ? "text-roots-orange"
                    : "text-obsidian hover:text-roots-orange"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px bg-roots-orange transition-all duration-200",
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}

            {/* Book CTA */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { tab: 'booking' } }))}
              className="btn-primary !py-2.5 !px-5 !text-[10px]"
            >
              Book Now
            </button>
          </div>

          {/* ── Mobile hamburger ──────────────────────────────────────────── */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen || mobileServicesOpen}
            aria-controls="mobile-menu"
            className="lg:hidden flex flex-col gap-[5px] w-6 py-1 hover:opacity-70 transition-opacity focus-visible:outline-roots-orange z-50"
          >
            <span
              className={cn(
                "block w-full h-px transition-all duration-300 origin-center bg-obsidian",
                (menuOpen || mobileServicesOpen) && "rotate-45 translate-y-[8.5px]"
              )}
            />
            <span
              className={cn(
                "block w-full h-px transition-all duration-200 bg-obsidian",
                (menuOpen || mobileServicesOpen) && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block w-full h-px transition-all duration-300 origin-center bg-obsidian",
                (menuOpen || mobileServicesOpen) && "-rotate-45 -translate-y-[8.5px]"
              )}
            />
          </button>
          </div>
        </nav>
      </div>

      {/* ── Mobile overlay — portalled to document.body so it escapes
           the Header's CSS transform stacking context. Without this,
           position:fixed is clipped to the Header's bounding box. ── */}
      {mounted && createPortal(
        <div
          ref={menuRef}
          className={cn(
            "lg:hidden fixed inset-0 bg-parchment flex flex-col items-center justify-start overflow-y-auto transition-opacity duration-300",
            menuOpen
              ? "opacity-100 pointer-events-auto z-[9998]"
              : "opacity-0 pointer-events-none z-[-1]"
          )}
          aria-hidden={!menuOpen}
          id="mobile-menu"
        >
          <div className="flex flex-col items-center gap-5 w-full pt-32 pb-12">
            {[...PRIMARY_LINKS, ...SECONDARY_LINKS].map((link) => {
              if (link.label === "Services") {
                return (
                  <div key="services" className="mobile-nav-link flex flex-col items-center w-full">
                    <div className="font-serif text-3xl text-obsidian mb-3">
                      {link.label}
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      {SERVICES_SECTIONS.map((sub, j) => (
                        <Link
                          key={j}
                          href={sub.href}
                          onClick={() => setMenuOpen(false)}
                          className="font-sans text-[12px] uppercase tracking-widest text-obsidian/80 hover:text-roots-orange transition-colors"
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
                  onClick={() => { handleNavClick(link.href); setMenuOpen(false); }}
                  className={cn(
                    "mobile-nav-link font-serif text-3xl text-obsidian hover:text-roots-orange transition-colors duration-200",
                    pathname === link.href && "text-roots-orange"
                  )}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.label}
                </Link>
              );
            })}

            <button
              onClick={() => {
                setMenuOpen(false);
                setTimeout(() => window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { tab: 'booking' } })), 300);
              }}
              className="mobile-nav-link btn-primary mt-4"
              tabIndex={menuOpen ? 0 : -1}
            >
              Book Appointment
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

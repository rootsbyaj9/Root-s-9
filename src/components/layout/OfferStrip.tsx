"use client";

/**
 * OfferStrip.tsx
 *
 * Dismissible orange bar pinned at the very top of the page.
 * State is managed by Header.tsx (parent).
 *
 * Rules:
 *   - bg-roots-orange, text-parchment
 *   - Height: exactly 40px (h-10) — Navbar uses this to offset correctly
 *   - Dismiss persists in localStorage (handled by Header.tsx)
 *
 * Content is hardcoded here for now.
 * CMS-ready: replace string with a prop from Sanity (Milestone 3).
 */

const WHATSAPP_NUMBER = "919550071714";

interface OfferStripProps {
  onDismiss: () => void;
}

export default function OfferStrip({ onDismiss }: OfferStripProps) {
  return (
    <div
      className="w-full h-10 bg-roots-orange flex items-center justify-center relative px-12"
      role="banner"
      aria-label="Current promotion"
    >
      <p className="font-sans text-parchment text-[11px] uppercase tracking-[0.12em] text-center leading-none">
        🎉 New Branch Now Open — 20% off all services &nbsp;·&nbsp;
        10% off at Kondapur &amp; Manikonda branches.{" "}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Root%27s!%20I%20saw%20the%20opening%20offer%20and%20want%20to%20book.`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 font-semibold hover:text-parchment/80 transition-colors"
        >
          Book Now →
        </a>
      </p>

      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        aria-label="Dismiss promotion"
        className="absolute right-4 text-parchment/70 hover:text-parchment transition-colors text-xl leading-none flex items-center justify-center w-6 h-6"
      >
        ×
      </button>
    </div>
  );
}

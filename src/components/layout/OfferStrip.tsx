"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

/**
 * OfferStrip.tsx
 *
 * Dismissible orange bar pinned at the very top of the page.
 * Features an infinite scrolling marquee.
 */

interface OfferStripProps {
  onDismiss: () => void;
  settings: any;
}

export default function OfferStrip({ onDismiss, settings }: OfferStripProps) {
  const WHATSAPP_NUMBER = settings?.contactWhatsApp || "919700744357";
  const getText = () => settings?.offerBannerText || "Book via WhatsApp & get 10% off your first visit";

  // We duplicate the offer multiple times so it fills wide screens
  // and allows a mathematically perfect seamless scroll.
  const OFFER_ITEMS = Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className="flex items-center gap-6 shrink-0 pr-6">
      <Star className="w-3 h-3 fill-current text-parchment/80" />
      <span>{getText()}</span>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Root%27s!%20I%20would%20like%20to%20book%20an%20appointment.`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 font-bold hover:text-parchment transition-colors"
      >
        BOOK NOW →
      </a>
    </div>
  ));

  return (
    <div
      className="w-full h-10 bg-roots-orange relative flex items-center overflow-hidden"
      role="banner"
      aria-label="Current promotion"
    >
      <div className="flex whitespace-nowrap overflow-hidden items-center">
        {/* Seamless marquee: animate from 0% to exactly half its width (-50%) */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="font-sans text-parchment text-[11px] uppercase tracking-[0.12em] font-medium flex items-center w-max"
        >
          {OFFER_ITEMS}
          {OFFER_ITEMS}
        </motion.div>
      </div>

      {/* Dismiss button - positioned absolutely on top of the scrolling text */}
      <button
        onClick={onDismiss}
        aria-label="Dismiss promotion"
        className="absolute right-0 top-0 bottom-0 px-4 bg-gradient-to-l from-roots-orange via-roots-orange to-transparent text-parchment/70 hover:text-parchment transition-colors text-xl leading-none flex items-center justify-center pointer-events-auto z-10"
      >
        <span className="bg-roots-orange pl-2 drop-shadow-md">×</span>
      </button>
    </div>
  );
}

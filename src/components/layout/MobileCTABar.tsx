'use client';

/**
 * MobileCTABar.tsx
 *
 * Sticky bottom bar visible ONLY on mobile (md:hidden).
 * Two actions: "Book via WhatsApp" (primary) and "View Services" (outline).
 *
 * Hides when user scrolls near the footer to avoid overlapping.
 * Uses a compact design with glass-morphism for premium feel.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MobileCTABar({ settings }: { settings?: any }) {
  const WHATSAPP_NUMBER = settings?.contactWhatsApp || '919700744357';
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScroll = 0;
    const onScroll = () => {
      const curr = window.scrollY;
      const atBottom = window.innerHeight + curr >= document.body.scrollHeight - 200;
      // Hide at the very bottom (near footer) to avoid overlap
      setVisible(!atBottom);
      lastScroll = curr;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-[9990] bg-parchment/95 backdrop-blur-md border-t border-obsidian/[0.08] px-4 py-3 flex gap-3 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { tab: 'booking' } }))}
        className="flex-1 flex items-center justify-center gap-2 bg-roots-orange text-parchment font-sans text-[11px] font-semibold uppercase tracking-[0.08em] py-3 rounded-md transition-transform active:scale-[0.97]"
      >
        {/* Calendar icon */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        Book Now
      </button>
      <Link
        href="/services"
        className="flex-1 flex items-center justify-center border border-obsidian/20 text-obsidian font-sans text-[11px] font-semibold uppercase tracking-[0.08em] py-3 rounded-md transition-colors active:bg-obsidian/5"
      >
        View Services
      </Link>
    </div>
  );
}

'use client';

/**
 * StepSuccess.tsx — Booking confirmed screen
 */

import { useEffect } from 'react';
import Link from 'next/link';
import type { BookingServiceRecord } from '@/fixtures/types';
import type { BranchRecord } from '@/fixtures/types';

interface Props {
  bookingId: string;
  branch: BranchRecord;
  services: BookingServiceRecord[];
  date: string;
  timeLabel: string;
  customerCalendarUrl: string;
  customerEmail?: string;
}

export default function StepSuccess({
  bookingId,
  branch,
  services,
  date,
  timeLabel,
  customerCalendarUrl,
  customerEmail,
}: Props) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);


  const formattedDate = date
    ? new Date(date + 'T00:00:00+05:30').toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata',
      })
    : '';

  // Build reliable Google Calendar URL (from backend or client fallback)
  const calendarUrl = (() => {
    if (customerCalendarUrl && customerCalendarUrl.trim().length > 0) {
      return customerCalendarUrl;
    }
    try {
      const primaryService = services[0]?.name || 'Salon Appointment';
      const serviceNames = services.map(s => s.name).join(', ') || 'Salon Service';
      const title = `Root's The Family Salon — ${primaryService}`;
      const location = branch?.address?.fullFormatted || `${branch?.name || "Root's"}, Hyderabad`;
      const details = [
        `Booking Ref: ${bookingId}`,
        `Branch: ${branch?.name || ''}`,
        `Services: ${serviceNames}`,
        "Root's The Family Salon — +91 97007 44357",
      ].join('\n');

      let startD: Date;
      if (date) {
        const match = (timeLabel || '').match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (match) {
          let h = parseInt(match[1], 10);
          const m = parseInt(match[2], 10);
          const ampm = match[3].toUpperCase();
          if (ampm === 'PM' && h < 12) h += 12;
          if (ampm === 'AM' && h === 12) h = 0;
          const pad = (n: number) => String(n).padStart(2, '0');
          startD = new Date(`${date}T${pad(h)}:${pad(m)}:00+05:30`);
        } else {
          startD = new Date(`${date}T10:00:00+05:30`);
        }
      } else {
        startD = new Date();
      }

      const endD = new Date(startD.getTime() + 60 * 60 * 1000);
      const toGcal = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace('.000', '');

      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        dates: `${toGcal(startD)}/${toGcal(endD)}`,
        location,
        details,
      });
      return `https://calendar.google.com/calendar/render?${params.toString()}`;
    } catch {
      return 'https://calendar.google.com';
    }
  })();

  return (
    <div className="flex flex-col items-center text-center gap-6 py-2 sm:py-6">
      {/* Success icon — vibrant green tick clearly visible in mobile and desktop */}
      <div className="relative flex items-center justify-center my-1">
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{
            backgroundColor: '#DCFCE7',
            border: '2.5px solid #16A34A',
            boxShadow: '0 8px 24px -4px rgba(22, 163, 74, 0.25)',
          }}
        >
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#16A34A"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2 max-w-sm">
        <p className="eyebrow text-roots-orange">Appointment Requested</p>
        <h1 className="font-serif text-3xl md:text-4xl text-obsidian leading-tight">
          You're all set!
        </h1>
        <p className="font-sans text-sm text-warm-gray leading-relaxed">
          We've received your booking. Our team will call you shortly to confirm availability.
        </p>
      </div>

      {/* Booking card */}
      <div
        className="w-full max-w-sm rounded-2xl p-6 text-left flex flex-col gap-4"
        style={{ backgroundColor: '#f7f3ee', border: '1px solid rgba(23,18,15,0.10)' }}
      >
        {/* Ref */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wide font-sans font-semibold" style={{ color: 'var(--root-muted)' }}>Booking Ref</span>
          <span
            className="font-mono text-sm font-bold px-3 py-1 rounded-lg"
            style={{ backgroundColor: 'rgba(217,107,31,0.12)', color: 'var(--root-orange)' }}
          >
            {bookingId}
          </span>
        </div>

        <div style={{ borderTop: '1px solid rgba(23,18,15,0.08)' }} />

        {/* Branch */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] uppercase tracking-wide font-sans font-semibold" style={{ color: 'var(--root-muted)' }}>Location</span>
          <span className="font-sans text-sm text-obsidian font-medium">{branch.shortName}</span>
          <span className="font-sans text-xs text-warm-gray">{branch.address.area}, {branch.address.city}</span>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wide font-sans font-semibold" style={{ color: 'var(--root-muted)' }}>Services ({services.length})</span>
          {services.map(s => (
            <div key={s.serviceId} className="flex items-center justify-between gap-2 py-0.5">
              <span className="font-sans text-sm text-obsidian">{s.name}</span>
            </div>
          ))}
        </div>

        {/* Date / Time */}
        {formattedDate && (
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] uppercase tracking-wide font-sans font-semibold" style={{ color: 'var(--root-muted)' }}>Preferred Date & Time</span>
            <span className="font-sans text-sm text-obsidian">{formattedDate}</span>
            {timeLabel && <span className="font-sans text-sm text-obsidian">{timeLabel}</span>}
          </div>
        )}

        {/* Status */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ backgroundColor: 'rgba(217,107,31,0.08)' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--root-orange)' }} />
          <span className="font-sans text-xs leading-snug" style={{ color: 'var(--root-orange-dark, #b85a14)' }}>
            Pending confirmation — we'll call you shortly.
          </span>
        </div>
      </div>

      {/* Actions — always present on mobile & desktop */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-xl font-sans text-sm font-semibold text-white bg-roots-orange hover:bg-roots-orange-dark shadow-md active:scale-[0.98] transition-all cursor-pointer text-center"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          <span>Add to Google Calendar</span>
        </a>

        <Link
          href="/"
          className="flex items-center justify-center w-full py-3 px-4 rounded-xl font-sans text-sm font-semibold border border-obsidian/20 text-obsidian hover:bg-obsidian/[0.05] transition-all text-center"
        >
          Back to Home
        </Link>
      </div>

      {/* Contact reassurance */}
      <p className="font-sans text-xs text-warm-gray max-w-xs leading-relaxed">
        Questions? Call us at{' '}
        <a href="tel:+919700744357" className="underline" style={{ color: 'var(--root-orange)' }}>
          +91 97007 44357
        </a>
        . Quote your booking ref.
      </p>
    </div>
  );
}

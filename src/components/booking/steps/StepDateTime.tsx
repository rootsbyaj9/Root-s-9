'use client';

/**
 * StepDateTime.tsx — Step 3: Choose your preferred date and time
 *
 * Calendly-style interactive date and time picker customized for Root's luxury theme:
 * - Interactive monthly calendar with month navigation and past-date protection
 * - 30-minute time slots spanning from 8:00 AM to 10:00 PM
 * - Zero total duration displayed (negative impact avoided per user guideline)
 * - Real-time slot selection with Roots Orange highlighting
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { BranchRecord } from '@/fixtures/types';
import type { BookingServiceRecord } from '@/fixtures/types';

interface Slot {
  time: string;       // '08:00'
  label: string;      // '8:00 AM'
  available: boolean;
}

interface Props {
  branch: BranchRecord;
  selectedServices: BookingServiceRecord[];
  selectedDate: string;
  selectedTime: string;
  onSelect: (date: string, time: string, timeLabel: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

function todayIST(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }); // YYYY-MM-DD
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Fallback generator for 8:00 AM to 10:00 PM slots
function generateSlots8To10(): Slot[] {
  const slots: Slot[] = [];
  const start = 8 * 60;  // 8:00 AM
  const end   = 22 * 60; // 10:00 PM

  for (let mins = start; mins <= end; mins += 30) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    const period = h < 12 ? 'AM' : 'PM';
    const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
    slots.push({
      time: `${pad(h)}:${pad(m)}`,
      label: `${displayH}:${pad(m)} ${period}`,
      available: true,
    });
  }
  return slots;
}

export default function StepDateTime({
  branch,
  selectedServices,
  selectedDate,
  selectedTime,
  onSelect,
  onContinue,
  onBack,
}: Props) {
  const todayStr = todayIST();
  const [date, setDate] = useState(selectedDate || todayStr);
  const [time, setTime] = useState(selectedTime || '');
  const [timeLabel, setTimeLabel] = useState('');
  const [slots, setSlots] = useState<Slot[]>(generateSlots8To10());
  const [loading, setLoading] = useState(false);

  // Month navigation state
  const initialDate = useMemo(() => {
    return date ? new Date(date + 'T00:00:00+05:30') : new Date();
  }, [date]);

  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  // Fetch slots from API (configured 8:00 AM - 10:00 PM)
  const fetchSlots = useCallback(async (d: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        branchId: branch.slug,
        date: d,
        durationMinutes: '30',
      });
      const res = await fetch(`/api/availability?${params}`);
      if (!res.ok) throw new Error('Failed to fetch availability');
      const data = await res.json();
      if (Array.isArray(data.slots) && data.slots.length > 0) {
        setSlots(data.slots);
      } else {
        setSlots(generateSlots8To10());
      }
    } catch {
      setSlots(generateSlots8To10());
    } finally {
      setLoading(false);
    }
  }, [branch.slug]);

  useEffect(() => {
    fetchSlots(date);
  }, [date, fetchSlots]);

  // Calendar calculations
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const calendarDays = useMemo(() => {
    const days: ({ day: number; dateStr: string } | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const pad = (n: number) => String(n).padStart(2, '0');
      const dateStr = `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`;
      days.push({ day: d, dateStr });
    }
    return days;
  }, [viewYear, viewMonth, firstDayOfWeek, daysInMonth]);

  // Can navigate back only if not viewing current month/year
  const isViewingCurrentMonth = useMemo(() => {
    const now = new Date();
    return viewYear === now.getFullYear() && viewMonth === now.getMonth();
  }, [viewYear, viewMonth]);

  const handlePrevMonth = () => {
    if (isViewingCurrentMonth) return;
    if (viewMonth === 0) {
      setViewYear(y => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(y => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const handleDateClick = (dateStr: string) => {
    if (dateStr < todayStr) return;
    setDate(dateStr);
    setTime('');
    setTimeLabel('');
  };

  const handleSlotSelect = (slot: Slot) => {
    setTime(slot.time);
    setTimeLabel(slot.label);
    onSelect(date, slot.time, slot.label);
  };

  const formattedDate = date
    ? new Date(date + 'T00:00:00+05:30').toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Kolkata',
      })
    : '';

  return (
    <div className="flex flex-col gap-6 pb-28 sm:pb-8">
      {/* Top navigation row & Heading */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-2">
          <p className="eyebrow text-roots-orange">Step 3 of 5</p>
          <button
            onClick={onBack}
            className="text-xs font-sans text-warm-gray hover:text-roots-orange transition-colors cursor-pointer flex items-center gap-1"
          >
            ← Back to Services
          </button>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-obsidian leading-tight">
          Choose date and time
        </h1>
        <p className="font-sans text-sm text-warm-gray mt-1.5">
          Booking appointment at <strong className="text-obsidian font-medium">{branch.shortName}</strong>.
        </p>
      </div>

      {/* Main Calendly-style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-5 items-start">
        {/* ── LEFT: Interactive Month Calendar ───────────────────────────── */}
        <div
          className="rounded-2xl p-4 sm:p-5 shadow-sm"
          style={{ backgroundColor: '#fffdf9', border: '1px solid rgba(23,18,15,0.12)' }}
        >
          {/* Calendar Month Header */}
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-obsidian/[0.08]">
            <h2 className="font-serif text-lg sm:text-xl font-medium text-obsidian">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </h2>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={isViewingCurrentMonth}
                className="w-8 h-8 rounded-full flex items-center justify-center text-obsidian/70 hover:text-obsidian hover:bg-obsidian/[0.06] disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Previous month"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="w-8 h-8 rounded-full flex items-center justify-center text-obsidian/70 hover:text-obsidian hover:bg-obsidian/[0.06] transition-colors cursor-pointer"
                aria-label="Next month"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center mb-2">
            {WEEKDAY_NAMES.map(w => (
              <span key={w} className="text-[11px] font-sans font-semibold tracking-wider uppercase text-warm-gray py-1">
                {w}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {calendarDays.map((item, idx) => {
              if (!item) {
                return <div key={`empty-${idx}`} className="h-9 sm:h-10" />;
              }

              const isPast = item.dateStr < todayStr;
              const isToday = item.dateStr === todayStr;
              const isSelected = item.dateStr === date;

              return (
                <button
                  key={item.dateStr}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDateClick(item.dateStr)}
                  className={`h-9 sm:h-10 w-full rounded-full flex flex-col items-center justify-center font-sans text-xs sm:text-sm transition-all relative ${
                    isPast
                      ? 'opacity-25 cursor-not-allowed text-obsidian/40'
                      : isSelected
                        ? 'bg-roots-orange text-white font-bold shadow-sm'
                        : isToday
                          ? 'font-bold text-roots-orange hover:bg-roots-orange/10 cursor-pointer border border-roots-orange/40'
                          : 'text-obsidian hover:bg-roots-orange/10 hover:text-roots-orange cursor-pointer'
                  }`}
                  aria-label={item.dateStr}
                >
                  <span>{item.day}</span>
                  {isToday && !isSelected && (
                    <span className="w-1 h-1 rounded-full bg-roots-orange absolute bottom-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Available Time Slots (8:00 AM to 10:00 PM) ─────────── */}
        <div
          className="rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-3"
          style={{ backgroundColor: '#fffdf9', border: '1px solid rgba(23,18,15,0.12)' }}
        >
          {/* Header showing selected date */}
          <div className="flex flex-col gap-0.5 pb-2 border-b border-obsidian/[0.08]">
            <p className="eyebrow text-roots-orange">Available Slots</p>
            <h2 className="font-serif text-base sm:text-lg text-obsidian font-medium truncate">
              {formattedDate}
            </h2>
            <p className="font-sans text-xs text-warm-gray">
              8:00 AM to 10:00 PM (30 min intervals)
            </p>
          </div>

          {/* Time Slots Container */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-10 rounded-xl animate-pulse bg-obsidian/[0.06]" />
              ))}
            </div>
          ) : (
            <div className="max-h-[380px] overflow-y-auto pr-1 flex flex-col gap-1.5 scrollbar-thin">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {slots.map(slot => {
                  const isSelected = slot.time === time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => handleSlotSelect(slot)}
                      className={`py-2.5 px-3 rounded-xl font-sans text-xs sm:text-sm font-medium transition-all text-center cursor-pointer border ${
                        isSelected
                          ? 'bg-roots-orange text-white font-semibold border-roots-orange shadow-sm'
                          : 'bg-[#f7f3ee] text-obsidian border-obsidian/[0.10] hover:border-roots-orange hover:bg-roots-orange/10 hover:text-roots-orange'
                      }`}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Preference note */}
          <div
            className="rounded-xl p-3 text-xs font-sans leading-relaxed mt-2"
            style={{ backgroundColor: 'rgba(217,107,31,0.08)', color: 'var(--root-orange-dark)' }}
          >
            <span className="font-semibold">Note: </span>
            Your selected slot is a preference. We will confirm availability and call you shortly.
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="fixed sm:static bottom-0 left-0 right-0 z-40 bg-parchment/95 backdrop-blur-md border-t border-obsidian/[0.12] p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:border-0 sm:bg-transparent sm:p-0 flex items-center gap-3 sm:pt-2 shadow-[0_-4px_20px_rgba(23,18,15,0.08)] sm:shadow-none">
        <button
          onClick={onBack}
          className="px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-semibold border border-obsidian/20 text-obsidian hover:bg-obsidian/[0.06] transition-all shrink-0 cursor-pointer"
        >
          ← Back
        </button>
        <button
          onClick={onContinue}
          disabled={!date || !time}
          className="flex-1 min-w-0 py-3 px-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-semibold text-white bg-roots-orange hover:bg-roots-orange-dark shadow-md hover:shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-center truncate"
        >
          Enter Details →
        </button>
      </div>
    </div>
  );
}

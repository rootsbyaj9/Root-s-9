'use client';

/**
 * BookingSummaryPanel.tsx
 *
 * Sticky right-side panel (desktop) showing the user's selected branch,
 * services (without displaying total duration), and date/time.
 * Includes a primary action button so users never have to scroll down to continue.
 */

import type { BookingServiceRecord } from '@/fixtures/types';
import type { BranchRecord } from '@/fixtures/types';

interface Props {
  branch: BranchRecord | null;
  selectedServices: BookingServiceRecord[];
  selectedDate: string;
  selectedTime: string;
  selectedTimeLabel: string;
  onChangeBranch: () => void;
  onChangeServices: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
}

export default function BookingSummaryPanel({
  branch,
  selectedServices,
  selectedDate,
  selectedTime,
  selectedTimeLabel,
  onChangeBranch,
  onChangeServices,
  onContinue,
  continueLabel = 'Continue →',
  continueDisabled = false,
}: Props) {
  const formattedDate = selectedDate
    ? new Date(selectedDate + 'T00:00:00+05:30').toLocaleDateString('en-IN', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata',
      })
    : null;

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5 shadow-sm"
      style={{ backgroundColor: '#f7f3ee', border: '1px solid rgba(23,18,15,0.10)' }}
    >
      <p className="eyebrow text-obsidian/50">Your appointment</p>

      {/* Branch */}
      <div className="flex flex-col gap-1">
        <p className="text-[11px] uppercase tracking-wide font-sans font-semibold" style={{ color: 'var(--root-muted)' }}>
          Location
        </p>
        {branch ? (
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-sans text-sm font-medium text-obsidian">{branch.shortName}</p>
              <p className="font-sans text-xs text-warm-gray leading-relaxed mt-0.5">{branch.address.area}</p>
            </div>
            <button
              onClick={onChangeBranch}
              className="text-[11px] font-sans text-roots-orange hover:text-roots-orange-dark underline-offset-2 hover:underline shrink-0 cursor-pointer"
            >
              Change
            </button>
          </div>
        ) : (
          <p className="font-sans text-sm text-warm-gray italic">Not selected</p>
        )}
      </div>

      {/* Services (without total duration) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-wide font-sans font-semibold" style={{ color: 'var(--root-muted)' }}>
            Selected Services ({selectedServices.length})
          </p>
          {selectedServices.length > 0 && (
            <button
              onClick={onChangeServices}
              className="text-[11px] font-sans text-roots-orange hover:text-roots-orange-dark underline-offset-2 hover:underline cursor-pointer"
            >
              Edit
            </button>
          )}
        </div>
        {selectedServices.length > 0 ? (
          <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1">
            {selectedServices.map(s => (
              <div key={s.serviceId} className="flex items-center justify-between gap-2 py-1 border-b border-obsidian/[0.05] last:border-0">
                <span className="font-sans text-sm text-obsidian leading-snug">{s.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-sans text-sm text-warm-gray italic">None selected</p>
        )}
      </div>

      {/* Date & Time */}
      {(formattedDate || selectedTime) && (
        <div className="flex flex-col gap-1">
          <p className="text-[11px] uppercase tracking-wide font-sans font-semibold" style={{ color: 'var(--root-muted)' }}>
            Date & Time
          </p>
          {formattedDate && <p className="font-sans text-sm text-obsidian">{formattedDate}</p>}
          {selectedTime && <p className="font-sans text-sm text-obsidian">{selectedTimeLabel}</p>}
        </div>
      )}

      {/* Primary Action Button (no scrolling needed on desktop) */}
      {onContinue && (
        <button
          type="button"
          onClick={onContinue}
          disabled={continueDisabled}
          className="btn-primary w-full py-3.5 rounded-xl text-sm uppercase tracking-wide font-semibold shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {continueLabel}
        </button>
      )}

      {/* Preference disclaimer */}
      <div className="rounded-xl p-3 text-xs font-sans leading-relaxed" style={{ backgroundColor: 'rgba(217,107,31,0.08)', color: 'var(--root-orange-dark)' }}>
        Your slot is a preference — we'll call to confirm availability.
      </div>
    </div>
  );
}

'use client';

/**
 * BookingProgress.tsx
 * Step indicator for the multi-step booking flow.
 */

const STEPS = [
  { id: 1, label: 'Location' },
  { id: 2, label: 'Services' },
  { id: 3, label: 'Date & Time' },
  { id: 4, label: 'Details' },
  { id: 5, label: 'Confirm' },
];

export type BookingStep = 'branch' | 'services' | 'datetime' | 'details' | 'success';

const STEP_INDEX: Record<BookingStep, number> = {
  branch:   1,
  services: 2,
  datetime: 3,
  details:  4,
  success:  5,
};

export default function BookingProgress({ currentStep }: { currentStep: BookingStep }) {
  const current = STEP_INDEX[currentStep];

  return (
    <div className="w-full px-4 py-5 bg-parchment border-b border-obsidian/[0.08]">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          {STEPS.map((step, i) => {
            const done    = step.id < current;
            const active  = step.id === current;
            const isLast  = i === STEPS.length - 1;

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                {/* Circle */}
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold font-sans transition-all duration-300"
                    style={{
                      backgroundColor: done
                        ? '#16A34A'
                        : active
                          ? 'var(--root-orange)'
                          : 'rgba(23,18,15,0.08)',
                      color: (done || active) ? '#fffdf9' : 'rgba(23,18,15,0.4)',
                    }}
                  >
                    {done ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : step.id}
                  </div>
                  <span
                    className="text-[10px] font-sans uppercase tracking-wide hidden sm:block"
                    style={{ color: active ? 'var(--root-orange)' : done ? 'var(--root-ink)' : 'var(--root-muted)' }}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div
                    className="flex-1 h-px mx-2 transition-all duration-300"
                    style={{ backgroundColor: done ? 'var(--root-orange)' : 'rgba(23,18,15,0.12)' }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

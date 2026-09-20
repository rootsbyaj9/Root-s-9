'use client';

/**
 * StepBranch.tsx — Step 1: Choose your Roots location
 */

import type { BranchRecord } from '@/fixtures/types';

interface Props {
  branches: BranchRecord[];
  selected: BranchRecord | null;
  onSelect: (branch: BranchRecord) => void;
  onContinue: () => void;
}

export default function StepBranch({ branches, selected, onSelect, onContinue }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div>
        <p className="eyebrow text-roots-orange mb-2">Step 1 of 5</p>
        <h1 className="font-serif text-3xl md:text-4xl text-obsidian leading-tight">
          Choose your Roots location
        </h1>
        <p className="font-sans text-sm text-warm-gray mt-2">
          All three branches offer the same warm Roots experience.
        </p>
      </div>

      {/* Branch cards */}
      <div className="flex flex-col gap-4">
        {branches.map(branch => {
          const isSelected = selected?._id === branch._id || selected?.slug === branch.slug;
          return (
            <button
              key={branch._id || branch.slug}
              type="button"
              onClick={() => onSelect(branch)}
              className="text-left rounded-2xl p-5 transition-all duration-200 group"
              style={{
                border: isSelected
                  ? '2px solid var(--root-orange)'
                  : '1.5px solid rgba(23,18,15,0.12)',
                backgroundColor: isSelected ? 'rgba(217,107,31,0.05)' : '#fffdf9',
                boxShadow: isSelected ? '0 0 0 3px rgba(217,107,31,0.12)' : 'none',
              }}
              aria-pressed={isSelected}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Name + badge */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-sans font-semibold text-base text-obsidian">
                      {branch.shortName}
                    </span>
                    {branch.isSignature && (
                      <span
                        className="text-[10px] uppercase tracking-wider font-sans font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: 'rgba(217,107,31,0.12)', color: 'var(--root-orange)' }}
                      >
                        Signature Branch
                      </span>
                    )}
                    {branch.isNew && (
                      <span
                        className="text-[10px] uppercase tracking-wider font-sans font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: 'rgba(217,107,31,0.12)', color: 'var(--root-orange)' }}
                      >
                        New Branch
                      </span>
                    )}
                  </div>

                  {/* CMS Address */}
                  <p className="font-sans text-xs md:text-sm text-warm-gray mt-2 leading-relaxed">
                    {branch.address.fullFormatted}
                  </p>

                  {/* Hours + map */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: 'var(--root-muted)' }}>
                        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                      </svg>
                      <span className="font-sans text-xs text-warm-gray">{branch.hours}</span>
                    </div>
                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs font-sans hover:underline"
                      style={{ color: 'var(--root-orange)' }}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      Map
                    </a>
                  </div>
                </div>

                {/* Selection indicator */}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all"
                  style={{
                    backgroundColor: isSelected ? 'var(--root-orange)' : 'rgba(23,18,15,0.08)',
                    border: isSelected ? 'none' : '1.5px solid rgba(23,18,15,0.18)',
                  }}
                >
                  {isSelected && (
                    <svg className="w-3.5 h-3.5 text-parchment" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <button
        onClick={onContinue}
        disabled={!selected}
        className="btn-primary w-full py-4 rounded-xl text-sm uppercase tracking-[0.1em] font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue to Services →
      </button>
    </div>
  );
}

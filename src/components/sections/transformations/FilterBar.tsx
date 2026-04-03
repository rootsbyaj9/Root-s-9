/**
 * FilterBar.tsx
 *
 * Sticky horizontal pill filter bar for the Transformations page.
 * Sits just below the navbar and allows filtering the masonry grid by category.
 *
 * Design:
 * - Parchment/linen background, pills in obsidian/parchment
 * - Active pill: roots-orange fill
 * - Smooth transition between states (CSS, 150ms)
 * - Horizontally scrollable on mobile (no wrapping)
 */

'use client';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'hair-color', label: 'Hair Colour' },
  { id: 'balayage', label: 'Balayage' },
  { id: 'cut-style', label: 'Cut & Style' },
  { id: 'skin', label: 'Skin Therapy' },
  { id: 'hydrafacial', label: 'HydraFacial' },
  { id: 'bridal', label: 'Bridal Makeover' },
  { id: 'tattoo', label: 'Tattoo' },
];

interface FilterBarProps {
  active: string;
  onSelect: (id: string) => void;
}

export default function FilterBar({ active, onSelect }: FilterBarProps) {
  return (
    <div className="sticky top-[72px] z-30 bg-parchment/90 backdrop-blur-md border-b border-obsidian/[0.06]">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-${cat.id}`}
                onClick={() => onSelect(cat.id)}
                className={[
                  'flex-shrink-0 px-5 py-2 rounded-full font-sans text-[11px] font-semibold uppercase tracking-[0.1em] transition-all duration-150 cursor-pointer',
                  isActive
                    ? 'bg-roots-orange text-parchment shadow-[0_4px_12px_rgba(232,119,34,0.3)]'
                    : 'bg-linen text-warm-gray hover:bg-obsidian/8 hover:text-obsidian',
                ].join(' ')}
                aria-pressed={isActive}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';

/**
 * StepServices.tsx — Step 2: What would you like to book?
 */

import { useState, useMemo, useRef, useEffect } from 'react';
import { BOOKING_SERVICES, BOOKING_CATEGORIES } from '@/fixtures/booking-services';
import type { BookingServiceRecord } from '@/fixtures/types';
import type { BranchRecord } from '@/fixtures/types';

const AUDIENCES = ['All', 'Women', 'Men', 'Bridal', 'Kids', 'Unisex'] as const;
type AudienceFilter = typeof AUDIENCES[number];

const GROUPS: Record<string, { label: string; categories: string[] }> = {
  hair: {
    label: 'Hair Services',
    categories: [
      'Hair Cut',
      'Hair Colouring',
      'Highlights',
      'Hair Smoothening',
      'Hair Spa',
      'Hair Treatment',
      "Men's Hair Cuts",
      "Men's Oil Head Massage",
      "Men's Hair Colouring",
      "Men's Hair Spa",
      "Men's Hair Straightening",
    ],
  },
  skin: {
    label: 'Skin Rituals',
    categories: [
      'Facials',
      'O3+ Facials & Peels',
      'D Tan',
      'Body Relaxing Massage',
      'Pedicure / Manicure',
      'Waxing',
      "Men's Clean Up",
      "Men's Facials",
      "Men's D.Tan",
      "Men's Manicure",
      "Men's Pedicure",
      "Men's Add-On Mask",
    ],
  },
  refinement: {
    label: 'Refinement',
    categories: [
      'Threading',
      'Waxing',
    ],
  },
  bridal: {
    label: 'Bridal Makeover',
    categories: [
      'Bridal Package',
      "Makeup's",
      'Saree Draping',
      'Hair Styles',
    ],
  },
};

interface Props {
  services?: BookingServiceRecord[];
  branch: BranchRecord;
  selected: BookingServiceRecord[];
  onToggle: (service: BookingServiceRecord) => void;
  onContinue: () => void;
  onBack: () => void;
  initialAudience?: string;
  initialCategory?: string;
  initialGroup?: string;
}

export default function StepServices({
  services = BOOKING_SERVICES,
  branch,
  selected,
  onToggle,
  onContinue,
  onBack,
  initialAudience,
  initialCategory,
  initialGroup,
}: Props) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<string | null>(() => initialGroup || null);
  const [audience, setAudience] = useState<AudienceFilter>(() => {
    if (initialAudience) {
      const match = AUDIENCES.find(a => a.toLowerCase() === initialAudience.toLowerCase());
      if (match) return match;
    }
    return 'All';
  });
  const [category, setCategory] = useState<string>(() => {
    if (!initialCategory) return 'All';
    const initLower = initialCategory.toLowerCase();
    const audLower = (initialAudience || '').toLowerCase();
    if (audLower === 'men') {
      if (initLower.includes('piercing')) return "Men's Ear Piercing";
      if (initLower === 'pedicure') return "Men's Pedicure";
      if (initLower === 'manicure') return "Men's Manicure";
    } else if (audLower === 'women') {
      if (initLower.includes('piercing')) return 'Piercing';
      if (initLower === 'pedicure' || initLower === 'manicure') return 'Pedicure / Manicure';
    }
    return initialCategory;
  });

  const branchServices = useMemo(() => {
    return services.filter(s => {
      if (s.active === false) return false;
      if (s.branchIds && s.branchIds.includes(branch.slug)) return true;
      const isKnownFixture = ['uppal', 'tarnaka', 'yamjal'].includes(branch.slug);
      return !isKnownFixture;
    });
  }, [services, branch.slug]);

  // Dynamic filter per audience
  const audienceServices = useMemo(() => {
    if (audience === 'All') return branchServices;

    if (audience === 'Women') {
      return branchServices.filter(s =>
        s.audience === 'women' ||
        s.audience === 'bridal' ||
        s.category === 'Bridal Package' ||
        s.category === "Makeup's" ||
        s.category === 'Saree Draping' ||
        s.category === 'Hair Styles' ||
        s.serviceId.startsWith('w-br') ||
        s.serviceId.startsWith('w-mk') ||
        s.serviceId.startsWith('w-sd') ||
        s.serviceId.startsWith('w-hs') ||
        (s.audience === 'unisex' && (s.category === 'Tattoo' || s.category === 'Piercing'))
      );
    }

    if (audience === 'Men') {
      return branchServices.filter(s =>
        s.audience === 'men' ||
        (s.audience === 'unisex' && (s.category === 'Tattoo' || s.category === 'Hair Weaving'))
      );
    }

    if (audience === 'Bridal') {
      return branchServices.filter(s =>
        s.audience === 'bridal' ||
        s.category === 'Bridal Package' ||
        s.category === "Makeup's" ||
        s.category === 'Saree Draping' ||
        s.category === 'Hair Styles' ||
        s.serviceId.startsWith('w-br') ||
        s.serviceId.startsWith('w-mk') ||
        s.serviceId.startsWith('w-sd') ||
        s.serviceId.startsWith('w-hs')
      );
    }

    if (audience === 'Kids') {
      return branchServices.filter(s =>
        s.audience === 'kids' ||
        s.category === 'Kids Haircuts' ||
        s.serviceId.includes('kid')
      );
    }

    if (audience === 'Unisex') {
      return branchServices.filter(s => s.audience === 'unisex');
    }

    return branchServices;
  }, [branchServices, audience]);

  // Category pills derived directly from audience-filtered services (scoped by group if present)
  const categories = useMemo(() => {
    const found = new Set<string>();
    for (const s of audienceServices) {
      if (s.category) {
        if (!group || (GROUPS[group] && GROUPS[group].categories.includes(s.category))) {
          found.add(s.category);
        }
      }
    }
    const knownOrdered = BOOKING_CATEGORIES.filter(c => found.has(c));
    const extra = Array.from(found).filter(c => !BOOKING_CATEGORIES.includes(c));
    return ['All', ...knownOrdered, ...extra];
  }, [audienceServices, group]);

  const handleAudienceChange = (newAudience: AudienceFilter) => {
    setAudience(newAudience);
    setGroup(null);
    setCategory('All');
  };

  const filtered = useMemo(() => {
    let list = audienceServices;
    if (group && GROUPS[group]) {
      list = list.filter(s => GROUPS[group].categories.includes(s.category));
    }
    if (category !== 'All') {
      const target = category.toLowerCase();
      list = list.filter(s =>
        s.category?.toLowerCase() === target ||
        s.categorySlug?.toLowerCase() === target ||
        (target === 'piercing' && s.category?.toLowerCase().includes('piercing')) ||
        (target === 'pedicure' && s.category?.toLowerCase().includes('pedicure')) ||
        (target === 'manicure' && s.category?.toLowerCase().includes('manicure'))
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(s =>
        s.name?.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [audienceServices, group, category, query]);

  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const activeCategoryRef = useRef<HTMLButtonElement>(null);
  const audienceScrollRef = useRef<HTMLDivElement>(null);
  const activeAudienceRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeCategoryRef.current) {
      activeCategoryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [category, categories]);

  useEffect(() => {
    if (activeAudienceRef.current) {
      activeAudienceRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [audience]);

  return (
    <div className="flex flex-col gap-6 pb-28 sm:pb-32">
      {/* Top navigation row & Heading */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-2">
          <p className="eyebrow text-roots-orange">Step 2 of 5</p>
          <button
            onClick={onBack}
            className="text-xs font-sans text-warm-gray hover:text-roots-orange transition-colors cursor-pointer flex items-center gap-1"
          >
            ← Change Branch
          </button>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-obsidian leading-tight">
          What would you like to book?
        </h1>
        <p className="font-sans text-sm text-warm-gray mt-1.5">
          Booking at <strong className="text-obsidian font-medium">{branch.shortName}</strong>.
          Add one or more services.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          style={{ color: 'var(--root-muted)' }}
        >
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="search"
          placeholder="Search services…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl font-sans text-sm outline-none transition-all"
          style={{
            backgroundColor: '#f7f3ee',
            border: '1px solid rgba(23,18,15,0.14)',
            color: 'var(--root-ink)',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#f0a46c'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(240,164,108,0.18)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(23,18,15,0.14)'; e.currentTarget.style.boxShadow = 'none'; }}
        />
      </div>

      {/* Audience filter */}
      <div
        ref={audienceScrollRef}
        className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide scroll-smooth"
      >
        {AUDIENCES.map(a => {
          const isActive = audience === a;
          return (
            <button
              key={a}
              ref={isActive ? activeAudienceRef : null}
              onClick={() => handleAudienceChange(a)}
              className="shrink-0 px-3.5 py-1.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wide transition-all"
              style={{
                backgroundColor: isActive ? 'var(--root-orange)' : 'rgba(23,18,15,0.07)',
                color: isActive ? '#fffdf9' : 'var(--root-muted)',
              }}
            >
              {a}
            </button>
          );
        })}
      </div>

      {/* Category filter */}
      <div
        ref={categoryScrollRef}
        className="flex gap-2 items-center overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide scroll-smooth"
      >
        {categories.map(cat => {
          const isActive = category === cat || category.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              ref={isActive ? activeCategoryRef : null}
              onClick={() => setCategory(cat)}
              className="shrink-0 px-3 py-1.5 rounded-lg font-sans text-[11px] font-medium transition-all"
              style={{
                backgroundColor: isActive ? 'var(--root-ink)' : 'rgba(23,18,15,0.06)',
                color: isActive ? '#fffdf9' : 'var(--root-ink)',
                border: isActive ? 'none' : '1px solid rgba(23,18,15,0.10)',
              }}
            >
              {cat}
            </button>
          );
        })}
        {group && (
          <button
            onClick={() => {
              setGroup(null);
              setCategory('All');
            }}
            className="shrink-0 px-3 py-1.5 rounded-lg font-sans text-[11px] font-semibold text-roots-orange border border-roots-orange/30 hover:bg-roots-orange/10 transition-colors"
          >
            + All Categories
          </button>
        )}
      </div>

      {/* Service cards */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-warm-gray font-sans text-sm">
            No services match your search.
          </div>
        ) : (
          filtered.map(service => {
            const isSelected = selected.some(s => s.serviceId === service.serviceId);
            return (
              <div
                key={service.serviceId}
                className="rounded-xl p-4 transition-all duration-200"
                style={{
                  border: isSelected
                    ? '1.5px solid var(--root-orange)'
                    : '1px solid rgba(23,18,15,0.12)',
                  backgroundColor: isSelected ? 'rgba(217,107,31,0.04)' : '#fffdf9',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Tags row */}
                    <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                      <AudienceBadge audience={service.audience} />
                      {service.isAddOn && (
                        <span className="text-[9px] uppercase tracking-wider font-sans px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(23,18,15,0.07)', color: 'var(--root-muted)' }}>
                          Add-on
                        </span>
                      )}
                    </div>
                    <p className="font-sans font-semibold text-sm text-obsidian leading-snug">{service.name}</p>
                    <p className="font-sans text-xs text-warm-gray mt-1 leading-relaxed">{service.description}</p>
                    <p className="font-sans text-xs font-medium mt-2" style={{ color: 'var(--root-muted)' }}>
                      ⏱ {service.durationMinutes} min
                    </p>
                  </div>

                  {/* Add / Remove */}
                  <button
                    onClick={() => onToggle(service)}
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: isSelected ? 'var(--root-orange)' : 'rgba(23,18,15,0.08)',
                      color: isSelected ? '#fffdf9' : 'var(--root-ink)',
                    }}
                    aria-label={isSelected ? `Remove ${service.name}` : `Add ${service.name}`}
                  >
                    {isSelected ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Action Bar — pinned at bottom of viewport across all devices as soon as services are selected */}
      {selected.length > 0 && (
        <aside
          aria-label="Selected services action bar"
          className="fixed bottom-0 inset-x-0 z-50 bg-obsidian/95 backdrop-blur-md text-white border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.35)] animate-in fade-in slide-in-from-bottom-3 duration-200"
          style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            {/* Left: count & chips of selected services */}
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-roots-orange text-white text-xs font-bold font-sans">
                {selected.length}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-xs font-semibold text-white/90">
                  {selected.length} service{selected.length > 1 ? 's' : ''} selected
                </p>
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5 mt-0.5">
                  {selected.map(s => (
                    <span
                      key={s.serviceId}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-sans bg-white/10 text-white/80 shrink-0"
                    >
                      {s.name}
                      <button
                        onClick={(e) => { e.stopPropagation(); onToggle(s); }}
                        className="text-white/40 hover:text-white ml-0.5 cursor-pointer font-semibold"
                        aria-label={`Remove ${s.name}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: CTA to continue immediately */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onContinue}
                className="btn-primary px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-sans text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-lg hover:shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Date & Time</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function AudienceBadge({ audience }: { audience: BookingServiceRecord['audience'] }) {
  const MAP: Record<string, { bg: string; text: string; label: string }> = {
    women:  { bg: 'rgba(219,112,147,0.12)', text: '#c05c7e', label: 'Women' },
    men:    { bg: 'rgba(100,149,237,0.12)', text: '#4169b0', label: 'Men' },
    unisex: { bg: 'rgba(23,18,15,0.08)',    text: 'var(--root-muted)', label: 'Unisex' },
    bridal: { bg: 'rgba(217,107,31,0.12)',  text: 'var(--root-orange)', label: 'Bridal' },
  };
  const style = MAP[audience] ?? MAP.unisex;
  return (
    <span
      className="text-[9px] uppercase tracking-wider font-sans font-semibold px-1.5 py-0.5 rounded"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.label}
    </span>
  );
}

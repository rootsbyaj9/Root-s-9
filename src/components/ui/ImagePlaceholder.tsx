/**
 * ImagePlaceholder.tsx
 *
 * Development placeholder rendered in every image slot.
 * Shows art-direction specs AND exact pixel dimensions so the client knows
 * exactly what photo to provide and at what size.
 *
 * HOW TO REPLACE:
 *   <ImagePlaceholder label="..." className="..." />
 *   → swap for:
 *   <Image src="..." alt="..." fill className="object-cover" />
 *   (wrap in a relative container with the same className)
 *
 * Props:
 *   label       — short label in caps (what type of photo)
 *   description — art direction notes (lighting, mood, angle)
 *   aspectRatio — e.g. "800 × 800 · 1:1" — shown in the placeholder UI
 *   className   — Tailwind size classes (always fills the container)
 *   mood        — "warm" = linen bg | "dark" = obsidian bg
 *   imageUrl    — live CMS URL: renders <Image> instead of placeholder
 */

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImagePlaceholderProps {
  /** Short label shown in caps — what type of photo goes here */
  label: string;
  /** Optional longer description of art direction and specs */
  description?: string;
  /** Human-readable dimensions, e.g. "800 × 800 px · 1:1" */
  aspectRatio?: string;
  /** Tailwind classes controlling the container size (e.g. "aspect-[4/3]", "h-[600px] w-full") */
  className?: string;
  /** warm = linen bg (light sections) | dark = obsidian bg (dark sections) */
  mood?: 'warm' | 'dark';
  /** Optional URL of the image from CMS to replace the placeholder */
  imageUrl?: string | null;
}

export default function ImagePlaceholder({
  label,
  description,
  aspectRatio,
  className,
  mood = 'warm',
  imageUrl,
}: ImagePlaceholderProps) {
  const isWarm = mood === 'warm';

  // ── Live image from CMS ────────────────────────────────────────────────────
  if (imageUrl) {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <Image
          src={imageUrl}
          alt={label || description || ''}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  // ── Development placeholder ────────────────────────────────────────────────
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center gap-2 text-center px-6 select-none',
        isWarm ? 'bg-linen' : 'bg-obsidian',
        className
      )}
      aria-hidden="true"
    >
      {/* Camera icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className={cn('w-7 h-7', isWarm ? 'text-obsidian/25' : 'text-parchment/25')}
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>

      {/* Label */}
      <p className={cn('font-sans text-[10px] uppercase tracking-[0.15em] font-semibold', isWarm ? 'text-obsidian/40' : 'text-parchment/40')}>
        {label}
      </p>

      {/* Aspect ratio / dimensions */}
      {aspectRatio && (
        <p className={cn('font-sans text-[9px] font-medium', isWarm ? 'text-roots-orange/50' : 'text-roots-orange/40')}>
          {aspectRatio}
        </p>
      )}

      {/* Art direction note */}
      {description && (
        <p className={cn('font-sans text-[9px] leading-relaxed max-w-[180px]', isWarm ? 'text-obsidian/25' : 'text-parchment/25')}>
          {description}
        </p>
      )}
    </div>
  );
}


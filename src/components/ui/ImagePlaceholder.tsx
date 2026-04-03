/**
 * ImagePlaceholder.tsx
 *
 * Development placeholder rendered in every image slot.
 * Shows art-direction specs so the client knows exactly what photo to provide.
 *
 * HOW TO REPLACE:
 *   <ImagePlaceholder label="..." className="..." />
 *   → swap for:
 *   <Image src="..." alt="..." fill className="object-cover" />
 *   (wrap in a relative container that has the same className)
 *
 * The className prop controls size — this component always fills it.
 */

import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  /** Short label shown in caps — what type of photo goes here */
  label: string;
  /** Optional longer description of art direction and specs */
  description?: string;
  /** Tailwind classes controlling the container size (e.g. "aspect-[4/3]", "h-[600px] w-full") */
  className?: string;
  /** warm = linen bg (light sections) | dark = obsidian bg (dark sections) */
  mood?: "warm" | "dark";
}

export default function ImagePlaceholder({
  label,
  description,
  className,
  mood = "warm",
}: ImagePlaceholderProps) {
  const isWarm = mood === "warm";

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 text-center px-6 select-none",
        isWarm ? "bg-linen" : "bg-obsidian",
        className
      )}
      aria-hidden="true"
    >
      {/* Camera SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className={cn(
          "w-7 h-7",
          isWarm ? "text-obsidian/25" : "text-parchment/25"
        )}
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>

      {/* Label */}
      <p
        className={cn(
          "font-sans text-[10px] uppercase tracking-[0.15em] font-semibold",
          isWarm ? "text-obsidian/40" : "text-parchment/40"
        )}
      >
        {label}
      </p>

      {/* Description */}
      {description && (
        <p
          className={cn(
            "font-sans text-[9px] leading-relaxed max-w-[180px]",
            isWarm ? "text-obsidian/25" : "text-parchment/25"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

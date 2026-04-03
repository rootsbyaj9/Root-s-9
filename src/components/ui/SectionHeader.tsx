/**
 * SectionHeader.tsx
 *
 * The eyebrow + heading pattern used above EVERY section on every page.
 *
 * Implements the Steal List item #1 (from Salon64):
 *   First word: bold upright Playfair
 *   Second word: italic Playfair on same line
 *   Example: <h2>Curated <em>Services</em></h2>
 *
 * Usage:
 *   <SectionHeader
 *     eyebrow="Our Expertise"
 *     heading="Curated"
 *     headingEmphasis="Services"
 *     align="left"
 *   />
 */

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Eyebrow text shown in orange small-caps above the heading */
  eyebrow: string;
  /** Main heading — bold Playfair */
  heading: string;
  /** Optional italic emphasis appended to heading on the same line */
  headingEmphasis?: string;
  /** Optional subheading paragraph below the heading */
  subheading?: string;
  /** Text alignment */
  align?: "left" | "center";
  /** Override className for the outer wrapper */
  className?: string;
  /** Optional node rendered flush-right of the heading row (e.g. "View All →" link) */
  action?: React.ReactNode;
  /** Override heading tag — defaults to h2 */
  as?: "h1" | "h2" | "h3";
}

export default function SectionHeader({
  eyebrow,
  heading,
  headingEmphasis,
  subheading,
  align = "left",
  className,
  action,
  as: Tag = "h2",
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex gap-4",
        isCentered
          ? "flex-col items-center text-center"
          : "flex-col md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      {/* Left / center block */}
      <div className={cn(isCentered && "flex flex-col items-center")}>
        {/* Eyebrow */}
        <span className="eyebrow">{eyebrow}</span>

        {/* Heading */}
        <Tag
          className={cn(
            "font-serif text-obsidian leading-[1.1]",
            Tag === "h1"
              ? "text-5xl md:text-6xl lg:text-7xl"
              : "text-4xl md:text-5xl"
          )}
        >
          {heading}
          {headingEmphasis && (
            <>
              {" "}
              <em className="italic font-normal text-obsidian/80 not-italic">
                {headingEmphasis}
              </em>
            </>
          )}
        </Tag>

        {/* Subheading */}
        {subheading && (
          <p
            className={cn(
              "mt-4 font-sans text-warm-gray leading-relaxed text-base",
              isCentered ? "max-w-2xl" : "max-w-xl"
            )}
          >
            {subheading}
          </p>
        )}
      </div>

      {/* Optional action — flush right on desktop */}
      {action && !isCentered && (
        <div className="hidden md:block flex-shrink-0">{action}</div>
      )}
    </div>
  );
}

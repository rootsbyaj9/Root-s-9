/**
 * CTASection.tsx
 *
 * The dark obsidian CTA section that appears at the END of every page.
 * Every page ends with a CTA — this is non-negotiable (Law #5 in CLAUDE.md).
 *
 * Conversion endpoint: Opens the booking modal.
 * WhatsApp is still accessible via the persistent floating button.
 */

'use client';

interface CTASectionProps {
  heading?: string;
  subtext?: string;
  ctaLabel?: string;
}

export default function CTASection({
  heading,
  subtext,
  ctaLabel,
}: CTASectionProps) {
  const resolvedHeading  = heading  || "Your Best Look Starts Here.";
  const resolvedSubtext  = subtext  || "Walk in with an idea, walk out with confidence. Our stylists are ready when you are.";
  const resolvedCtaLabel = ctaLabel || "Book Appointment";

  return (
    <section className="py-24 md:py-32 bg-obsidian text-parchment">
      <div className="container mx-auto px-6 md:px-16 flex flex-col items-center text-center max-w-3xl">
        <h2 className="font-serif text-4xl md:text-5xl text-parchment mb-6 leading-[1.15]">
          {resolvedHeading}
        </h2>
        <p className="font-sans text-parchment/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
          {resolvedSubtext}
        </p>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { tab: 'booking' } }))}
          className="btn-primary"
        >
          {resolvedCtaLabel}
        </button>
      </div>
    </section>
  );
}

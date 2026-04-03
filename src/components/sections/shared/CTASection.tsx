/**
 * CTASection.tsx
 *
 * The dark obsidian CTA section that appears at the END of every page.
 * Every page ends with a CTA — this is non-negotiable (Law #5 in CLAUDE.md).
 *
 * Conversion endpoint: WhatsApp click-to-chat.
 * REPLACE the phone number below at launch.
 */

// Replace with the actual WhatsApp Business number before launch
const WHATSAPP_NUMBER = "919700744357";

interface CTASectionProps {
  heading?: string;
  subtext?: string;
  ctaLabel?: string;
}

export default function CTASection({
  heading = "Ready for your transformation?",
  subtext = "Step into the premier salon experience in Hyderabad. Let our experts craft your signature look.",
  ctaLabel = "Book Consultation via WhatsApp",
}: CTASectionProps) {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <section className="py-24 md:py-32 bg-obsidian text-parchment">
      <div className="container mx-auto px-6 md:px-16 flex flex-col items-center text-center max-w-3xl">
        <h2 className="font-serif text-4xl md:text-5xl text-parchment mb-6 leading-[1.15]">
          {heading}
        </h2>
        <p className="font-sans text-parchment/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
          {subtext}
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}

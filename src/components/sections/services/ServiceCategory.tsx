/**
 * ServiceCategory.tsx
 *
 * Reusable component for each service category on the /services page.
 *
 * Layout: 2-col grid — image + price list.
 * Alternates image side per category (left → right → left…).
 *
 * Steal list applied:
 *   #2 – Section numbering (01, 02, 03, 04)
 *   #3 – 0.5px hairline dividers between price rows
 *   #4 – "from ₹X" right-aligned pricing (desire before price)
 */

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { cn } from '@/lib/utils';

export interface ServiceItem {
  name: string;
  price: string;         // e.g. "from ₹299"
  note?: string;         // optional small note like "(per appointment)"
}

export interface ServiceCategoryProps {
  /** Category number — "01", "02", "03", "04" */
  number: string;
  /** Category name — e.g. "Hair Masterclass" */
  name: string;
  /** Short descriptor beneath the name */
  tagline: string;
  /** Price list */
  services: ServiceItem[];
  /** Image placeholder specs */
  imagePlaceholder: {
    label: string;
    description: string;
    mood?: 'warm' | 'dark';
    aspectClass: string; // e.g. "aspect-[4/3]"
  };
  /** Flip layout — image goes right instead of left */
  flip?: boolean;
  /** Special dark-bg treatment for tattoo section */
  darkSection?: boolean;
}

export default function ServiceCategory({
  number,
  name,
  tagline,
  services,
  imagePlaceholder,
  flip = false,
  darkSection = false,
}: ServiceCategoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Image column clip-reveal from bottom edge
      gsap.fromTo(
        '.sc-image',
        { clipPath: 'inset(8% 0 8% 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0% 0)',
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.sc-image',
            start: 'top 80%',
          },
        }
      );

      // Number + name stagger
      gsap.fromTo(
        '.sc-header-el',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.sc-header-el',
            start: 'top 82%',
          },
        }
      );

      // Price rows cascade
      gsap.fromTo(
        '.sc-price-row',
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.sc-price-row',
            start: 'top 84%',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const textCol = (
    <div
      className={cn(
        'flex flex-col justify-center',
        darkSection ? 'text-parchment' : 'text-obsidian'
      )}
    >
      {/* Number badge + name */}
      <div className="sc-header-el mb-1">
        <span
          className={cn(
            'font-sans text-[10px] font-semibold uppercase tracking-[0.2em]',
            darkSection ? 'text-parchment/40' : 'text-warm-gray'
          )}
        >
          {number}
        </span>
      </div>
      <h2
        className={cn(
          'sc-header-el font-serif text-4xl md:text-5xl leading-[1.05] mb-2',
          darkSection ? 'text-parchment' : 'text-obsidian'
        )}
      >
        {name}
      </h2>
      <p
        className={cn(
          'sc-header-el font-sans text-sm mb-10 leading-relaxed',
          darkSection ? 'text-parchment/60' : 'text-warm-gray'
        )}
      >
        {tagline}
      </p>

      {/* Price list */}
      <div className="flex flex-col">
        {services.map((item, i) => (
          <div
            key={i}
            className={cn(
              'sc-price-row flex items-baseline justify-between py-3.5',
              i !== services.length - 1 && 'border-b',
              darkSection
                ? 'border-parchment/10'
                : 'border-obsidian/[0.08]',
            )}
          >
            <div>
              <span
                className={cn(
                  'font-sans text-sm font-medium',
                  darkSection ? 'text-parchment' : 'text-obsidian'
                )}
              >
                {item.name}
              </span>
              {item.note && (
                <span
                  className={cn(
                    'ml-2 font-sans text-[10px]',
                    darkSection ? 'text-parchment/40' : 'text-warm-gray'
                  )}
                >
                  {item.note}
                </span>
              )}
            </div>
            <span
              className={cn(
                'font-sans text-sm font-semibold ml-4 whitespace-nowrap',
                'text-roots-orange'
              )}
            >
              {item.price}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10">
        <a
          href={`https://wa.me/919700744357`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            darkSection ? 'btn-outline-light' : 'btn-primary'
          )}
        >
          Book This Service
        </a>
      </div>
    </div>
  );

  const imageCol = (
    <div
      className={cn(
        'sc-image overflow-hidden rounded-[12px]',
        imagePlaceholder.aspectClass
      )}
    >
      <ImagePlaceholder
        label={imagePlaceholder.label}
        description={imagePlaceholder.description}
        mood={imagePlaceholder.mood ?? (darkSection ? 'dark' : 'warm')}
        className="w-full h-full"
      />
    </div>
  );

  return (
    <div
      ref={sectionRef}
      className={cn(
        'py-20 md:py-28',
        darkSection ? 'bg-obsidian' : 'bg-parchment'
      )}
    >
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center',
          )}
        >
          {flip ? (
            <>
              {textCol}
              {imageCol}
            </>
          ) : (
            <>
              {imageCol}
              {textCol}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

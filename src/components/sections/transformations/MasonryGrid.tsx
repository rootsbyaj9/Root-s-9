/**
 * MasonryGrid.tsx
 *
 * Infinite vertical bento scroll gallery for the Transformations page.
 * 3 columns on desktop, each scrolling at different speeds (some reversed),
 * mirroring the review page's infinite marquee pattern but with image cards.
 *
 * Uses CSS animations for silky performance — no JS scroll handlers.
 */

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { urlForImage } from '@/sanity/lib/image';

interface TransformationItem {
  id: string;
  label: string;
  description: string;
  aspectClass: string;
  mood?: 'warm' | 'dark';
  imageUrl?: string;
  objectPosition?: string;
  title?: string;
}

const ITEMS: TransformationItem[] = [
  {
    id: 't1',
    label: 'SKIN GLOW-UP',
    description: 'Before/after skin collage — glowing result. Square or 3:4 portrait, 600×800px.',
    aspectClass: 'aspect-[3/4]',
    mood: 'warm',
  },
  {
    id: 't2',
    label: 'HAIR COLOUR TRANSFORM',
    description: 'Dramatic hair colour transformation. Before dull → after vibrant. 4:3, 600×450px.',
    aspectClass: 'aspect-[4/3]',
    mood: 'warm',
  },
  {
    id: 't3',
    label: 'BRIDAL FINAL LOOK',
    description: 'Full bridal makeup + hair. Golden celebratory portrait. 2:3 portrait, 600×900px.',
    aspectClass: 'aspect-[2/3]',
    mood: 'warm',
  },
  {
    id: 't4',
    label: 'CUT & STYLE EDITORIAL',
    description: 'Before/after precision cut. Editorial angle, warm tones. 3:4, 600×800px.',
    aspectClass: 'aspect-[3/4]',
    mood: 'warm',
  },
  {
    id: 't5',
    label: 'BALAYAGE CLOSE-UP',
    description: 'Sun-kissed balayage result — hero card. Dimensional, soft, warm. 2:3 tall, 600×900px.',
    aspectClass: 'aspect-[2/3]',
    mood: 'warm',
  },
  {
    id: 't6',
    label: 'HYDRAFACIAL GLOW',
    description: 'HydraFacial result — radiant, dewy skin. Clinical-warm lighting. 4:3, 600×450px.',
    aspectClass: 'aspect-[4/3]',
    mood: 'warm',
  },
  {
    id: 't7',
    label: 'FINE-LINE TATTOO',
    description: 'Fine-line or realism tattoo on arm/wrist. High contrast, dark background. 3:4, 600×800px.',
    aspectClass: 'aspect-[3/4]',
    mood: 'dark',
  },
  {
    id: 't8',
    label: 'KERATIN SMOOTHENING',
    description: 'Before/after hair smoothening. Sleek, frizz-free result. 4:3, 600×450px.',
    aspectClass: 'aspect-[4/3]',
    mood: 'warm',
  },
  {
    id: 't9',
    label: 'BRIDAL PARTY LOOK',
    description: 'Full bridal party — group shot with complete styling. 3:4, 600×800px.',
    aspectClass: 'aspect-[3/4]',
    mood: 'warm',
  },
];

/* ── Single Image Card ──────────────────────── */
function BentoCard({ item }: { item: TransformationItem }) {
  return (
    <div className="group relative overflow-hidden rounded-[8px]">
      <div className={item.aspectClass}>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title || item.label}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ objectPosition: item.objectPosition }}
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder
            label={item.label}
            description={item.description}
            mood={item.mood ?? 'warm'}
            className="w-full h-full"
          />
        )}
      </div>
      {/* Category badge on hover */}
      <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/30 transition-all duration-300 flex items-end p-4">
        <span className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-parchment bg-roots-orange px-3 py-1.5 rounded-full pointer-events-none">
          {item.label.split(' ').slice(0, 2).join(' ')}
        </span>
      </div>
    </div>
  );
}

/* ── Infinite Scroll Column ────────────────── */
function BentoColumn({
  items,
  duration,
  reverse,
}: {
  items: TransformationItem[];
  duration: string;
  reverse?: boolean;
}) {
  return (
    <div className="relative h-full w-full bento-marquee-group">
      <div
        className={`h-max flex flex-col gap-2 ${reverse ? 'bento-marquee-reverse' : 'bento-marquee'}`}
        style={{ animationDuration: duration }}
      >
        {/* Set 1 */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          {items.map((item, idx) => (
            <BentoCard key={item.id + '-a-' + idx} item={item} />
          ))}
        </div>
        {/* Set 2 — duplicate for seamless loop */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          {items.map((item, idx) => (
            <BentoCard key={item.id + '-b-' + idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ────────────────────────── */
interface MasonryGridProps {
  cmsTransformations?: any[];
}

export default function MasonryGrid({ cmsTransformations = [] }: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Merge CMS data if available
  let data = ITEMS;
  if (cmsTransformations && cmsTransformations.length > 0) {
    data = cmsTransformations.map((cmsItem: any, index: number) => {
      let imageUrl;
      let objectPosition = 'center';
      try {
        if (cmsItem.image) {
          imageUrl = urlForImage(cmsItem.image).url();
          const hotspot = cmsItem.image.hotspot;
          if (hotspot && hotspot.x !== undefined && hotspot.y !== undefined) {
            objectPosition = `${hotspot.x * 100}% ${hotspot.y * 100}%`;
          }
        }
      } catch (e) {
        console.error('Image url generation failed:', e);
      }

      let cssAspectClass = 'aspect-[3/4]';
      if (cmsItem.aspect) {
        if (cmsItem.aspect.startsWith('aspect-')) {
          cssAspectClass = cmsItem.aspect;
        } else {
          const aspectMap: Record<string, string> = {
            '1:1': 'aspect-square',
            '2:3': 'aspect-[2/3]',
            '3:4': 'aspect-[3/4]',
            '4:5': 'aspect-[4/5]',
            '4:3': 'aspect-[4/3]',
            '16:9': 'aspect-video',
          };
          cssAspectClass = aspectMap[cmsItem.aspect] || 'aspect-[3/4]';
        }
      } else {
        cssAspectClass = ITEMS[index % ITEMS.length]?.aspectClass || 'aspect-[3/4]';
      }

      return {
        id: cmsItem._id || `cms-${index}`,
        label: cmsItem.title || 'TRANSFORMATION',
        description: cmsItem.description || '',
        aspectClass: cssAspectClass,
        mood: cmsItem.mood || 'warm',
        imageUrl,
        objectPosition,
      } as TransformationItem;
    });

    // If fewer CMS items than placeholders, merge
    if (data.length < ITEMS.length) {
      const combined = [...ITEMS];
      for (let i = 0; i < data.length; i++) {
        combined[i] = data[i];
      }
      data = combined;
    }
  }

  // Distribute items across 3 columns (disjoint sets)
  const col1 = data.filter((_, i) => i % 3 === 0);
  const col2 = data.filter((_, i) => i % 3 === 1);
  const col3 = data.filter((_, i) => i % 3 === 2);

  useGSAP(
    () => {
      gsap.from('.bento-container', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.bento-container', start: 'top 75%' },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <style>{`
        .bento-fade-edges {
          mask-image: linear-gradient(to bottom, transparent, black 4%, black 96%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 4%, black 96%, transparent);
        }
        .bento-marquee {
          animation: bentoScrollVert linear infinite;
        }
        .bento-marquee-reverse {
          animation: bentoScrollVertRev linear infinite;
        }
        .bento-marquee-group:hover .bento-marquee,
        .bento-marquee-group:hover .bento-marquee-reverse {
          animation-play-state: paused;
        }
        @keyframes bentoScrollVert {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-50% - 4px)); }
        }
        @keyframes bentoScrollVertRev {
          0% { transform: translateY(calc(-50% - 4px)); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div className="py-16 bento-container">
        <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
          <div className="h-[80vh] overflow-hidden bento-fade-edges grid grid-cols-2 md:grid-cols-3 gap-2">
            <BentoColumn items={col1} duration="45s" />
            <BentoColumn items={col2} duration="55s" reverse />
            <BentoColumn items={col3} duration="50s" />
          </div>

          {data.length === 0 && (
            <div className="text-center py-24">
              <p className="font-sans text-warm-gray text-sm">
                No transformations available yet — check back soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * MasonryGrid.tsx
 *
 * 3-column masonry gallery for the Transformations page.
 * 9 image slots, cascading heights, category-filterable.
 *
 * Implementation:
 * - CSS columns (3 on desktop, 2 on tablet, 1 on mobile)
 * - 8px gaps (per design spec — "gallery: clean masonry, 8px gaps max")
 * - Filtered items animate out/in with opacity + scale (CSS transition)
 * - Each cell shows category badge on hover
 *
 * Placeholder images have explicit dimensions for art direction.
 */

'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { urlForImage } from '@/sanity/lib/image';

interface TransformationItem {
  id: string;
  category: string;
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
    category: 'skin',
    label: 'SKIN GLOW-UP',
    description: 'Before/after skin collage — glowing result. Square or 3:4 portrait, 600×800px.',
    aspectClass: 'aspect-[3/4]',
    mood: 'warm',
  },
  {
    id: 't2',
    category: 'hair-color',
    label: 'HAIR COLOUR TRANSFORM',
    description: 'Dramatic hair colour transformation. Before dull → after vibrant. 4:3, 600×450px.',
    aspectClass: 'aspect-[4/3]',
    mood: 'warm',
  },
  {
    id: 't3',
    category: 'bridal',
    label: 'BRIDAL FINAL LOOK',
    description: 'Full bridal makeup + hair. Golden celebratory portrait. 2:3 portrait, 600×900px.',
    aspectClass: 'aspect-[2/3]',
    mood: 'warm',
  },
  {
    id: 't4',
    category: 'cut-style',
    label: 'CUT & STYLE EDITORIAL',
    description: 'Before/after precision cut. Editorial angle, warm tones. 3:4, 600×800px.',
    aspectClass: 'aspect-[3/4]',
    mood: 'warm',
  },
  {
    id: 't5',
    category: 'balayage',
    label: 'BALAYAGE CLOSE-UP',
    description: 'Sun-kissed balayage result — hero card. Dimensional, soft, warm. 2:3 tall, 600×900px.',
    aspectClass: 'aspect-[2/3]',
    mood: 'warm',
  },
  {
    id: 't6',
    category: 'hydrafacial',
    label: 'HYDRAFACIAL GLOW',
    description: 'HydraFacial result — radiant, dewy skin. Clinical-warm lighting. 4:3, 600×450px.',
    aspectClass: 'aspect-[4/3]',
    mood: 'warm',
  },
  {
    id: 't7',
    category: 'tattoo',
    label: 'FINE-LINE TATTOO',
    description: 'Fine-line or realism tattoo on arm/wrist. High contrast, dark background. 3:4, 600×800px.',
    aspectClass: 'aspect-[3/4]',
    mood: 'dark',
  },
  {
    id: 't8',
    category: 'cut-style',
    label: 'KERATIN SMOOTHENING',
    description: 'Before/after hair smoothening. Sleek, frizz-free result. 4:3, 600×450px.',
    aspectClass: 'aspect-[4/3]',
    mood: 'warm',
  },
  {
    id: 't9',
    category: 'bridal',
    label: 'BRIDAL PARTY LOOK',
    description: 'Full bridal party — group shot with complete styling. 3:4, 600×800px.',
    aspectClass: 'aspect-[3/4]',
    mood: 'warm',
  },
];

interface MasonryGridProps {
  activeCategory: string;
  cmsTransformations?: any[];
}

export default function MasonryGrid({ activeCategory, cmsTransformations = [] }: MasonryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<TransformationItem[]>(ITEMS);

  useEffect(() => {
    // Merge CMS entries or use them directly if mapping matches
    if (cmsTransformations && cmsTransformations.length > 0) {
      const merged = cmsTransformations.map((cmsItem: any, index: number) => {
        let imageUrl;
        let objectPosition = "center";
        
        try {
          if (cmsItem.image) {
            imageUrl = urlForImage(cmsItem.image).url();
            const hotspot = cmsItem.image.hotspot;
            if (hotspot && hotspot.x !== undefined && hotspot.y !== undefined) {
              objectPosition = `${hotspot.x * 100}% ${hotspot.y * 100}%`;
            }
          }
        } catch (e) {
          console.error("Image url generation failed:", e);
        }

        // We assign a default aspect class if the CMS field isn't explicitly setting one
        const aspectMap: Record<string, string> = {
          '1:1': 'aspect-square',
          '2:3': 'aspect-[2/3]',
          '3:4': 'aspect-[3/4]',
          '4:5': 'aspect-[4/5]',
          '4:3': 'aspect-[4/3]',
          '16:9': 'aspect-video'
        };

        const cssAspectClass = aspectMap[cmsItem.aspect] || (ITEMS[index % ITEMS.length]?.aspectClass || 'aspect-[3/4]');

        // Map CMS data to our component format
        // In this implementation, since CMS category mapping was not strictly defined, we use a basic fallback
        return {
          id: cmsItem._id || `cms-${index}`,
          category: 'hair-color', // Fallback as transformation schema might not have the category field explicitly defined yet
          label: cmsItem.title || 'TRANSFORMATION',
          description: cmsItem.description || '',
          aspectClass: cssAspectClass,
          mood: cmsItem.mood || 'warm',
          imageUrl,
          objectPosition
        } as TransformationItem;
      });

      // If we have enough CMS items, replace completely, else merge
      if (merged.length >= ITEMS.length) {
        setData(merged);
      } else {
        const combined = [...ITEMS];
        for (let i = 0; i < merged.length; i++) {
          combined[i] = merged[i];
        }
        setData(combined);
      }
    }
  }, [cmsTransformations]);

  useGSAP(
    () => {
      gsap.fromTo(
        '.masonry-cell',
        { opacity: 0, y: 20, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    },
    { scope: gridRef, dependencies: [data, activeCategory] }
  );

  const filtered =
    activeCategory === 'all'
      ? data
      : data.filter((item) => item.category === activeCategory);

  return (
    <div ref={gridRef} className="py-16">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        <div
          style={{ columnCount: 3, columnGap: '8px' }}
          className="max-sm:[column-count:1] sm:max-md:[column-count:2]"
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              className="masonry-cell group relative mb-2 overflow-hidden rounded-[8px] break-inside-avoid"
            >
              {/* Image layer */}
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
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-sans text-warm-gray text-sm">
              No transformations in this category yet — check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

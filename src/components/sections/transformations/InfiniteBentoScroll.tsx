'use client';

import React, { useRef } from 'react';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

// ----------------------------------------------------------------------
// CMS DATA STRUCTURE
// This array represents exactly what your CMS (Sanity/Strapi) will return.
// You can easily swap 'imageUrl' with your CMS image endpoint.
// ----------------------------------------------------------------------
export const BENTO_CMS_DATA = [
  { id: '1', title: 'SKIN GLOW-UP', description: 'Radiant skin transformation.', aspect: 'aspect-[3/4]', mood: 'warm' as const },
  { id: '2', title: 'HAIR COLOUR', description: 'Vibrant balayage blends.', aspect: 'aspect-[4/3]', mood: 'warm' as const },
  { id: '3', title: 'BRIDAL LOOK', description: 'Complete wedding day styling.', aspect: 'aspect-[2/3]', mood: 'warm' as const },
  { id: '4', title: 'TATTOO ART', description: 'Fine-line minimalist ink.', aspect: 'aspect-[1/1]', mood: 'dark' as const },
  { id: '5', title: 'MENS GROOMING', description: 'Precision fade & beard trim.', aspect: 'aspect-[4/5]', mood: 'warm' as const },
  { id: '6', title: 'KERATIN', description: 'Frizz-free smoothening.', aspect: 'aspect-[4/3]', mood: 'warm' as const },
  { id: '7', title: 'HYDRAFACIAL', description: 'Deep pore cleansing.', aspect: 'aspect-[3/4]', mood: 'warm' as const },
  { id: '8', title: 'NAIL ART', description: 'Custom gel extensions.', aspect: 'aspect-[1/1]', mood: 'dark' as const },
  { id: '9', title: 'LASH LIFT', description: 'Volume and curl enhancement.', aspect: 'aspect-[4/5]', mood: 'warm' as const },
];

function BentoColumn({ items, duration, reverse }: { items: typeof BENTO_CMS_DATA, duration: string, reverse?: boolean }) {
  return (
    <div className="relative h-full w-full bento-group">
      <div 
         className={`h-max flex flex-col gap-4 md:gap-6 ${reverse ? 'bento-vertical-reverse' : 'bento-vertical'}`}
         style={{ animationDuration: duration }}
      >
        {/* Set 1 */}
        <div className="flex flex-col gap-4 md:gap-6 flex-shrink-0">
          {items.map((item, idx) => (
            <BentoCard key={`a-${item.id}-${idx}`} item={item} />
          ))}
        </div>
        {/* Set 2 (Duplicate for flawless looping) */}
        <div className="flex flex-col gap-4 md:gap-6 flex-shrink-0">
          {items.map((item, idx) => (
            <BentoCard key={`b-${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BentoCard({ item }: { item: typeof BENTO_CMS_DATA[0] }) {
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 ease-out flex-shrink-0 ${item.aspect} hover:z-50 focus-within:z-50`}>
      <ImagePlaceholder
        label={item.title}
        description={item.description}
        mood={item.mood}
        className="w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      {/* Dark overlay focuses the picture and makes text pop */}
      <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none">
        <div className="text-parchment text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="font-serif text-2xl md:text-3xl block mb-2">{item.title}</span>
          <span className="font-sans text-xs uppercase tracking-widest">{item.description}</span>
        </div>
      </div>
    </div>
  );
}

export default function InfiniteBentoScroll() {
  // We duplicate the items inside the columns directly via the CMS slice mapping
  // to ensure sufficient vertical height to prevent layout voids.
  // Each column contains 6 items, yielding a very long stripe that smoothly loops.
  const col1 = [...BENTO_CMS_DATA.slice(0, 3), ...BENTO_CMS_DATA.slice(6, 9)];
  const col2 = [...BENTO_CMS_DATA.slice(3, 6), ...BENTO_CMS_DATA.slice(0, 3)];
  const col3 = [...BENTO_CMS_DATA.slice(6, 9), ...BENTO_CMS_DATA.slice(3, 6)];

  return (
    <section className="relative w-full h-[100vh] min-h-[800px] bg-parchment overflow-hidden flex flex-col pt-[72px]">
      <style>{`
        .bento-fade-edges {
          mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        }
        .bento-vertical {
          animation: bentoScrollVert linear infinite;
        }
        .bento-vertical-reverse {
          animation: bentoScrollVertRev linear infinite;
        }
        /* Allow precise pausing of one single picture/column */
        .bento-group:hover .bento-vertical,
        .bento-group:hover .bento-vertical-reverse,
        .bento-group:focus-within .bento-vertical,
        .bento-group:focus-within .bento-vertical-reverse {
          animation-play-state: paused;
        }

        /* Using 12px for md:gap-6 (24px) padding compensation between the two 50% wrappers */
        @media (min-width: 768px) {
          @keyframes bentoScrollVert {
            0% { transform: translateY(0); }
            100% { transform: translateY(calc(-50% - 12px)); }
          }
          @keyframes bentoScrollVertRev {
            0% { transform: translateY(calc(-50% - 12px)); }
            100% { transform: translateY(0); }
          }
        }
        
        /* 8px for gap-4 (16px) on mobile */
        @media (max-width: 767px) {
           @keyframes bentoScrollVert {
            0% { transform: translateY(0); }
            100% { transform: translateY(calc(-50% - 8px)); }
          }
          @keyframes bentoScrollVertRev {
            0% { transform: translateY(calc(-50% - 8px)); }
            100% { transform: translateY(0); }
          }
        }
      `}</style>
      
      {/* Overlay Header inside the immersive view */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-12 z-20 pointer-events-none flex flex-col items-center justify-center pt-32">
        <span className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-obsidian mb-4 bg-parchment/80 px-4 py-1.5 rounded-full backdrop-blur-sm">
          Before & After
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-obsidian px-8 py-3 bg-parchment/80 rounded-2xl backdrop-blur-md shadow-soft max-w-2xl text-center">
          The Roots Gallery
        </h1>
      </div>

      {/* Bento Grid Container */}
      <div className="w-full h-full max-w-[1400px] mx-auto px-4 md:px-8 flex gap-4 md:gap-6 justify-center items-center mt-10 md:mt-0 bento-fade-edges absolute inset-0 pb-10">
        
        {/* Column 1 - Scrolls UP */}
        <div className="hidden lg:block flex-1 w-full relative h-[120%] -translate-y-[10%]">
           <BentoColumn items={col1} duration="45s" />
        </div>

        {/* Column 2 - Scrolls DOWN */}
        <div className="flex-1 w-full relative h-[120%] -translate-y-[10%]">
           <BentoColumn items={col2} duration="55s" reverse />
        </div>

        {/* Column 3 - Scrolls UP */}
        <div className="hidden md:block flex-1 w-full relative h-[120%] -translate-y-[10%]">
           <BentoColumn items={col3} duration="50s" />
        </div>

      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CTASection from '@/components/sections/shared/CTASection';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  imgLabel: string;
  imgDescription: string;
}

const POSTS: BlogPost[] = [
  {
    slug: 'how-to-maintain-balayage-at-home',
    title: 'How to Maintain Your Balayage Between Salon Visits',
    excerpt:
      'Balayage fades beautifully — but only if you follow the right at-home routine. Here\'s the exact 4-step process our colour technicians recommend.',
    category: 'Hair Colour',
    readTime: '4 min read',
    date: 'March 18, 2025',
    imgLabel: 'BALAYAGE MAINTENANCE',
    imgDescription: 'Close-up of beautiful sun-kissed balayage strands, warm tones, editorial styling. 16:9, 800×450px.',
  },
  {
    slug: 'hydrafacial-vs-regular-facial',
    title: 'HydraFacial vs Regular Facial: What\'s the Real Difference?',
    excerpt:
      'Both promise glowing skin — but they work completely differently. We break down the science so you can choose the right treatment for your skin type.',
    category: 'Skin Therapy',
    readTime: '5 min read',
    date: 'March 5, 2025',
    imgLabel: 'HYDRAFACIAL TREATMENT',
    imgDescription: 'HydraFacial wand on glowing skin — clinical-warm lighting, clean aesthetic. 4:3, 600×450px.',
  },
  {
    slug: 'bridal-hair-colour-trends-2025',
    title: '5 Bridal Hair Colour Trends Dominating 2025',
    excerpt:
      'From champagne blonde to deep aubergine lowlights — our senior colourist breaks down what brides are requesting this wedding season.',
    category: 'Bridal',
    readTime: '3 min read',
    date: 'February 20, 2025',
    imgLabel: 'BRIDAL HAIR TREND',
    imgDescription: 'Bridal updo with subtle colour — elegant, warm-toned editorial shot. 4:3, 600×450px.',
  },
  {
    slug: 'aftercare-for-fine-line-tattoos',
    title: 'The Complete Aftercare Guide for Fine-Line Tattoos',
    excerpt:
      'Fine-line tattoos are stunning but delicate. Follow these 7 rules in the first 2 weeks and your tattoo will stay crisp for years.',
    category: 'Tattoo',
    readTime: '6 min read',
    date: 'February 10, 2025',
    imgLabel: 'TATTOO AFTERCARE',
    imgDescription: 'Fine-line tattoo close-up on forearm — minimal, dark background, artistic. 3:4, 450×600px.',
  },
  {
    slug: 'best-shampoo-for-colour-treated-hair',
    title: 'The Best Shampoos for Colour-Treated Hair (That Actually Work)',
    excerpt:
      'Our colour technicians tested 12 shampoos for colour longevity and damage repair. Here are the 3 that made the cut — and 2 to avoid.',
    category: 'Hair Care',
    readTime: '4 min read',
    date: 'January 28, 2025',
    imgLabel: 'SHAMPOO PRODUCT FLAT LAY',
    imgDescription: 'Premium shampoo bottles arranged on marble or linen — clean, editorial flat lay. 16:9, 800×450px.',
  },
];

const [featured, ...rest] = POSTS;

function CategoryPill({ label }: { label: string }) {
  return (
    <span className="inline-block font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-roots-orange bg-roots-orange/10 px-2.5 py-1 rounded-full">
      {label}
    </span>
  );
}

export default function BlogClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headline = "The Editorial.";
  const titleLetters = headline.split('');

  // 1. Hero Title GSAP Animation
  useGSAP(() => {
    gsap.to('.blog-title-char', {
      y: 0,
      duration: 0.7,
      stagger: 0.015,
      ease: "power3.out",
      delay: 0.1
    });
  }, { scope: containerRef });

  // Framer Motion Variants
  const curtainVariants = {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: { 
      clipPath: 'inset(0% 0 0 0)', 
      transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] as const } 
    }
  };

  const textPanelVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" as any } }
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // 0ms, 100ms, 200ms stagger
      }
    }
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } }
  };

  return (
    <div ref={containerRef}>
      {/* ─── HERO HEADER ──────────────────────────────── */}
      <section className="pt-36 pb-16 bg-parchment overflow-hidden">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl text-center">
          <span className="eyebrow inline-block mb-3">OUR JOURNAL</span>
          <h1 className="font-serif text-5xl md:text-7xl text-obsidian italic leading-[1.0] mb-4 flex justify-center flex-wrap">
            {titleLetters.map((char, i) => (
              <span key={i} className="inline-block overflow-hidden py-1">
                <span className="blog-title-char inline-block translate-y-[120%]">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              </span>
            ))}
          </h1>
          <p className="font-sans text-warm-gray text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Expert tips, honest product reviews, and insider guides from the
            Root&apos;s team — written to help you look great between visits.
          </p>
        </div>
      </section>

      {/* ─── FEATURED POST ────────────────────────────── */}
      <section className="bg-linen py-12">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="grid md:grid-cols-2 gap-12 items-center bg-parchment rounded-2xl overflow-hidden border border-obsidian/[0.06] hover:shadow-xl transition-shadow duration-300">
              
              {/* Image with Framer clip-path reveal */}
              <motion.div 
                className="aspect-[4/3] md:aspect-auto md:h-[460px] overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={curtainVariants}
              >
                <div className="w-full h-full transform transition-transform duration-[600ms] group-hover:scale-[1.04]">
                  <ImagePlaceholder
                    label={featured.imgLabel}
                    description={featured.imgDescription}
                    mood="warm"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Content Panel sliding in from right */}
              <motion.div 
                className="p-8 md:p-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={textPanelVariants}
              >
                <CategoryPill label={featured.category} />
                <h2 className="font-serif text-3xl md:text-4xl text-obsidian leading-[1.1] mt-4 mb-5 transition-colors duration-200">
                  {featured.title}
                </h2>
                <p className="font-sans text-warm-gray text-base leading-relaxed mb-8">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 border-t border-obsidian/[0.06] pt-5">
                  <span className="font-sans text-xs text-warm-gray">{featured.date}</span>
                  <span className="font-sans text-xs text-obsidian/30">·</span>
                  <span className="font-sans text-xs text-warm-gray">{featured.readTime}</span>
                  <span className="relative ml-auto font-sans text-xs font-semibold text-roots-orange uppercase tracking-widest inline-block group/link">
                    Read Article →
                    <span className="absolute left-0 bottom-[-2px] w-full h-[1px] bg-roots-orange origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </div>
              </motion.div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── POST GRID ────────────────────────────────── */}
      <section className="bg-linen pb-20">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={gridContainerVariants}
          >
            {rest.map((post) => (
              <motion.div key={post.slug} variants={gridItemVariants}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="bg-parchment rounded-2xl overflow-hidden border border-obsidian/[0.06] hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                    
                    <div className="aspect-[4/3] overflow-hidden">
                      <div className="w-full h-full transform transition-transform duration-[600ms] group-hover:scale-[1.04]">
                        <ImagePlaceholder
                          label={post.imgLabel}
                          description={post.imgDescription}
                          mood="warm"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div>
                        <CategoryPill label={post.category} />
                      </div>
                      <h3 className="font-serif text-xl text-obsidian leading-[1.2] mt-3 mb-3 flex-1 inline-block relative">
                        {post.title}
                        <span className="absolute left-0 bottom-[-2px] w-full h-[1px] bg-roots-orange origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                      </h3>
                      <p className="font-sans text-warm-gray text-sm leading-relaxed mb-5 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 border-t border-obsidian/[0.06] pt-4 mt-auto">
                        <span className="font-sans text-xs text-warm-gray">{post.date}</span>
                        <span className="font-sans text-xs text-obsidian/20">·</span>
                        <span className="font-sans text-xs text-warm-gray">{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection
        heading="Questions about your hair or skin?"
        subtext="Chat with our team on WhatsApp — we're happy to advise before you even book."
        ctaLabel="Chat With Us"
      />
    </div>
  );
}

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from '@/lib/gsap-config';
import { useGSAP } from '@gsap/react';
import CTASection from '@/components/sections/shared/CTASection';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import type { SanityPost } from '@/types/sanity';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  accentColor: string;
  mainImageUrl?: string;
}

interface BlogClientProps {
  posts?: SanityPost[];
}


// Note: module-level [featured, ...rest] removed — BlogClient uses formattedPosts internally.

function CategoryPill({ label }: { label: string }) {
  return (
    <span className="inline-block font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-roots-orange bg-roots-orange/10 px-2.5 py-1 rounded-full">
      {label}
    </span>
  );
}

export default function BlogClient({ posts = [] }: BlogClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const formattedPosts: BlogPost[] = posts.map(p => ({
    slug: p.slug,
    title: p.title || "Untitled Post",
    excerpt: p.excerpt || "",
    category: p.category || "General",
    readTime: `${p.readTime || 3} min read`,
    date: new Date(p.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    accentColor: 'from-obsidian/20 to-obsidian/30',
    mainImageUrl: p.mainImageUrl
  }));

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


  return (
    <div ref={containerRef}>
      {/* ─── HERO HEADER ──────────────────────────────── */}
      <section className="pt-36 pb-16 bg-parchment overflow-hidden">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl text-center">
          <span className="eyebrow inline-block mb-3">OUR JOURNAL</span>
          <h1 className="font-serif text-5xl md:text-7xl text-obsidian leading-[1.0] mb-4 flex justify-center flex-wrap">
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

      {/* ─── FEATURED POST ──────────────────────────────── */}
      {formattedPosts.length> 0 ? (() => {
        const [featured, ...rest] = formattedPosts;
        return (
          <section className="bg-linen pt-8 pb-16">
            <div className="container mx-auto px-6 md:px-16 max-w-7xl">
              <div className="bg-parchment rounded-3xl overflow-hidden border border-obsidian/[0.06] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                <div className="grid md:grid-cols-2">
                  {/* Image Panel */}
                  <div className="relative aspect-square md:aspect-auto">

                    <Link href={`/blog/${featured.slug}`} className="block w-full h-full group">
                      {featured.mainImageUrl ? (
                        <div className="relative w-full h-full overflow-hidden">
                          <Image src={featured.mainImageUrl} alt={featured.title} fill className="object-cover transform transition-transform duration-[800ms] group-hover:scale-105" priority sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>
                      ) : (
                        <ImagePlaceholder 
                          label="Featured Post Photo"
                          aspectRatio="1000 × 1000 px · 1:1"
                          description="The main blog post image" 
                          className="w-full h-full" 
                          mood="warm" 
 />
                      )}
                    </Link>
                  </div>
                  
                  {/* Content Panel sliding in from right */}
                  <div className="fade-element p-8 md:p-12">
                    <CategoryPill label={featured.category} />
                    <Link href={`/blog/${featured.slug}`}>
                      <h2 className="font-serif text-3xl md:text-4xl text-obsidian leading-[1.1] mt-4 mb-5 transition-colors duration-200 hover:text-roots-orange">
                        {featured.title}
                      </h2>
                    </Link>
                    <p className="font-sans text-warm-gray text-base leading-relaxed mb-8">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-4 border-t border-obsidian/[0.06] pt-5">
                      <span className="font-sans text-xs text-warm-gray">{featured.date}</span>
                      <span className="font-sans text-xs text-obsidian/30">·</span>
                      <span className="font-sans text-xs text-warm-gray">{featured.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })() : (
        <section className="bg-linen pt-8 pb-16">
          <div className="container mx-auto px-6 md:px-16 max-w-7xl text-center py-20">
            <h2 className="font-serif text-3xl text-obsidian mb-4">New content coming soon.</h2>
            <p className="font-sans text-warm-gray max-w-md mx-auto">We are currently curating our best hair, skin, and bridal tips. Check back shortly for our first post!</p>
          </div>
        </section>
      )}

      {/* ─── POST GRID ────────────────────────────────── */}
      <section className="bg-linen pb-20">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="fade-element grid md:grid-cols-3 gap-6">
            {formattedPosts.length> 1 && formattedPosts.slice(1).map((post) => (
              <div className="fade-element" key={post.slug}>
                <div className="group block h-full cursor-default">
                  <article className="bg-parchment rounded-2xl overflow-hidden border border-obsidian/[0.06] hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                    
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <Link href={`/blog/${post.slug}`} className="block w-full h-full transform transition-transform duration-[600ms] group-hover:scale-[1.04]">
                        {post.mainImageUrl ? (
                          <div className="relative w-full h-full">
                            <Image src={post.mainImageUrl} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                          </div>
                        ) : (
                          <ImagePlaceholder 
                            label="Blog Post Photo"
                            aspectRatio="600 × 400 px · 3:2"
                            description={`Photo for ${post.category}`} 
                            className="w-full h-full" 
                            mood="warm" 
 />
                        )}
                      </Link>
                      <div className="absolute top-4 left-4 z-10">
                        <CategoryPill label={post.category} />
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <Link href={`/blog/${post.slug}`} className="block mb-3">
                        <h3 className="font-serif text-2xl text-obsidian leading-snug transition-colors duration-200 group-hover:text-roots-orange">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="font-sans text-warm-gray text-sm leading-relaxed mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-3 border-t border-obsidian/[0.06] pt-4 mt-auto">
                        <span className="font-sans text-xs text-warm-gray">{post.date}</span>
                        <span className="font-sans text-xs text-obsidian/30">·</span>
                        <span className="font-sans text-xs text-warm-gray">{post.readTime}</span>
                        {posts.length === 0 && (
                          <span className="relative ml-auto font-sans text-[10px] font-semibold text-roots-orange/50 uppercase tracking-widest inline-block">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
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

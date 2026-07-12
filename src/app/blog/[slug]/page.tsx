/**
 * blog/[slug]/page.tsx — Individual Blog Post Page
 *
 * Since posts are hardcoded (pre-Sanity), this renders a single article
 * by matching slug to the post data array.
 *
 * Structure:
 *   1. Post hero — large image + title + meta
 *   2. Post body — long-form prose
 *   3. Author card
 *   4. Related posts suggestion (placeholder)
 *   5. CTASection
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CTASection from '@/components/sections/shared/CTASection';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { client } from "@/sanity/client";
import { getPostBySlugQuery, getPostsQuery } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";

export const revalidate = 60;

/* ─── METADATA ────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  const sanityPost = await client?.fetch(getPostBySlugQuery, { slug }).catch(() => null);
  if (!sanityPost) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${sanityPost.title} | Root's Salon Blog`,
    description: sanityPost.excerpt || `${sanityPost.title} blog post`,
  };
}

export async function generateStaticParams() {
  const posts = await client?.fetch(getPostsQuery).catch(() => []) ?? [];
  return posts.map((post: any) => ({ slug: post.slug }));
}

/* ─── PAGE ────────────────────────────────────────────────── */



const portableTextComponents: any = {
  block: {
    normal: ({ children }: any) => (
      <p className="font-sans text-obsidian/80 text-base md:text-lg leading-relaxed mb-6">
        {children}
      </p>
    ),
    h1: ({ children }: any) => (
      <h1 className="font-sans font-bold uppercase tracking-widest text-4xl md:text-5xl text-obsidian mt-12 mb-6 leading-[1.1]">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-sans font-bold uppercase tracking-widest text-3xl md:text-4xl text-obsidian mt-10 mb-5 leading-[1.15]">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-sans font-bold uppercase tracking-widest text-2xl md:text-3xl text-obsidian mt-8 mb-4 leading-[1.2]">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-sans font-bold uppercase tracking-widest text-xl md:text-2xl text-obsidian mt-6 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-roots-orange pl-6 my-8 py-2 font-sans font-bold uppercase tracking-widest text-xl md:text-2xl text-warm-gray leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-5 font-sans text-obsidian/80 text-base md:text-lg leading-relaxed space-y-3 mb-6 marker:text-roots-orange">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-5 font-sans text-obsidian/80 text-base md:text-lg leading-relaxed space-y-3 mb-6 marker:text-roots-orange">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="pl-2">{children}</li>,
    number: ({ children }: any) => <li className="pl-2">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-obsidian">{children}</strong>
    ),
    em: ({ children }: any) => <em className="text-obsidian">{children}</em>,
    link: ({ children, value }: any) => {
      const rel = !value?.href?.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value?.href} 
          rel={rel} 
          className="text-roots-orange hover:text-roots-orange/80 underline underline-offset-4 decoration-roots-orange/30 hover:decoration-roots-orange transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const sanityPost = await client?.fetch(getPostBySlugQuery, { slug }).catch(() => null);
  if (!sanityPost) {
    notFound();
  }

  const pubDate = new Date(sanityPost.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <>
      {/* ─── ARTICLE HERO ────────────────────────────── */}
      <section className="pt-32 pb-0 bg-parchment">
        <div className="container mx-auto px-6 md:px-16 max-w-4xl">
          <span className="eyebrow">{sanityPost.category || "General"}</span>
          <h1 className="font-sans font-bold uppercase tracking-widest text-4xl md:text-6xl text-obsidian leading-[1.05] mt-3 mb-6">
            {sanityPost.title}
          </h1>
          <div className="flex items-center gap-4 mb-10">
            <span className="font-sans text-sm text-warm-gray">{pubDate}</span>
            <span className="text-obsidian/20">·</span>
            <span className="font-sans text-sm text-warm-gray">{sanityPost.readTime || 3} min read</span>
          </div>
        </div>
        {/* Full-bleed hero image */}
        <div className="w-full aspect-[21/9] md:aspect-[21/7] max-h-[480px]">
           {sanityPost.mainImageUrl ? (
             <img src={sanityPost.mainImageUrl} alt={sanityPost.title} className="w-full h-full object-cover" />
           ) : (
             <ImagePlaceholder
               label="Post Image"
               description="No image"
               mood="warm"
               className="w-full h-full"
             />
           )}
        </div>
      </section>

      {/* ─── ARTICLE BODY ────────────────────────────── */}
      <article className="bg-parchment py-16">
        <div className="container mx-auto px-6 md:px-16 max-w-3xl">
          <div className="prose-like space-y-6">
               <PortableText value={sanityPost.body} components={portableTextComponents} />
          </div>

          {/* Author card */}
          <div className="mt-16 border-t border-obsidian/[0.08] pt-10 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-linen flex-shrink-0">
              <div className="w-full h-full bg-roots-orange/20 flex items-center justify-center">
                <span className="font-sans font-bold uppercase tracking-widest text-roots-orange text-xl">R</span>
              </div>
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-obsidian">Root's Team</p>
              <p className="font-sans text-xs text-warm-gray">Hair & Beauty Experts · Root's The Family Salon</p>
            </div>
          </div>
          
          {/* Back to blog */}
          <div className="mt-12">
            <Link
              href="/blog"
              className="font-sans text-sm text-roots-orange hover:underline inline-flex items-center gap-2"
            >
              ← Back to Journal
            </Link>
          </div>
        </div>
      </article>

      <CTASection
        heading="Ready for your own transformation?"
        subtext="Book an appointment at any Root's branch in Hyderabad. We'd love to bring this to life for you."
        ctaLabel="Book Appointment"
      />
    </>
  );
}

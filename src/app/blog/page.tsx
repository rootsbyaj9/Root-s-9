/**
 * blog/page.tsx — Blog Index Page
 *
 * Section order (per implementation plan §Phase 7):
 *   1. Hero header
 *   2. Featured post (large card, full-width)
 *   3. Post grid (3-col, 5 posts)
 *   4. Coming Soon banner (content pipeline note)
 *   5. CTASection
 *
 * All posts are hardcoded — structured for future Sanity migration.
 * Each post card links to /blog/[slug]
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/sections/shared/CTASection';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

export const metadata: Metadata = {
  title: "Blog & Beauty Tips | Root's The Family Salon Hyderabad",
  description:
    "Expert hair care tips, skin advice, and beauty guides from the Root's Salon team. Learn how to maintain your look between salon visits.",
  openGraph: {
    title: "Blog | Root's The Family Salon",
    description: "Beauty tips, hair care guides, and skin advice from the Root's team.",
    type: 'website',
  },
};

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

export default function BlogPage() {
  return (
    <>
      {/* ─── HERO HEADER ──────────────────────────────── */}
      <section className="pt-36 pb-16 bg-parchment">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl text-center">
          <span className="eyebrow">OUR JOURNAL</span>
          <h1 className="font-serif text-5xl md:text-7xl text-obsidian leading-[1.0] mt-2 mb-4">
            Beauty,{' '}
            <em className="italic font-normal text-roots-orange">decoded.</em>
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
              {/* Image */}
              <div className="aspect-[4/3] md:aspect-auto md:h-[460px]">
                <ImagePlaceholder
                  label={featured.imgLabel}
                  description={featured.imgDescription}
                  mood="warm"
                  className="w-full h-full"
                />
              </div>
              {/* Content */}
              <div className="p-8 md:p-12">
                <CategoryPill label={featured.category} />
                <h2 className="font-serif text-3xl md:text-4xl text-obsidian leading-[1.1] mt-4 mb-5 group-hover:text-roots-orange transition-colors duration-200">
                  {featured.title}
                </h2>
                <p className="font-sans text-warm-gray text-base leading-relaxed mb-8">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 border-t border-obsidian/[0.06] pt-5">
                  <span className="font-sans text-xs text-warm-gray">{featured.date}</span>
                  <span className="font-sans text-xs text-obsidian/30">·</span>
                  <span className="font-sans text-xs text-warm-gray">{featured.readTime}</span>
                  <span className="ml-auto font-sans text-xs font-semibold text-roots-orange uppercase tracking-widest group-hover:underline">
                    Read Article →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── POST GRID ────────────────────────────────── */}
      <section className="bg-linen pb-20">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="bg-parchment rounded-2xl overflow-hidden border border-obsidian/[0.06] hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                  <div className="aspect-[4/3]">
                    <ImagePlaceholder
                      label={post.imgLabel}
                      description={post.imgDescription}
                      mood="warm"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <CategoryPill label={post.category} />
                    <h3 className="font-serif text-xl text-obsidian leading-[1.2] mt-3 mb-3 group-hover:text-roots-orange transition-colors duration-200 flex-1">
                      {post.title}
                    </h3>
                    <p className="font-sans text-warm-gray text-sm leading-relaxed mb-5 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 border-t border-obsidian/[0.06] pt-4">
                      <span className="font-sans text-xs text-warm-gray">{post.date}</span>
                      <span className="font-sans text-xs text-obsidian/20">·</span>
                      <span className="font-sans text-xs text-warm-gray">{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Questions about your hair or skin?"
        subtext="Chat with our team on WhatsApp — we're happy to advise before you even book."
        ctaLabel="Chat With Us"
      />
    </>
  );
}

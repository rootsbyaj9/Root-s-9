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

/* ─── POST DATA ──────────────────────────────────────────── */

const POSTS: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    readTime: string;
    imgLabel: string;
    imgDescription: string;
    author: string;
    authorRole: string;
    body: string[];
  }
> = {
  'how-to-maintain-balayage-at-home': {
    title: 'How to Maintain Your Balayage Between Salon Visits',
    category: 'Hair Colour',
    date: 'March 18, 2025',
    readTime: '4 min read',
    imgLabel: 'BALAYAGE CLOSE-UP EDITORIAL',
    imgDescription: 'Dreamy sun-kissed balayage — editorial, warm-toned, cascading strands. 16:9, 1200×675px.',
    author: 'Root\'s Colour Team',
    authorRole: 'Senior Colour Technician',
    body: [
      'Balayage is one of our most requested services — and for good reason. The soft, natural fade of colour catches the light beautifully and grows out gracefully. But between visits, the difference between dull and stunning is almost entirely down to your at-home routine.',
      '**Step 1: Switch to a toning shampoo.** Warm tones from sun exposure or hard water can turn your balayage brassy. A purple or blue toning shampoo, used once a week, neutralises that unwanted warmth and keeps your colour looking fresh.',
      '**Step 2: Deep condition every wash.** Balayage lightens the hair structure, which means moisture escapes more easily. Use a protein-rich conditioner every time you wash, and do a deep mask treatment once a week. We recommend leaving it on for at least 20 minutes.',
      '**Step 3: Avoid heat without protection.** A heat protectant spray before every blow-dry, straighten, or curl session is non-negotiable. Direct heat destroys the outer cuticle layer that keeps your colour vibrant.',
      '**Step 4: Sleep on silk.** A silk or satin pillowcase reduces friction on your hair while you sleep, which means less breakage and less colour fade. It sounds small, but our clients who make this change notice a real difference within two weeks.',
      'And remember — the single biggest factor in how long your colour lasts is how often you wash your hair. We recommend no more than three washes per week for balayage-treated hair. Dry shampoo is your best friend between sessions.',
      'See you back in the chair in 8–12 weeks. Until then, these four steps will keep your colour exactly where we left it.',
    ],
  },
  'hydrafacial-vs-regular-facial': {
    title: 'HydraFacial vs Regular Facial: What\'s the Real Difference?',
    category: 'Skin Therapy',
    date: 'March 5, 2025',
    readTime: '5 min read',
    imgLabel: 'HYDRAFACIAL WAND CLOSE-UP',
    imgDescription: 'HydraFacial wand on dewy, glowing skin. Clinical-warm lighting. 16:9, 1200×675px.',
    author: 'Root\'s Skin Team',
    authorRole: 'Senior Aesthetician',
    body: [
      'We get this question almost every day: "What\'s the actual difference between a HydraFacial and a regular facial?" The short answer: one is a medical-grade device treatment, the other is a manual skincare service. Both have their place — but they target different concerns.',
      '**Regular Facial:** A traditional facial uses manual techniques — steaming, extraction, massage, and a mask. It\'s relaxing, great for circulation, and helps with basic congestion and glow. The results depend heavily on the products used and the skill of the aesthetician. Expect results that last 3–5 days.',
      '**HydraFacial:** The HydraFacial uses a patented Vortex-Fusion device that simultaneously cleanses, exfoliates, extracts, and infuses active serums into your skin. The vacuum-powered tip removes 3–4x more sebum and dead skin than manual extraction without the redness or discomfort. Results typically last 7–14 days.',
      '**Which one is right for you?** If you\'re new to facials or dealing with basic dullness and dryness, a regular facial is a great starting point. If you have persistent congestion, fine lines, hyperpigmentation, or uneven texture — or if you want visible, Instagram-worthy results — the HydraFacial is the upgrade.',
      'At Root\'s, we offer both. We always do a skin consultation before recommending a treatment. Book a session and we\'ll help you choose.',
    ],
  },
  'bridal-hair-colour-trends-2025': {
    title: '5 Bridal Hair Colour Trends Dominating 2025',
    category: 'Bridal',
    date: 'February 20, 2025',
    readTime: '3 min read',
    imgLabel: 'BRIDAL HAIR EDITORIAL',
    imgDescription: 'Editorial bridal hair — elegant updo with subtle warm-toned highlights. 16:9, 1200×675px.',
    author: 'Root\'s Bridal Team',
    authorRole: 'Lead Bridal Stylist',
    body: [
      '2025 brides are moving away from heavy balayage and back toward richness and dimension. Our lead stylist has done 50+ bridal services this year, and here\'s what\'s trending on the chair.',
      '**1. Champagne Blonde:** Warm, soft, and luminous. This universally flattering blonde works with Indian skin undertones better than ash or platinum. Perfect for outdoor ceremonies.',
      '**2. Dark Chocolate with Caramel Highlights:** A classic combo that photographs magnificently. The deep base adds drama; the caramel picks up warm light. Ideal for brides who want to keep their dark hair but add depth.',
      '**3. Strawberry-Tinted Brunette:** A warm, copper-tinged brunette that glows in candlelit mandaps and reception halls. Extremely on-trend internationally and just arriving in Hyderabad.',
      '**4. Rich Aubergine Lowlights:** Deep plum or burgundy lowlights woven into dark Indian hair for dimension that reads as "something different" without being too bold.',
      '**5. Natural Dark Gloss:** No colour at all — just a deep shine treatment to make natural dark hair look like liquid mirror. Simple, confident, and stunning in photographs.',
      'Whichever look you choose, book your colour 6 weeks before your wedding date. This gives time for a test colour, any tonal adjustments, and a bond-building treatment before the big day.',
    ],
  },
  'aftercare-for-fine-line-tattoos': {
    title: 'The Complete Aftercare Guide for Fine-Line Tattoos',
    category: 'Tattoo',
    date: 'February 10, 2025',
    readTime: '6 min read',
    imgLabel: 'FINE-LINE TATTOO ARTISTRY',
    imgDescription: 'Intricate fine-line botanical tattoo on forearm. High-detail, dark ambient background. 16:9, 1200×675px.',
    author: 'Root\'s Tattoo Studio',
    authorRole: 'Fine-Line Tattoo Artist',
    body: [
      'Fine-line tattoos are exquisite — but they\'re also the most demanding of any style when it comes to aftercare. The delicate, single-needle lines that make them so beautiful are also the reason they need careful healing. Follow these 7 rules.',
      '**During the first 24 hours:** Keep the wrap your artist applied on for 2–4 hours. When you remove it, wash the tattoo gently with unscented antibacterial soap and lukewarm water. Pat dry with a clean paper towel (never rub).',
      '**Days 2–14 — The Routine:** Wash twice daily, apply a thin layer of unscented moisturiser (we recommend Bepanthen or Tattoo Goo), and never let the tattoo dry out completely. Cracking = detail loss.',
      '**What to avoid:**',
      '— No swimming, hot tubs, or ocean for 4 weeks (bacterial exposure and fading)',
      '— No direct sun on the tattoo while healing — a single sunburn can blow out entire sections',
      '— No picking or scratching the peeling skin (this is where most fine-line tattoos lose clarity)',
      '— No tight clothing rubbing over the site',
      '**After healing:** Fine-line tattoos are particularly susceptible to UV fading. Once healed, apply SPF 50 every time the tattoo is exposed to sun. This one habit adds years of sharpness to your tattoo.',
      '**The 6-week check:** All our tattoo clients get a complimentary 6-week check-in session. If any line needs a touch-up, we do it at no charge — because our goal is a tattoo that looks as good in 10 years as it does today.',
    ],
  },
  'best-shampoo-for-colour-treated-hair': {
    title: 'The Best Shampoos for Colour-Treated Hair (That Actually Work)',
    category: 'Hair Care',
    date: 'January 28, 2025',
    readTime: '4 min read',
    imgLabel: 'PREMIUM SHAMPOO EDITORIAL',
    imgDescription: 'Premium hair care products flat-lay on marble — editorial, warm-toned, minimal. 16:9, 1200×675px.',
    author: 'Root\'s Hair Team',
    authorRole: 'Senior Stylist',
    body: [
      'After every colour service, the first question is "Which shampoo should I use?" We tested 12 shampoos over 3 months across 40 clients with different colour types. Here\'s what we found.',
      '**The Winners:**',
      '**1. Wella Professionals Color Motion+:** The gold standard for balayage and highlighted hair. The acidic pH (4.5–5.0) keeps the cuticle sealed, colour sealed, and hair glossy. Suitable for all hair types.',
      '**2. Schwarzkopf Professional BC Color Freeze:** Our pick for global colours and bold tones. The Color Freeze technology actively prevents colour molecules from washing out. Particularly effective on reds and coppers.',
      '**3. Kerastase Chroma Absolu Bain Chroma Respect:** Premium price, premium results. For clients with fine, sensitised hair who\'ve undergone multiple colour sessions. Ultra-gentle formula that doesn\'t compromise on cleaning.',
      '**What to avoid:**',
      '— Any shampoo with sulphates (SLS, SLES): These strip colour in as few as 3 washes.',
      '— Clarifying shampoos: Use sparingly (once a month max) on colour-treated hair.',
      'And remember our rule of thumb — every wash fades your colour slightly. The best shampoo in the world won\'t save hair that\'s washed daily. Three times a week maximum, and use a shower cap on off-days.',
    ],
  },
};

/* ─── METADATA ────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  const sanityPost = await client?.fetch(getPostBySlugQuery, { slug }).catch(() => null);
  if (sanityPost) {
    return {
      title: `${sanityPost.title} | Root's Salon Blog`,
      description: sanityPost.excerpt || `${sanityPost.title} blog post`,
    };
  }

  const post = POSTS[slug];
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | Root's Salon Blog`,
    description: post.body[0]?.substring(0, 155) + '...',
  };
}

export async function generateStaticParams() {
  const posts = await client?.fetch(getPostsQuery).catch(() => []) ?? [];
  const sanitySlugs = posts.map((post: any) => ({ slug: post.slug }));
  const staticSlugs = Object.keys(POSTS).map((slug) => ({ slug }));
  
  const allSlugs = [...sanitySlugs];
  for (const staticSlug of staticSlugs) {
    if (!allSlugs.some(s => s.slug === staticSlug.slug)) {
      allSlugs.push(staticSlug);
    }
  }
  return allSlugs;
}

/* ─── PAGE ────────────────────────────────────────────────── */

function renderBody(paragraph: string) {
  // Bold markdown syntax
  const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-obsidian">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('—')) {
      return <span key={i} className="block pl-4 text-sm text-warm-gray">{part}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

const portableTextComponents: any = {
  block: {
    normal: ({ children }: any) => (
      <p className="font-sans text-obsidian/80 text-base md:text-lg leading-relaxed mb-6">
        {children}
      </p>
    ),
    h1: ({ children }: any) => (
      <h1 className="font-serif text-4xl md:text-5xl text-obsidian mt-12 mb-6 leading-[1.1]">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-serif text-3xl md:text-4xl text-obsidian mt-10 mb-5 leading-[1.15]">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif text-2xl md:text-3xl text-obsidian mt-8 mb-4 leading-[1.2]">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-serif text-xl md:text-2xl text-obsidian mt-6 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-roots-orange pl-6 my-8 py-2 font-serif italic text-xl md:text-2xl text-warm-gray leading-relaxed">
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
    em: ({ children }: any) => <em className="italic text-obsidian">{children}</em>,
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

  if (sanityPost) {
    const pubDate = new Date(sanityPost.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return (
      <>
        {/* ─── ARTICLE HERO ────────────────────────────── */}
        <section className="pt-32 pb-0 bg-parchment">
          <div className="container mx-auto px-6 md:px-16 max-w-4xl">
            <span className="eyebrow">{sanityPost.category || "General"}</span>
            <h1 className="font-serif text-4xl md:text-6xl text-obsidian leading-[1.05] mt-3 mb-6">
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

  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <>
      {/* ─── ARTICLE HERO ────────────────────────────── */}
      <section className="pt-32 pb-0 bg-parchment">
        <div className="container mx-auto px-6 md:px-16 max-w-4xl">
          <span className="eyebrow">{post.category}</span>
          <h1 className="font-serif text-4xl md:text-6xl text-obsidian leading-[1.05] mt-3 mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mb-10">
            <span className="font-sans text-sm text-warm-gray">{post.date}</span>
            <span className="text-obsidian/20">·</span>
            <span className="font-sans text-sm text-warm-gray">{post.readTime}</span>
          </div>
        </div>
        {/* Full-bleed hero image */}
        <div className="w-full aspect-[21/9] md:aspect-[21/7] max-h-[480px]">
          <ImagePlaceholder
            label={post.imgLabel}
            description={post.imgDescription}
            mood="warm"
            className="w-full h-full"
          />
        </div>
      </section>

      {/* ─── ARTICLE BODY ────────────────────────────── */}
      <article className="bg-parchment py-16">
        <div className="container mx-auto px-6 md:px-16 max-w-3xl">
          <div className="prose-like space-y-6">
            {post.body.map((para, i) => (
              <p
                key={i}
                className="font-sans text-obsidian/80 text-base md:text-lg leading-relaxed"
              >
                {renderBody(para)}
              </p>
            ))}
          </div>

          {/* Author card */}
          <div className="mt-16 border-t border-obsidian/[0.08] pt-10 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-linen flex-shrink-0">
              <div className="w-full h-full bg-roots-orange/20 flex items-center justify-center">
                <span className="font-serif text-roots-orange text-xl">R</span>
              </div>
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-obsidian">{post.author}</p>
              <p className="font-sans text-xs text-warm-gray">{post.authorRole} · Root&apos;s The Family Salon</p>
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

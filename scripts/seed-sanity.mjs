/**
 * seed-sanity.mjs — Populate Sanity CMS with current hardcoded content
 *
 * Run once:   node scripts/seed-sanity.mjs
 *
 * This creates/updates the singleton documents (homePage, aboutPage,
 * franchisePage, siteSettings) and the location documents so that
 * the Studio shows exactly the same content that's live on the site.
 *
 * Uses createOrReplace — safe to run multiple times (idempotent).
 */

import { createClient } from "@sanity/client";
import "dotenv/config";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ncrxhomy",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ═══════════════════════════════════════════════════════════════════════════
// 1. Site Settings
// ═══════════════════════════════════════════════════════════════════════════
const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  yearsOfMastery: "8+",
  googleRating: "4.8/5",
  reviewCount: "1,600+",
  branchCount: "2",
  offerBannerEnabled: true,
  offerBannerText: "Book via WhatsApp & get 10% off your first visit",
  contactEmail: "rootsbyaj9@gmail.com",
  contactPhone: "+91 97007 44357",
  contactWhatsApp: "919700744357",
  socialInstagram: "https://www.instagram.com/roots_by_aj",
  socialFacebook: "https://www.facebook.com/anikanth.jadhav.1",
  footerTagline:
    "Hyderabad's family salon — premium hair, skin, and beauty services across 3 branches. Crafted for every generation.",
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. Home Page
// ═══════════════════════════════════════════════════════════════════════════
const homePage = {
  _id: "homePage",
  _type: "homePage",
  // Hero
  heroEyebrow: "Hyderabad's Premium Family Salon",
  heroHeadline: "Your Complete Destination for",
  heroHeadlineItalic: "Hair, Skin, Bridal & Tattoo in Hyderabad",
  heroCtaText: "Book Your Appointment",
  // Stats
  statYears: 8,
  statRating: 4.8,
  statLocations: 2,
  statReviews: 1.6,
  // Services section text
  servicesHeadline: "Curated Services",
  servicesSubheadline: "Expert stylists. Premium products. Every visit.",
  // Transformations section text
  transformationsHeadline: "Real Results",
  transformationsSubheadline: "Drag to compare — see what our stylists can do.",
  // CTA
  ctaHeadline: "Ready for your look?",
  ctaButtonText: "Book Consultation via WhatsApp",
};

// ═══════════════════════════════════════════════════════════════════════════
// 3. About Page
// ═══════════════════════════════════════════════════════════════════════════
const aboutPage = {
  _id: "aboutPage",
  _type: "aboutPage",
  heroEyebrow: "OUR STORY",
  heroHeadline: "We started Root's for our family.",
  heroSubtext:
    "Root's The Family Salon — where every generation walks out feeling their best. Expert hair, skin, bridal and tattoo services in Hyderabad.",
  founderName: "Anikanth Jadhav",
  founderHeadline: "I started Root's for my family.",
  founderQuote:
    "I wanted one place where my parents, my spouse, my kids — every generation — could walk out feeling their best. That's still why I do this.",
  founderBio1:
    "Before Root's, Hyderabad had a clear gap — boutique-quality salons were expensive and inaccessible; affordable salons often cut corners. We built the alternative: premium technique, professional-grade products, and a genuinely warm space that welcomes every age and every budget.",
  founderBio2:
    "Three branches later, we're still that same place my family visits every month. We've simply invited more families in.",
  valuesHeading: "Our three principles.",
  values: [
    {
      _key: "v1",
      number: "01",
      title: "Craft Over Shortcuts",
      body: "Every service follows a method — no rushing, no skipping steps. Our stylists are trained to treat technique as an art, not a transaction.",
    },
    {
      _key: "v2",
      number: "02",
      title: "Family First",
      body: "A 10-year-old getting their first haircut should feel as valued as a bride on her big day. We designed Root's for every generation of the family.",
    },
    {
      _key: "v3",
      number: "03",
      title: "Honest Expertise",
      body: "We'll never upsell a treatment you don't need. Our consultations are honest, our pricing is transparent, and our recommendations are always in your interest.",
    },
    {
      _key: "v4",
      number: "04",
      title: "Constant Evolution",
      body: "Our team trains continuously — new techniques, new products, new global trends. The industry moves fast, and Root's moves with it.",
    },
  ],
  timelineHeading: "Eight years of growing together.",
  milestones: [
    { _key: "m1", year: "2017", event: "Root's opens its first salon in Uppal, Hyderabad — a 400 sq ft studio with 2 chairs." },
    { _key: "m2", year: "2019", event: "Crossed 500 Google reviews with 4.8★ average. Added bridal and skin services." },
    { _key: "m3", year: "2021", event: "Expanded to a full 1,200 sq ft flagship. Introduced tattoo artistry and nail studio." },
    { _key: "m4", year: "2023", event: "Opened our second branch in Tarnaka, Secunderabad — bringing the Root's experience to South Lallaguda." },
    { _key: "m5", year: "2025", event: "1,600+ reviews. 2 branches. Third location in progress. Franchise expansion begins." },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// 4. Franchise Page
// ═══════════════════════════════════════════════════════════════════════════
const franchisePage = {
  _id: "franchisePage",
  _type: "franchisePage",
  heroEyebrow: "FRANCHISE OPPORTUNITY",
  heroHeadline: "Own a Root's.",
  heroSubtext:
    "Bring Hyderabad's most trusted family salon to your city. We'll give you the brand, the training, and the support. You bring the ambition.",
  reasonsHeading: "Built for successful franchise partners.",
  reasons: [
    {
      _key: "r1",
      title: "A Brand People Trust",
      body: "Root's has built a loyal customer base across Hyderabad over 5 years. When you open a Root's franchise, you inherit that trust immediately — not having to build it from zero.",
    },
    {
      _key: "r2",
      title: "Full Training & Ongoing Support",
      body: "From recruitment and pricing to operations and client management — we train your team and stay available. Our franchise partners never feel alone.",
    },
    {
      _key: "r3",
      title: "Exclusive Territory Rights",
      body: "Each franchise is given exclusive geographic territory. No Root's outlet will open within your zone — your market is protected.",
    },
  ],
  modelHeading: "A model built to win.",
  modelPoints: [
    { _key: "mp1", label: "Investment Range", value: "₹15L – ₹30L (depending on location & size)" },
    { _key: "mp2", label: "Avg. Break-even", value: "12–18 months" },
    { _key: "mp3", label: "Royalty", value: "6% of monthly revenue" },
    { _key: "mp4", label: "Training Duration", value: "4 weeks (on-site at Hyderabad HQ)" },
    { _key: "mp5", label: "Launch Support", value: "Grand Opening marketing, local social campaign" },
    { _key: "mp6", label: "Territories Open", value: "Pan-India (priority to Hyderabad zones)" },
  ],
  faqHeading: "FAQ",
  faqs: [
    {
      _key: "f1",
      q: "Do I need prior experience in the beauty industry?",
      a: "No. Business acumen and a passion for customer experience are more important. We train your staff on all technical skills.",
    },
    {
      _key: "f2",
      q: "How long does it take to open after signing?",
      a: "Typically 60–90 days from agreement to grand opening. This includes location fit-out, staff recruitment, and training.",
    },
    {
      _key: "f3",
      q: "What kind of support do I receive after launch?",
      a: "Dedicated franchise coordinator, monthly performance reviews, access to Root's marketing materials, product sourcing at partner rates, and priority support for any operational issues.",
    },
    {
      _key: "f4",
      q: "Can I open in a city outside Hyderabad?",
      a: "Yes. We are actively looking for franchise partners across Telangana and Andhra Pradesh. Pan-India expansion is in the pipeline for 2025–26.",
    },
    {
      _key: "f5",
      q: "Is there a minimum salon size requirement?",
      a: "We recommend a minimum of 800 sq. ft. Smaller formats (600 sq. ft.) are possible for express-service outlets.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// 5. Locations
// ═══════════════════════════════════════════════════════════════════════════
const locations = [
  {
    _id: "location-uppal",
    _type: "location",
    name: "Root's The Family Salon — Uppal",
    address:
      "#10-25/7, Taj Mahal Colony, Peerzadiguda Road, opp. Global Indian International School, Uppal, Hyderabad 500039",
    phone: "+919700744357",
    whatsappNumber: "919700744357",
    description:
      "Experience premium styling at our signature Uppal location. Let our experts craft your perfect look.",
    hours: "Mon–Sun: 10 AM – 9 PM",
    googleMapsUrl: "https://maps.app.goo.gl/ocq8uts9jYaCp3bu8",
    embedUrl:
      "https://www.google.com/maps?q=17.397388,78.5885877&hl=en&z=15&output=embed",
    isActive: true,
    displayOrder: 1,
  },
  {
    _id: "location-tarnaka",
    _type: "location",
    name: "Root's The Family Salon — Tarnaka",
    address:
      "#12-5-16/4, Vijayapuri Colony, opp. St Ann's School, Chenna Reddy Lane, Tarnaka South Lallaguda, Secunderabad 500017",
    phone: "+919700744357",
    whatsappNumber: "919700744357",
    description:
      "Our second branch offering the identical luxurious Root's experience in Tarnaka.",
    hours: "Mon–Sun: 10 AM – 9 PM",
    googleMapsUrl: "https://maps.app.goo.gl/HtxnUPQ9b9a4f5Qv7",
    embedUrl:
      "https://www.google.com/maps?q=17.4304751,78.5329607&hl=en&z=15&output=embed",
    isActive: true,
    displayOrder: 2,
  },
  {
    _id: "location-new",
    _type: "location",
    name: "Root's The Family Salon — Coming Soon",
    address: "Hyderabad",
    phone: "+919700744357",
    whatsappNumber: "919700744357",
    description:
      "Our third branch is opening soon! We are bringing the premium Root's experience to a new neighborhood.",
    hours: "Opening Soon",
    isActive: true,
    displayOrder: 3,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// RUN
// ═══════════════════════════════════════════════════════════════════════════
async function seed() {
  console.log("🌱 Seeding Sanity CMS with current site content...\n");

  const docs = [siteSettings, homePage, aboutPage, franchisePage, ...locations];

  for (const doc of docs) {
    try {
      await client.createOrReplace(doc);
      console.log(`  ✅ ${doc._type} → ${doc._id}`);
    } catch (err) {
      console.error(`  ❌ ${doc._type} → ${doc._id}:`, err.message);
    }
  }

  console.log(
    "\n✨ Done! Open /studio to see all content. Images need to be uploaded manually in the Studio."
  );
}

seed();

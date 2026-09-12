import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ncrxhomy",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: token,
  useCdn: false,
});

async function seedSanity() {
  console.log("🚀 Starting complete Sanity CMS pre-seeding...");

  // ── 1. GLOBAL SITE SETTINGS ────────────────────────────────────────────────
  console.log("Seeding siteSettings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    brandName: "Root's The Family Salon",
    yearsOfMastery: 8,
    googleRating: 4.8,
    reviewCount: 1600,
    branchCount: 3,
    offerBannerEnabled: true,
    offerBannerText: "Exclusive 20% Off on your First Visit across all 3 Hyderabad branches! Book Online Today.",
    contactEmail: "rootsbyaj9@gmail.com",
    contactPhone: "+919700744357",
    contactWhatsApp: "919700744357",
    socialInstagram: "https://www.instagram.com/roots_by_aj",
    socialFacebook: "https://www.facebook.com/anikanth.jadhav.1",
    footerTagline: "Hyderabad's family salon — Uppal, Tarnaka & Brahmanpally. Crafted for every generation.",
  });

  // ── 2. HOME PAGE ───────────────────────────────────────────────────────────
  console.log("Seeding homePage...");
  // Fetch existing homePage to preserve any uploaded images
  const existingHomePage = await client.fetch('*[_type == "homePage"][0]').catch(() => null);

  const homePageDoc = {
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: "Hyderabad's premium family salon for hair, skin, bridal & tattoo artistry",
    heroHeadline: "Walk in.",
    heroHeadlineItalic: "Walk out different.",
    heroSubtitle: "Crafted styling, precision treatments, and bespoke artistry across our 3 luxury Hyderabad locations.",
    heroCtaText: "Book Appointment",
    statYears: 8,
    statRating: 4.8,
    statLocations: 3,
    statReviews: 1.6,
    servicesHeadline: "Curated Services",
    servicesSubheadline: "Specialized beauty, precision haircutting, and artistic body styling tailored to your persona.",
    stickyEyebrow: "Why Choose Root's",
    stickyHeadline: "Defining Beauty Standards in",
    stickyHeadlineAccent: "Hyderabad.",
    transformationsHeadline: "Visible Transformations",
    transformationsSubheadline: "Drag the slider to reveal real before and after results achieved at Root's Family Salon.",
    ctaHeadline: "Ready to Transform Your Look?",
    ctaSubtitle: "Walk in to any of our 3 Hyderabad branches or schedule your consultation online today.",
    ctaButtonText: "Book Consultation",
    // Preserve existing image references if available
    ...(existingHomePage?.heroBackgroundImage && { heroBackgroundImage: existingHomePage.heroBackgroundImage }),
    ...(existingHomePage?.hairServiceImage && { hairServiceImage: existingHomePage.hairServiceImage }),
    ...(existingHomePage?.bridalServiceImage && { bridalServiceImage: existingHomePage.bridalServiceImage }),
    ...(existingHomePage?.skinServiceImage && { skinServiceImage: existingHomePage.skinServiceImage }),
    ...(existingHomePage?.tattooServiceImage && { tattooServiceImage: existingHomePage.tattooServiceImage }),
    ...(existingHomePage?.nailsServiceImage && { nailsServiceImage: existingHomePage.nailsServiceImage }),
    ...(existingHomePage?.piercingServiceImage && { piercingServiceImage: existingHomePage.piercingServiceImage }),
    ...(existingHomePage?.scrollHairCutImage && { scrollHairCutImage: existingHomePage.scrollHairCutImage }),
    ...(existingHomePage?.scrollHairColorImage && { scrollHairColorImage: existingHomePage.scrollHairColorImage }),
    ...(existingHomePage?.scrollHairTextureImage && { scrollHairTextureImage: existingHomePage.scrollHairTextureImage }),
    ...(existingHomePage?.scrollNailArtImage && { scrollNailArtImage: existingHomePage.scrollNailArtImage }),
    ...(existingHomePage?.scrollPedicureImage && { scrollPedicureImage: existingHomePage.scrollPedicureImage }),
    ...(existingHomePage?.scrollFacialsImage && { scrollFacialsImage: existingHomePage.scrollFacialsImage }),
    ...(existingHomePage?.scrollHeadSpaImage && { scrollHeadSpaImage: existingHomePage.scrollHeadSpaImage }),
    ...(existingHomePage?.scrollBridalImage && { scrollBridalImage: existingHomePage.scrollBridalImage }),
    ...(existingHomePage?.beforeAfterHairBefore && { beforeAfterHairBefore: existingHomePage.beforeAfterHairBefore }),
    ...(existingHomePage?.beforeAfterHairAfter && { beforeAfterHairAfter: existingHomePage.beforeAfterHairAfter }),
    ...(existingHomePage?.beforeAfterSkinBefore && { beforeAfterSkinBefore: existingHomePage.beforeAfterSkinBefore }),
    ...(existingHomePage?.beforeAfterSkinAfter && { beforeAfterSkinAfter: existingHomePage.beforeAfterSkinAfter }),
    ...(existingHomePage?.partners && { partners: existingHomePage.partners }),
  };

  await client.createOrReplace(homePageDoc);

  // ── 3. ABOUT PAGE ──────────────────────────────────────────────────────────
  console.log("Seeding aboutPage...");
  const existingAboutPage = await client.fetch('*[_type == "aboutPage"][0]').catch(() => null);

  const aboutPageDoc = {
    _id: "aboutPage",
    _type: "aboutPage",
    heroEyebrow: "OUR STORY",
    heroHeadline: "We started Root's for our family.",
    heroSubtext: "Root's The Family Salon — where every generation walks out feeling their best. Expert hair, skin, bridal and tattoo services in Hyderabad.",
    founderName: "Anikanth Jadhav",
    founderHeadline: "I started Root's for my family.",
    founderQuote: "Every guest who walks into Root's is family. Passion brought us from banking to styling, and that care is in every cut and consultation.",
    founderBio1: "Before Root's, Hyderabad had a clear gap — boutique-quality salons were expensive and inaccessible; affordable salons often cut corners. We built the alternative: premium technique, professional-grade products, and a genuinely warm space that welcomes every age and every budget.",
    founderBio2: "Three branches later, we're still that same place my family visits every month. We've simply invited more families in.",
    timelineHeading: "Eight years of growing together.",
    milestones: [
      { _key: "m1", year: "2016", event: "First flagship salon opened in Uppal." },
      { _key: "m2", year: "2019", event: "Expanded to Tarnaka with full bridal studio and tattoo artistry." },
      { _key: "m3", year: "2024", event: "Opened our premier Brahmanpally branch serving families across Hyderabad." },
    ],
    valuesHeading: "Our Four Principles.",
    values: [
      {
        _key: "v1",
        number: "01",
        title: "Uncompromising Craftsmanship",
        body: "Every cut, color, and stroke is executed by verified master stylists trained in modern international technique.",
      },
      {
        _key: "v2",
        number: "02",
        title: "Clinical Hygiene & Safety",
        body: "Hospital-grade sterilization for tools, disposable kits, single-use sheets, and organic ammonia-free products.",
      },
      {
        _key: "v3",
        number: "03",
        title: "Continuous Innovation",
        body: "From Korean head spas to Nanoplastia and fine-line tattoos, we bring the latest global beauty science to Hyderabad.",
      },
      {
        _key: "v4",
        number: "04",
        title: "Warm Family Hospitality",
        body: "No high-pressure sales, no intimidation. An inviting, comfortable sanctuary for children, parents, and grandparents alike.",
      },
    ],
    ...(existingAboutPage?.founderImage && { founderImage: existingAboutPage.founderImage }),
    ...(existingAboutPage?.aboutBackgroundImage && { aboutBackgroundImage: existingAboutPage.aboutBackgroundImage }),
  };

  await client.createOrReplace(aboutPageDoc);

  // ── 4. BRANCH LOCATIONS ────────────────────────────────────────────────────
  console.log("Seeding branch locations...");
  const locations = [
    {
      _id: "branch-uppal",
      _type: "location",
      name: "Root's The Family Salon — Uppal",
      shortName: "Uppal",
      slug: { _type: "slug", current: "uppal" },
      displayOrder: 1,
      address: "#10-25/7, Taj Mahal Colony, Peerzadiguda Road, opp. Global Indian International School, Uppal, Hyderabad 500039",
      phone: "+919700744357",
      whatsappNumber: "919700744357",
      hours: "Mon–Sun: 10:00 AM – 9:00 PM",
      googleMapsUrl: "https://maps.app.goo.gl/ocq8uts9jYaCp3bu8",
      embedUrl: "https://www.google.com/maps?q=17.397388,78.5885877&hl=en&z=15&output=embed",
      description: "Our flagship Hyderabad branch. Complete hair masterclass, skin rituals, bridal suite, and sterile tattoo artistry in Uppal.",
    },
    {
      _id: "branch-tarnaka",
      _type: "location",
      name: "Root's The Family Salon — Tarnaka",
      shortName: "Tarnaka",
      slug: { _type: "slug", current: "tarnaka" },
      displayOrder: 2,
      address: "#12-5-16/4, Vijayapuri Colony, opp. St Ann's School, Chenna Reddy Lane, Tarnaka South Lallaguda, Secunderabad 500017",
      phone: "+919700744357",
      whatsappNumber: "919700744357",
      hours: "Mon–Sun: 10:00 AM – 9:00 PM",
      googleMapsUrl: "https://maps.app.goo.gl/HtxnUPQ9b9a4f5Qv7",
      embedUrl: "https://www.google.com/maps?q=17.4304751,78.5329607&hl=en&z=15&output=embed",
      description: "Our signature second location delivering the same warm family hospitality and premium hair and skin rituals in Tarnaka.",
    },
    {
      _id: "branch-brahmanpally",
      _type: "location",
      name: "Root's The Family Salon — Brahmanpally",
      shortName: "Brahmanpally",
      slug: { _type: "slug", current: "brahmanpally" },
      displayOrder: 3,
      address: "Plot No 42, Sagar Ring Road, Near RTO Office, Brahmanpally, Hyderabad 500079",
      phone: "+919700744357",
      whatsappNumber: "919700744357",
      hours: "Mon–Sun: 10:00 AM – 9:00 PM",
      googleMapsUrl: "https://maps.app.goo.gl/j3aU9t2HkKkWL7Qy7",
      embedUrl: "https://www.google.com/maps?q=17.3374,78.5529&hl=en&z=15&output=embed",
      description: "Our newest luxury family salon location in Brahmanpally with dedicated hair, bridal, and men's grooming lounges.",
    },
  ];

  for (const loc of locations) {
    const existingLoc = await client.fetch(`*[_type == "location" && _id == "${loc._id}"][0]`).catch(() => null);
    if (existingLoc?.photo) {
      loc.photo = existingLoc.photo;
    }
    await client.createOrReplace(loc);
  }

  // ── 5. SERVICES MENU CATEGORIES ────────────────────────────────────────────
  console.log("Seeding service categories...");
  const categories = [
    {
      _id: "cat-womens-hair",
      _type: "serviceCategory",
      title: "Hair Masterclass",
      slug: { _type: "slug", current: "hair-masterclass" },
      gender: "womens",
      displayOrder: 1,
      eyebrow: "Precision Cuts & Colour",
      description: "Expert cuts, colour transformations, smoothening, and deep nourishing spa rituals for every hair texture.",
    },
    {
      _id: "cat-womens-skin",
      _type: "serviceCategory",
      title: "Skin Rituals",
      slug: { _type: "slug", current: "skin-rituals" },
      gender: "womens",
      displayOrder: 2,
      eyebrow: "Clinical Care & Glow",
      description: "Advanced facials, detox cleanups, organic peels, D-tan, and therapeutic manicure-pedicure rituals.",
    },
    {
      _id: "cat-womens-refinement",
      _type: "serviceCategory",
      title: "Refinement & Details",
      slug: { _type: "slug", current: "refinement" },
      gender: "womens",
      displayOrder: 3,
      eyebrow: "Finishing Details",
      description: "Gentle threading, painless waxing, bleaching, and everyday grooming touches.",
    },
    {
      _id: "cat-bridal",
      _type: "serviceCategory",
      title: "Bridal Studio",
      slug: { _type: "slug", current: "bridal-studio" },
      gender: "bridal",
      displayOrder: 4,
      eyebrow: "Bespoke Celebrations",
      description: "Complete HD bridal makeup, pre-bridal skin prep, intricate hair artistry, saree draping, and customized trials.",
    },
    {
      _id: "cat-mens-hair",
      _type: "serviceCategory",
      title: "Men's Grooming",
      slug: { _type: "slug", current: "mens-grooming" },
      gender: "mens",
      displayOrder: 5,
      eyebrow: "Sharp Cuts & Beard Craft",
      description: "Precision fades, classic scissor cuts, hot towel shaves, beard sculpting, and hair spa for gentlemen.",
    },
    {
      _id: "cat-mens-skin",
      _type: "serviceCategory",
      title: "Men's Skin & Spa",
      slug: { _type: "slug", current: "mens-skin" },
      gender: "mens",
      displayOrder: 6,
      eyebrow: "Freshness & Care",
      description: "Deep-cleansing facials, charcoal detox, D-tan treatments, and hand & foot grooming.",
    },
    {
      _id: "cat-tattoo",
      _type: "serviceCategory",
      title: "Tattoo Artistry",
      slug: { _type: "slug", current: "tattoo-artistry" },
      gender: "tattoo",
      displayOrder: 7,
      eyebrow: "Permanent Art",
      description: "Sterile, custom fine-line, geometric, portraits, and cover-up tattoo artistry by resident master artists.",
    },
  ];

  for (const cat of categories) {
    await client.createOrReplace(cat);
  }

  // ── 6. FRANCHISE PAGE ──────────────────────────────────────────────────────
  console.log("Seeding franchisePage...");
  await client.createOrReplace({
    _id: "franchisePage",
    _type: "franchisePage",
    heroHeadline: "Grow with Root's Family Salon",
    heroSubheadline: "Partner with Hyderabad's premier salon brand. Proven ROI, complete operational support, and master-trained stylists.",
    investmentMin: "25 Lakhs",
    investmentMax: "45 Lakhs",
    roiPeriod: "18–24 Months",
    supportIncluded: [
      "Site selection & architectural design",
      "Comprehensive staff recruitment & master training",
      "Full supply chain for professional salon products",
      "Centralized digital marketing, SEO, and local promotions",
    ],
  });

  console.log("✅ Sanity CMS pre-seeding completed successfully!");
}

seedSanity().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});

/**
 * seed-services.mjs
 *
 * Populates Sanity with every service category and item
 * exactly as they appear on the live website.
 *
 * Run: node scripts/seed-services.mjs
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { readFileSync } from "fs";

// Load .env.local
try {
  const env = readFileSync(".env.local", "utf-8");
  env.split("\n").forEach((line) => {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) {
      let val = rest.join("=").trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      process.env[key.trim()] = val;
    }
  });
} catch {
  dotenv.config();
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ─── ALL SERVICE CATEGORIES ──────────────────────────────────────────────────
const categories = [

  // ══════════════════════════════════════════════════════════════════
  //  WOMEN'S MENU
  // ══════════════════════════════════════════════════════════════════

  {
    _id: "serviceCategory-womens-hair",
    _type: "serviceCategory",
    title: "Hair Masterclass",
    slug: { _type: "slug", current: "hair-masterclass" },
    gender: "womens",
    displayOrder: 1,
    items: [
      // HAIR CUT
      { _key: "wh-1",  name: "U Cut",                                   price: "₹400" },
      { _key: "wh-2",  name: "V Cut",                                   price: "₹400" },
      { _key: "wh-3",  name: "Straight Cut",                            price: "₹400" },
      { _key: "wh-4",  name: "Advance Hair Cut",                        price: "₹800" },
      { _key: "wh-5",  name: "Kid Cut",                                  price: "₹400" },
      { _key: "wh-6",  name: "Head Massage",                            price: "₹300" },
      { _key: "wh-7",  name: "Shampoo + Conditioning + Blast Dry",      price: "₹350" },
      { _key: "wh-8",  name: "Blow Dry",                                price: "₹450" },
      { _key: "wh-9",  name: "Iron Curls",                              price: "₹650 onwards" },
      { _key: "wh-10", name: "Tong Curls",                              price: "₹1000 onwards" },
      // HAIR COLOURING
      { _key: "wh-11", name: "Root Touch Up (Ammonia Free)",            price: "₹1200" },
      { _key: "wh-12", name: "Global Colour (Ammonia Free)",            price: "₹2200 onwards" },
      // HIGHLIGHTS
      { _key: "wh-13", name: "Global Highlights",                       price: "S: ₹2000 / M: ₹2500 / L: ₹3500" },
      { _key: "wh-14", name: "Crown Highlights",                        price: "₹1500 onwards" },
      { _key: "wh-15", name: "Funk's (1 Foil)",                         price: "₹350 onwards" },
      // HAIR SMOOTHENING
      { _key: "wh-16", name: "Smoothening S/M/L",                      price: "₹4500/5000/6500 onwards" },
      { _key: "wh-17", name: "Rebonding S/M/L",                        price: "₹4500/5000/6500 onwards" },
      { _key: "wh-18", name: "Keratin S/M/L",                          price: "₹5500/6500/8000 onwards" },
      // HAIR SPA
      { _key: "wh-19", name: "Dry Hair Spa",                           price: "₹1000 onwards" },
      { _key: "wh-20", name: "Smooth Straight Hair Spa",               price: "₹1400 onwards" },
      { _key: "wh-21", name: "Hair Fall Control Spa",                   price: "₹1500 onwards" },
      { _key: "wh-22", name: "Frizz Control",                          price: "₹1200 onwards" },
      { _key: "wh-23", name: "Repair & Rejuvenate",                    price: "₹1500 onwards" },
      // HAIR TREATMENT
      { _key: "wh-24", name: "Anti Hair Fall Treatment",               price: "₹1400 onwards" },
      { _key: "wh-25", name: "Anti-Dandruff Treatment",                price: "₹1500 onwards" },
      { _key: "wh-26", name: "Keratin Spa Treatment",                  price: "₹2000 onwards" },
    ],
  },

  {
    _id: "serviceCategory-womens-skin",
    _type: "serviceCategory",
    title: "Skin Rituals",
    slug: { _type: "slug", current: "skin-rituals" },
    gender: "womens",
    displayOrder: 2,
    items: [
      // WAXING
      { _key: "ws-1",  name: "Full Arms (Normal / Chocolate / Rica)",    price: "₹250 / ₹400 / ₹650" },
      { _key: "ws-2",  name: "Full Legs (Normal / Chocolate / Rica)",    price: "₹600 / ₹700 / ₹1400" },
      { _key: "ws-3",  name: "Half Legs (Normal / Chocolate / Rica)",    price: "₹300 / ₹350 / ₹700" },
      { _key: "ws-4",  name: "Under Arms (Normal / Chocolate / Rica)",   price: "₹100 / ₹150 / ₹250" },
      { _key: "ws-5",  name: "Full Face (Normal / Chocolate)",           price: "₹100 / ₹200" },
      { _key: "ws-6",  name: "Upper Lip (Normal / Chocolate)",           price: "₹50 / ₹70" },
      { _key: "ws-7",  name: "Chin (Normal / Chocolate)",                price: "₹40 / ₹50" },
      { _key: "ws-8",  name: "Full Body Waxing (Normal / Choc / Rica)",  price: "₹1000 / ₹1500 / ₹2200 onwards" },
      // D-TAN
      { _key: "ws-9",  name: "D-Tan Face & Neck",                       price: "₹600" },
      { _key: "ws-10", name: "D-Tan Face & Neck Blouse Line",           price: "₹800" },
      { _key: "ws-11", name: "D-Tan Full Arms",                         price: "₹800" },
      { _key: "ws-12", name: "D-Tan Full Legs",                         price: "₹1000" },
      { _key: "ws-13", name: "D-Tan Half Arms",                         price: "₹400" },
      { _key: "ws-14", name: "D-Tan Half Legs",                         price: "₹500" },
      { _key: "ws-15", name: "D-Tan Full Back/Front",                   price: "₹1000" },
      // FACIALS
      { _key: "ws-16", name: "Clean Up",                                price: "₹500" },
      { _key: "ws-17", name: "Fruit Facial",                            price: "₹800" },
      { _key: "ws-18", name: "Pearl Facial",                            price: "₹1400" },
      { _key: "ws-19", name: "Gold Facial",                             price: "₹1800" },
      { _key: "ws-20", name: "Silver Facial",                           price: "₹1400" },
      { _key: "ws-21", name: "Diamond Facial",                          price: "₹1500" },
      { _key: "ws-22", name: "Skin Whitening Facial",                   price: "₹2200" },
      { _key: "ws-23", name: "Skin Tightening",                         price: "₹1800" },
      { _key: "ws-24", name: "Shahnaz Diamond",                         price: "₹2200" },
      { _key: "ws-25", name: "Shahnaz Gold",                            price: "₹2400" },
      // CHERYL'S COSMECEUTICALS
      { _key: "ws-26", name: "Glovite Facial",                          price: "₹2800" },
      { _key: "ws-27", name: "Oxy Blast Facial",                        price: "₹2100" },
      { _key: "ws-28", name: "Tan Clear Facial",                        price: "₹2300" },
      { _key: "ws-29", name: "Sensi Glow Facial",                       price: "₹2800" },
      { _key: "ws-30", name: "Clari Glow Facial",                       price: "₹3000" },
      { _key: "ws-31", name: "O2C2 Facial",                             price: "₹4000" },
      // O3+ FACIALS
      { _key: "ws-32", name: "O3+ D Tan Clean Up",                      price: "₹1000" },
      { _key: "ws-33", name: "O3+ Pore & Purifying Cleanup",            price: "₹1100" },
      { _key: "ws-34", name: "O3+ Whitening & Hydra Facial",            price: "₹3000" },
      { _key: "ws-35", name: "O3+ Purifying & Detox Facial",            price: "₹2200" },
      { _key: "ws-36", name: "O3+ Bridal Facial",                       price: "₹4000" },
      { _key: "ws-37", name: "Protein Peel",                            price: "₹1500" },
      { _key: "ws-38", name: "Acne & Blackhead Control Peel",           price: "₹1800" },
      { _key: "ws-39", name: "Lightning Peel",                          price: "₹1700" },
      { _key: "ws-40", name: "Shine & Luminous Glow Peel",              price: "₹1800" },
      { _key: "ws-41", name: "Glow Active Procedure Peel",              price: "₹2200" },
      { _key: "ws-42", name: "O3+ Luxury Pedicure",                     price: "₹1500" },
      // PEDICURE / MANICURE
      { _key: "ws-43", name: "Basic Pedicure",                          price: "₹800" },
      { _key: "ws-44", name: "Basic Manicure",                          price: "₹500" },
      { _key: "ws-45", name: "Mini Pedicure",                           price: "₹1300" },
      { _key: "ws-46", name: "Mini Manicure",                           price: "₹1000" },
      { _key: "ws-47", name: "Crystal Spa Pedicure",                    price: "₹1300" },
      { _key: "ws-48", name: "Crystal Spa Manicure",                    price: "₹950" },
      // BODY RELAXING MASSAGE
      { _key: "ws-49", name: "Full Body Scrub",                         price: "₹1200" },
      { _key: "ws-50", name: "Full Body Coco Butter Massage",           price: "₹1500" },
      { _key: "ws-51", name: "Full Body D-Tan Removal",                 price: "₹3500" },
    ],
  },

  {
    _id: "serviceCategory-womens-refinement",
    _type: "serviceCategory",
    title: "Refinement",
    slug: { _type: "slug", current: "refinement" },
    gender: "womens",
    displayOrder: 3,
    items: [
      // THREADING
      { _key: "wr-1",  name: "Eyebrow Threading",   price: "₹50"  },
      { _key: "wr-2",  name: "Upper Lip Threading",  price: "₹40"  },
      { _key: "wr-3",  name: "Forehead Threading",   price: "₹50"  },
      { _key: "wr-4",  name: "Chin Threading",       price: "₹50"  },
      { _key: "wr-5",  name: "Full Face Threading",  price: "₹200" },
      { _key: "wr-6",  name: "Neck Threading",       price: "₹70"  },
      { _key: "wr-7",  name: "Side Locks Threading", price: "₹70"  },
      // BLEACH
      { _key: "wr-8",  name: "Face Bleach (Oxy)",       price: "₹350" },
      { _key: "wr-9",  name: "Neck Bleach",              price: "₹250" },
      { _key: "wr-10", name: "Gold Face Bleach",         price: "₹500" },
      { _key: "wr-11", name: "Blouse Line Bleach",       price: "₹350" },
      { _key: "wr-12", name: "Stomach Bleach",           price: "₹500" },
      { _key: "wr-13", name: "Underarms Bleach",         price: "₹150" },
      { _key: "wr-14", name: "Full Arm Bleach",          price: "₹600" },
      { _key: "wr-15", name: "Half Arm Bleach",          price: "₹350" },
      { _key: "wr-16", name: "Half Leg Bleach",          price: "₹500" },
      { _key: "wr-17", name: "Full Leg Bleach",          price: "₹1000" },
      { _key: "wr-18", name: "Full Back / Front Bleach", price: "₹600 / ₹800" },
      { _key: "wr-19", name: "Full Body Bleach",         price: "₹2000" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  BRIDAL STUDIO
  // ══════════════════════════════════════════════════════════════════

  {
    _id: "serviceCategory-bridal",
    _type: "serviceCategory",
    title: "Bridal Studio",
    slug: { _type: "slug", current: "bridal-studio" },
    gender: "bridal",
    displayOrder: 1,
    items: [
      // MAKEUP — HD
      { _key: "br-1",  name: "Party Makeup",                          price: "₹1,500" },
      { _key: "br-2",  name: "Saree Draping",                         price: "₹500 / ₹400" },
      { _key: "br-3",  name: "Hair Style",                            price: "₹600 / ₹1,000 / ₹2,000" },
      { _key: "br-4",  name: "Reception Bridal Makeup (HD)",          price: "₹15,000", isHighlighted: true },
      { _key: "br-5",  name: "Wedding Bridal Makeup HD",              price: "₹15,000", isHighlighted: true },
      { _key: "br-6",  name: "Eng / Mehndi / Sangeet / Haldi (HD)",   price: "₹10,000" },
      // MAKEUP — NON HD
      { _key: "br-7",  name: "Reception Bridal Makeup (Non-HD)",       price: "₹10,000" },
      { _key: "br-8",  name: "Wedding Bridal Makeup (Non-HD)",         price: "₹10,000" },
      { _key: "br-9",  name: "Eng / Mehndi / Sangeet / Haldi (Non-HD)",price: "₹8,000" },
      // MAKEUP — LIGHT
      { _key: "br-10", name: "Baby Shower Makeup",                    price: "₹4,000" },
      { _key: "br-11", name: "Model Make-up",                         price: "₹4,000" },
      // NAIL ART
      { _key: "br-12", name: "Gel Polish",                            price: "₹850" },
      { _key: "br-13", name: "Fake Nails + Gel Polish",               price: "₹1,050" },
      { _key: "br-14", name: "Nail Extensions / Acrylic Gel Polish",  price: "₹2,500" },
      { _key: "br-15", name: "Nail Polish Removal",                   price: "₹250" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  MEN'S MENU
  // ══════════════════════════════════════════════════════════════════

  {
    _id: "serviceCategory-mens-hair",
    _type: "serviceCategory",
    title: "Men's Grooming",
    slug: { _type: "slug", current: "mens-grooming" },
    gender: "mens",
    displayOrder: 1,
    items: [
      // HAIR CUTS
      { _key: "mh-1",  name: "Haircut",                               price: "₹200" },
      { _key: "mh-2",  name: "Advanced Haircut",                      price: "₹250" },
      { _key: "mh-3",  name: "Clean Shave",                           price: "₹100" },
      { _key: "mh-4",  name: "Beard Styling",                         price: "₹100" },
      { _key: "mh-5",  name: "Hair Wash Styling",                     price: "₹150" },
      { _key: "mh-6",  name: "Kid Little Champs",                     price: "₹200" },
      // OIL HEAD MASSAGE
      { _key: "mh-7",  name: "Head Massage (Parachute)",              price: "₹150" },
      { _key: "mh-8",  name: "Herbal Oil Massage",                    price: "₹150" },
      { _key: "mh-9",  name: "Olive & Almond Oil Massage",            price: "₹250" },
      // HAIR COLOURING
      { _key: "mh-10", name: "Global Hair Colour",                    price: "₹500" },
      { _key: "mh-11", name: "Global Hair Colour (Ammonia Free)",     price: "₹500" },
      { _key: "mh-12", name: "Fashion Highlights Per Streak",         price: "₹150" },
      { _key: "mh-13", name: "Fashion Global Highlights",             price: "₹600" },
      { _key: "mh-14", name: "Beard Colour",                          price: "₹300" },
      // HAIR SPA
      { _key: "mh-15", name: "Classic Hair Spa",                      price: "₹800" },
      { _key: "mh-16", name: "Dry & Frizzy Control Spa",              price: "₹1,200" },
      { _key: "mh-17", name: "Keratin Hair Spa",                      price: "₹500" },
      { _key: "mh-18", name: "Anti Hair Fall Treatment",              price: "₹1,500" },
      { _key: "mh-19", name: "Anti Dandruff Treatment",               price: "₹1,500" },
      // HAIR STRAIGHTENING
      { _key: "mh-20", name: "Hair Smoothening",                      price: "₹1,500 onwards" },
      { _key: "mh-21", name: "Hair Keratin",                          price: "₹3,000 onwards" },
    ],
  },

  {
    _id: "serviceCategory-mens-skin",
    _type: "serviceCategory",
    title: "Men's Skin",
    slug: { _type: "slug", current: "mens-skin" },
    gender: "mens",
    displayOrder: 2,
    items: [
      // ADD ON MASK
      { _key: "ms-1",  name: "Peel Off Mask",                         price: "₹600" },
      { _key: "ms-2",  name: "Hydra Rejuvenate Mask",                 price: "₹5,000" },
      { _key: "ms-3",  name: "O3+ Rejuvenate Mask",                   price: "₹2,000" },
      // PEDICURE
      { _key: "ms-4",  name: "Pedicure",                              price: "₹600" },
      { _key: "ms-5",  name: "Spa Pedicure",                          price: "₹1,200" },
      { _key: "ms-6",  name: "D-Tan Pedicure",                        price: "₹1,000" },
      // MANICURE
      { _key: "ms-7",  name: "Manicure",                              price: "₹600" },
      { _key: "ms-8",  name: "Spa Manicure",                          price: "₹1,000" },
      { _key: "ms-9",  name: "D-Tan Manicure",                        price: "₹1,250" },
      { _key: "ms-10", name: "Nail Cut & Filling",                    price: "₹150" },
      // D-TAN
      { _key: "ms-11", name: "D-Tan Face & Neck",                     price: "₹450" },
      { _key: "ms-12", name: "D-Tan Raaga & O3+",                     price: "₹800" },
      { _key: "ms-13", name: "D-Tan Full Hands",                      price: "₹1,500" },
      { _key: "ms-14", name: "D-Tan Full Body",                       price: "₹3,000" },
      { _key: "ms-15", name: "Body Polishing",                        price: "₹5,000" },
      // CLEAN UP
      { _key: "ms-16", name: "Basic Cleanup",                         price: "₹400" },
      { _key: "ms-17", name: "Lotus Cleanup",                         price: "₹1,000" },
      { _key: "ms-18", name: "O3+ Cleanup",                           price: "₹1,300" },
      { _key: "ms-19", name: "Raaga Cleanup",                         price: "₹700" },
      // FACIALS
      { _key: "ms-20", name: "Fruit Facial",                          price: "₹800" },
      { _key: "ms-21", name: "Pearl Facial",                          price: "₹1,500" },
      { _key: "ms-22", name: "Gold Facial",                           price: "₹1,800" },
      { _key: "ms-23", name: "Diamond Facial",                        price: "₹1,800" },
      { _key: "ms-24", name: "Skin Whitening",                        price: "₹1,700" },
      { _key: "ms-25", name: "Anti Ageing Facial",                    price: "₹1,800" },
      { _key: "ms-26", name: "Cheryl's Oxy Blast",                    price: "₹3,000" },
      { _key: "ms-27", name: "Cheryl's D-Tan Facial",                 price: "₹3,000" },
      { _key: "ms-28", name: "O3+ Facial",                            price: "₹3,500" },
      // MEN'S MAKEUP
      { _key: "ms-29", name: "Party Makeup",                          price: "₹3,500" },
      { _key: "ms-30", name: "Groom Makeup",                          price: "₹5,000", isHighlighted: true },
      { _key: "ms-31", name: "Trial Makeup",                          price: "₹2,000" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TATTOO ARTISTRY
  // ══════════════════════════════════════════════════════════════════

  {
    _id: "serviceCategory-tattoo",
    _type: "serviceCategory",
    title: "Tattoo Artistry",
    slug: { _type: "slug", current: "tattoo-artistry" },
    gender: "tattoo",
    displayOrder: 1,
    items: [
      { _key: "ta-1", name: "Fine-Line Tattoo (Small)",    price: "₹500 onwards" },
      { _key: "ta-2", name: "Fine-Line Tattoo (Large)",    price: "₹4,000 onwards" },
      { _key: "ta-3", name: "Realism Tattoo",              price: "₹3,000 onwards" },
      { _key: "ta-4", name: "Cover-Up Tattoo",             price: "₹5,000 onwards" },
      { _key: "ta-5", name: "Touch-Up Session",            price: "₹800" },
      { _key: "ta-6", name: "Custom Design Consultation",  price: "Free", isHighlighted: true },
      { _key: "ta-7", name: "Ear Piercing",                price: "₹500" },
    ],
  },
];

// ─── RUN ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log(`\n🌱 Seeding ${categories.length} service categories to Sanity...\n`);

  for (const cat of categories) {
    const { _id, ...doc } = cat;
    try {
      await client.createOrReplace({ _id, ...doc });
      console.log(`  ✅  ${doc.title} (${doc.gender}) — ${doc.items.length} services`);
    } catch (err) {
      console.error(`  ❌  Failed: ${doc.title}`, err.message);
    }
  }

  console.log("\n🎉 Done! Open /studio → ✂️ Services Menu to see and edit all services.\n");
}

run();

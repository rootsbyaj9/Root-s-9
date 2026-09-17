import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

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
} catch (e) {
  console.error("Could not read .env.local", e.message);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  console.log("Syncing categories with Sanity CMS...\n");

  // 1. Fetch current categories
  const currentCats = await client.fetch('*[_type == "serviceCategory"]{ _id, title, "slug": slug.current, gender }');
  console.log("Found existing categories in CMS:", currentCats.map(c => `${c.title} (_id: ${c._id}, gender: ${c.gender})`));

  // 2. Update existing Bridal Studio, Nails, Piercing titles and tabs
  for (const cat of currentCats) {
    if (cat._id === "serviceCategory-bridal" || cat.title.toLowerCase().includes("bridal")) {
      console.log(`Updating ${cat.title} (${cat._id}) title -> 'Bridal Makeover'`);
      await client.patch(cat._id).set({ title: "Bridal Makeover" }).commit();
    } else if (cat.slug === "artistic-nails" || cat.title.toLowerCase().includes("nail")) {
      console.log(`Updating ${cat.title} (${cat._id}) title -> 'Nail Art', gender -> 'nails'`);
      await client.patch(cat._id).set({ title: "Nail Art", gender: "nails" }).commit();
    } else if (cat.slug === "piercing" || cat.slug === "ear-piercing" || cat.title.toLowerCase().includes("piercing")) {
      console.log(`Updating ${cat.title} (${cat._id}) gender -> 'piercing'`);
      await client.patch(cat._id).set({ gender: "piercing" }).commit();
    }
  }

  // 3. Ensure Nails category exists with items if not already populated
  const nailsDoc = currentCats.find(c => c.slug === "artistic-nails" || c.gender === "nails");
  if (nailsDoc) {
    const doc = await client.getDocument(nailsDoc._id);
    if (!doc.items || doc.items.length === 0) {
      console.log("Populating items for Nails category...");
      await client.patch(nailsDoc._id).set({
        items: [
          { _key: "nl-1", name: "Gel Nail Extensions", price: "₹2,500 onwards", isHighlighted: true },
          { _key: "nl-2", name: "Acrylic Nail Extensions", price: "₹2,800 onwards" },
          { _key: "nl-3", name: "Custom Nail Art (Per Finger)", price: "₹150 onwards" },
          { _key: "nl-4", name: "Russian Manicure", price: "₹1,200" },
          { _key: "nl-5", name: "Gel Polish Overlay", price: "₹999" },
          { _key: "nl-6", name: "Crystal Spa Pedicure", price: "₹1,500" },
          { _key: "nl-7", name: "Nail Extension Removal", price: "₹500" },
        ]
      }).commit();
    }
  }

  // 4. Ensure Piercing category has items if empty
  const piercingDoc = currentCats.find(c => c.slug === "piercing");
  if (piercingDoc) {
    const doc = await client.getDocument(piercingDoc._id);
    if (!doc.items || doc.items.length === 0) {
      console.log("Populating items for Piercing category...");
      await client.patch(piercingDoc._id).set({
        items: [
          { _key: "pc-1", name: "Ear Lobe Piercing (Pair)", price: "₹600", isHighlighted: true },
          { _key: "pc-2", name: "Single Lobe Piercing", price: "₹350" },
          { _key: "pc-3", name: "Cartilage / Helix Piercing", price: "₹800" },
          { _key: "pc-4", name: "Tragus Piercing", price: "₹900" },
          { _key: "pc-5", name: "Nose Piercing", price: "₹700" },
          { _key: "pc-6", name: "Belly / Navel Piercing", price: "₹1,500" },
          { _key: "pc-7", name: "Sterile Stud Replacement", price: "₹300" },
        ]
      }).commit();
    }
  }

  // 5. Ensure Hair Extensions exists
  const hasHairExt = currentCats.some(c => c.slug === "hair-extensions" || c.gender === "hair-extensions");
  if (!hasHairExt) {
    console.log("Creating Hair Extensions category in CMS...");
    await client.createOrReplace({
      _id: "serviceCategory-hair-extensions",
      _type: "serviceCategory",
      title: "Hair Extensions",
      slug: { _type: "slug", current: "hair-extensions" },
      gender: "hair-extensions",
      displayOrder: 7,
      items: [
        { _key: "he-1", name: "Clip-In Human Hair Extensions", price: "from ₹8,000", isHighlighted: true },
        { _key: "he-2", name: "Tape-In Extensions Installation", price: "from ₹12,000" },
        { _key: "he-3", name: "Micro-Ring / Nano-Ring Extensions", price: "from ₹15,000" },
        { _key: "he-4", name: "Keratin Fusion Bond Extensions", price: "from ₹18,000" },
        { _key: "he-5", name: "Extension Re-Taping & Maintenance", price: "₹2,500" },
        { _key: "he-6", name: "Custom Extension Blending Cut & Style", price: "₹1,500" },
      ],
    });
  } else {
    console.log("Hair Extensions already exists in CMS.");
  }

  // 6. Ensure Hair Weaving exists
  const hasHairWeav = currentCats.some(c => c.slug === "hair-weaving" || c.gender === "hair-weaving");
  if (!hasHairWeav) {
    console.log("Creating Hair Weaving category in CMS...");
    await client.createOrReplace({
      _id: "serviceCategory-hair-weaving",
      _type: "serviceCategory",
      title: "Hair Weaving",
      slug: { _type: "slug", current: "hair-weaving" },
      gender: "hair-weaving",
      displayOrder: 8,
      items: [
        { _key: "hw-1", name: "Non-Surgical Hair Weaving System", price: "from ₹15,000", isHighlighted: true },
        { _key: "hw-2", name: "Custom Hair Patch Integration", price: "from ₹12,000" },
        { _key: "hw-3", name: "Lace Front Hair Patch Fixing", price: "from ₹18,000" },
        { _key: "hw-4", name: "Hair Patch Monthly Servicing & Cleaning", price: "₹1,200" },
        { _key: "hw-5", name: "Hair Bonding & Re-Attachment", price: "₹1,500" },
        { _key: "hw-6", name: "Scalp Prep & Consultation", price: "Free" },
      ],
    });
  } else {
    console.log("Hair Weaving already exists in CMS.");
  }

  console.log("\n✅ All categories synced with Sanity CMS successfully!");
}

main().catch(err => {
  console.error("❌ Sync failed:", err);
  process.exit(1);
});

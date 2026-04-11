const { createClient } = require('next-sanity');

// Ensure token is passed
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("❌ Missing SANITY_API_WRITE_TOKEN in .env.local");
  console.error("   Run: SANITY_API_WRITE_TOKEN=your_token node scripts/fix-sanity-data.js");
  process.exit(1);
}

const client = createClient({
  projectId: "ncrxhomy",
  dataset: "production",
  apiVersion: "2024-03-20",
  useCdn: false,
  token,
});

const CORRECT_WHATSAPP = "919700744357";
const CORRECT_PHONE    = "+91 97007 44357";
const CORRECT_TAGLINE  = "Hyderabad's family salon — premium hair, skin, and beauty services across 2 branches, with a 3rd opening soon. Crafted for every generation.";

async function migrate() {
  console.log("🚀 Starting Sanity data migration…\n");

  try {
    // ─── 1. siteSettings — phone + footer tagline ──────────────────────────
    console.log("1️⃣  Checking siteSettings…");
    const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]`);

    if (!siteSettings) {
      console.log("   ⚠️  No siteSettings document found — skipping.");
    } else {
      const patch = client.patch(siteSettings._id);
      const updates = {};
      let needsUpdate = false;

      if (siteSettings.contactWhatsApp !== CORRECT_WHATSAPP) {
        console.log(`   contactWhatsApp: "${siteSettings.contactWhatsApp}" → "${CORRECT_WHATSAPP}"`);
        updates.contactWhatsApp = CORRECT_WHATSAPP;
        needsUpdate = true;
      }

      if (siteSettings.contactPhone !== CORRECT_PHONE) {
        console.log(`   contactPhone: "${siteSettings.contactPhone}" → "${CORRECT_PHONE}"`);
        updates.contactPhone = CORRECT_PHONE;
        needsUpdate = true;
      }

      if (siteSettings.footerTagline !== CORRECT_TAGLINE) {
        console.log(`   footerTagline: updating to correct branch count`);
        updates.footerTagline = CORRECT_TAGLINE;
        needsUpdate = true;
      }

      if (needsUpdate) {
        await patch.set(updates).commit();
        console.log("   ✅ siteSettings updated.\n");
      } else {
        console.log("   ✅ siteSettings already correct.\n");
      }
    }

    // ─── 2. locations — whatsappNumber ─────────────────────────────────────
    console.log("2️⃣  Checking location documents…");
    const locations = await client.fetch(`*[_type == "location"]`);

    if (!locations || locations.length === 0) {
      console.log("   ⚠️  No location documents found — skipping.\n");
    } else {
      let locationsFixed = 0;
      for (const loc of locations) {
        const name = loc.branchName || loc._id;
        const fixes = {};
        let needsFix = false;

        if (loc.whatsappNumber !== CORRECT_WHATSAPP) {
          console.log(`   ${name}: whatsappNumber "${loc.whatsappNumber}" → "${CORRECT_WHATSAPP}"`);
          fixes.whatsappNumber = CORRECT_WHATSAPP;
          needsFix = true;
        }

        if (loc.phone && loc.phone !== CORRECT_PHONE) {
          console.log(`   ${name}: phone "${loc.phone}" → "${CORRECT_PHONE}"`);
          fixes.phone = CORRECT_PHONE;
          needsFix = true;
        }

        if (needsFix) {
          await client.patch(loc._id).set(fixes).commit();
          locationsFixed++;
        }
      }
      if (locationsFixed > 0) {
        console.log(`   ✅ Updated ${locationsFixed} location(s).\n`);
      } else {
        console.log("   ✅ All locations already correct.\n");
      }
    }

    // ─── 3. serviceCategory — Global Highlights pricing ────────────────────
    console.log("3️⃣  Checking serviceCategory pricing…");
    const categories = await client.fetch(`*[_type == "serviceCategory"]`);

    let categoriesFixed = 0;
    for (const cat of categories) {
      if (!Array.isArray(cat.items)) continue;

      let hasChanges = false;
      const newItems = cat.items.map((item) => {
        // Match any of the old "2M" pricing formats
        if (
          item.price === 'S: 2M / M: 2.5M / L: 3.5M' ||
          item.price === 'S: ₹2k / M: ₹2.5k / L: ₹3.5k' ||
          (item.price && item.price.includes('2M'))
        ) {
          hasChanges = true;
          console.log(`   "${cat.title}" → "${item.name}": "${item.price}" → "S: ₹2,000 / M: ₹2,500 / L: ₹3,500"`);
          return { ...item, price: "S: ₹2,000 / M: ₹2,500 / L: ₹3,500" };
        }
        return item;
      });

      if (hasChanges) {
        await client.patch(cat._id).set({ items: newItems }).commit();
        categoriesFixed++;
      }
    }

    if (categoriesFixed > 0) {
      console.log(`   ✅ Updated ${categoriesFixed} service category(s).\n`);
    } else {
      console.log("   ✅ Service pricing already correct.\n");
    }

    // ─── 4. aboutPage — founding year sanity check ─────────────────────────
    console.log("4️⃣  Checking aboutPage founding year…");
    const aboutPage = await client.fetch(`*[_type == "aboutPage"][0]`);

    if (aboutPage && aboutPage.storyContent) {
      let stringified = JSON.stringify(aboutPage.storyContent);
      const OLD_PATTERNS = ["Founded 2020", "Five years", /\b2020\b/];
      let needsFix = OLD_PATTERNS.some((p) =>
        typeof p === "string" ? stringified.includes(p) : p.test(stringified)
      );

      if (needsFix) {
        stringified = stringified
          .replace(/Founded 2020/g, "Founded 2018")
          .replace(/Five years/g, "8+ Years")
          .replace(/\b2020\b/g, "2018");
        await client.patch(aboutPage._id).set({ storyContent: JSON.parse(stringified) }).commit();
        console.log("   ✅ aboutPage story content fixed.\n");
      } else {
        console.log("   ✅ aboutPage already correct.\n");
      }
    } else {
      console.log("   ✅ aboutPage storyContent not present — skipping.\n");
    }

    console.log("🎉 Migration complete! Re-deploy to see all changes live.");
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
}

migrate();

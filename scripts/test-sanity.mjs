/**
 * Sanity connection diagnostic
 * Run: node scripts/test-sanity.mjs
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ncrxhomy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // bypass CDN to get truly live data
});

console.log('\n🔍 Testing Sanity connection...\n');

// ── 1. Home page images ───────────────────────────────────────────────────────
const homePage = await client.fetch(`
  *[_type == "homePage"][0] {
    "hasHeroImage": defined(heroBackgroundImage.asset),
    "heroImageUrl": heroBackgroundImage.asset->url,
    "hairImage": defined(hairServiceImage.asset),
    "bridalImage": defined(bridalServiceImage.asset),
    "skinImage": defined(skinServiceImage.asset),
    "tattooImage": defined(tattooServiceImage.asset),
    "nailsImage": defined(nailsServiceImage.asset),
    "piercingImage": defined(piercingServiceImage.asset),
    "hairImageUrl": hairServiceImage.asset->url,
    "bridalImageUrl": bridalServiceImage.asset->url,
  }
`).catch(e => ({ error: e.message }));

console.log('📄 HOME PAGE document:');
if (homePage?.error) {
  console.log('  ❌ FETCH FAILED:', homePage.error);
} else if (!homePage) {
  console.log('  ❌ No homePage document found — document does not exist or is unpublished');
} else {
  console.log('  ✅ Document found');
  console.log('  Hero image:', homePage.hasHeroImage ? '✅ set' : '❌ MISSING');
  if (homePage.heroImageUrl) console.log('  Hero URL preview:', homePage.heroImageUrl.slice(0, 60) + '...');
  console.log('  Hair image:', homePage.hairImage ? '✅ set' : '❌ MISSING');
  console.log('  Bridal image:', homePage.bridalImage ? '✅ set' : '❌ MISSING');
  console.log('  Skin image:', homePage.skinImage ? '✅ set' : '❌ MISSING');
  console.log('  Tattoo image:', homePage.tattooImage ? '✅ set' : '❌ MISSING');
  console.log('  Nails image:', homePage.nailsImage ? '✅ set' : '❌ MISSING');
  console.log('  Piercing image:', homePage.piercingImage ? '✅ set' : '❌ MISSING');
  if (homePage.hairImageUrl) console.log('  Hair URL preview:', homePage.hairImageUrl.slice(0, 60) + '...');
  if (homePage.bridalImageUrl) console.log('  Bridal URL preview:', homePage.bridalImageUrl.slice(0, 60) + '...');
}

// ── 2. Service categories ─────────────────────────────────────────────────────
const categories = await client.fetch(`
  *[_type == "serviceCategory"] | order(displayOrder asc) {
    title,
    gender,
    "hasImage": defined(image.asset),
    "imageUrl": image.asset->url
  }
`).catch(e => [{ error: e.message }]);

console.log('\n📋 SERVICE CATEGORIES:');
if (!categories || categories.length === 0) {
  console.log('  ❌ No service categories found — none published');
} else {
  categories.forEach(cat => {
    if (cat.error) {
      console.log('  ❌ Fetch error:', cat.error);
    } else {
      const imgStatus = cat.hasImage ? '✅' : '❌ NO IMAGE';
      console.log(`  ${imgStatus}  ${cat.title} (${cat.gender})`);
      if (cat.imageUrl) console.log(`        URL: ${cat.imageUrl.slice(0, 60)}...`);
    }
  });
}

// ── 3. Transformations ────────────────────────────────────────────────────────
const transforms = await client.fetch(`
  *[_type == "transformation"] {
    title,
    "hasImage": defined(image.asset),
    "imageUrl": image.asset->url
  }
`).catch(e => [{ error: e.message }]);

console.log('\n🖼️  TRANSFORMATIONS:');
if (!transforms || transforms.length === 0) {
  console.log('  ❌ No transformation documents found');
} else {
  transforms.forEach(t => {
    const imgStatus = t.hasImage ? '✅' : '❌ NO IMAGE';
    console.log(`  ${imgStatus}  ${t.title || '(untitled)'}`);
  });
}

console.log('\n✅ Diagnostic complete.\n');

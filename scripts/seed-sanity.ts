import { createClient } from '@sanity/client';

// We run this via `npx sanity exec scripts/seed-sanity.ts --with-user-token`
// so environment variables are automatically mapped.
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function main() {
  console.log('🌱 Starting Sanity Database Seeder...');

  // Home Page Singleton
  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    title: 'Home Page Configuration',
  };

  // The Exact "Original Accurate" Menu Services
  const originalServices = [
    {
      _id: 'service-hair',
      _type: 'serviceCategory',
      title: 'Hair',
      slug: { _type: 'slug', current: 'hair' },
      gender: 'both',
      displayOrder: 1,
      items: [
        { name: 'Haircut & Styling', price: 'from ₹499', isHighlighted: true },
        { name: 'Keratin Treatment', price: 'from ₹4,999' },
        { name: 'Hair Color (Global)', price: 'from ₹2,999' },
      ]
    },
    {
      _id: 'service-bridal',
      _type: 'serviceCategory',
      title: 'Bridal',
      slug: { _type: 'slug', current: 'bridal' },
      gender: 'bridal',
      displayOrder: 2,
      items: [
        { name: 'Premium Bridal Makeup', price: 'from ₹14,999', isHighlighted: true },
        { name: 'Pre-Bridal Package', price: 'from ₹9,999' },
        { name: 'Groom Package', price: 'from ₹4,999' },
      ]
    },
    {
      _id: 'service-skin',
      _type: 'serviceCategory',
      title: 'Skin',
      slug: { _type: 'slug', current: 'skin' },
      gender: 'both',
      displayOrder: 3,
      items: [
        { name: 'Advanced Cleanups', price: 'from ₹999' },
        { name: 'Radiance Facials', price: 'from ₹1,499', isHighlighted: true },
        { name: 'De-Tan Therapies', price: 'from ₹799' },
      ]
    },
    {
      _id: 'service-tattoo',
      _type: 'serviceCategory',
      title: 'Tattoo',
      slug: { _type: 'slug', current: 'tattoo' },
      gender: 'both',
      displayOrder: 4,
      items: [
        { name: 'Fine Line Art', price: 'from ₹1,999', isHighlighted: true },
        { name: 'Custom Design', price: 'Price on Consultation' },
        { name: 'Cover-ups', price: 'Price on Consultation' },
      ]
    }
  ];

  try {
    // 1. Setup Home Page Singleton
    await client.createIfNotExists(homePage);
    console.log('✅ Home Page settings initialized');

    // 2. Setup Services Menu
    for (const service of originalServices) {
      await client.createIfNotExists(service);
      console.log(`✅ Seeded Service Category: ${service.title}`);
    }

    console.log('🎉 Seeding completed successfully! Your original menu is now in Sanity.');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

main();

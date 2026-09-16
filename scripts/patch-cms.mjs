import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'ncrxhomy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skDn0m93X5cgGVk9euXH8Hcmv8xBTZOzHtuum8fHFN3T7xF2wKptqxkUbw0l9v0B1oXTy8XsPIxp6ilkIEQ4fP17M2S7C20ovFr84DDrXm0GgvLAxsuB4sE3051lazbuFu4UH9oFkT06p7YVGJUl4HmfC2bQSAKmKkJY0jZ0cAEBBrbx2W80',
  useCdn: false,
});

async function main() {
  // Fix the footerTagline to reflect 3 active branches
  await client.patch('siteSettings').set({
    footerTagline: "Hyderabad's family salon — premium hair, skin, and beauty services across 3 branches. Crafted for every generation.",
  }).commit();
  console.log('✅ Updated footerTagline');

  // Add shortName to location documents
  const locs = [
    { id: 'uppal', shortName: 'Uppal' },
    { id: 'tarnaka', shortName: 'Tarnaka' },
    { id: 'new-branch', shortName: 'Yamjal' },
  ];

  for (const loc of locs) {
    await client.patch(loc.id).set({ shortName: loc.shortName }).commit();
    console.log(`✅ Updated shortName for ${loc.id} → ${loc.shortName}`);
  }
}

main().catch(console.error);

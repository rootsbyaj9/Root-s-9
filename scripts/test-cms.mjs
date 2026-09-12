import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'ncrxhomy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function main() {
  // Full aboutPage content
  const about = await client.fetch('*[_type == "aboutPage"][0]');
  console.log('\nFull aboutPage:', JSON.stringify(about, null, 2));

  // serviceCategories with images
  const cats = await client.fetch(`*[_type == "serviceCategory"] | order(displayOrder asc) {
    _id, title, "slug": slug.current, gender, displayOrder,
    "imageUrl": image.asset->url, "imageAlt": image.alt,
    items[]{ name, description, isHighlighted }
  }`);
  console.log('\nService Categories:', JSON.stringify(cats, null, 2));

  // transformations with images
  const trans = await client.fetch(`*[_type == "transformation"] {
    _id, title, description, aspect, mood,
    "imageUrl": image.asset->url
  }`);
  console.log('\nTransformations:', JSON.stringify(trans, null, 2));

  // siteSettings full
  const settings = await client.fetch('*[_type == "siteSettings"][0]');
  console.log('\nSiteSettings:', JSON.stringify(settings, null, 2));
}

main().catch(console.error);

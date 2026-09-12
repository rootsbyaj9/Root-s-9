import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'ncrxhomy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  const categories = await client.fetch(`*[_type == "serviceCategory"] | order(displayOrder asc) {
    _id,
    title,
    "slug": slug.current,
    gender,
    displayOrder,
    "imageUrl": image.asset->url,
    "imageHotspot": image.hotspot,
    "imageAlt": image.alt
  }`);
  console.log('Categories from GROQ:', JSON.stringify(categories, null, 2));

  const locs = await client.fetch('*[_type == "location"]{_id, name, shortName, "hasPhoto": defined(photo.asset), "photoUrl": photo.asset->url}');
  console.log('Location docs photo status:', locs);

  const transformations = await client.fetch('*[_type == "transformation"]{_id, title, image, "url": image.asset->url}');
  console.log('Transformations count:', transformations.length);
  for (const t of transformations) {
    console.log(t.title, 'has asset ref:', t.image?.asset?._ref, 'direct url:', t.url);
  }

  const testQuery = `*[_type == "homePage"][0] {
    "heroEyebrow": coalesce(pageBuilder[_type == "heroSection"][0].heroEyebrow, heroEyebrow),
    "heroHeadline": coalesce(pageBuilder[_type == "heroSection"][0].heroHeadline, heroHeadline),
    "heroHeadlineItalic": coalesce(pageBuilder[_type == "heroSection"][0].heroHeadlineItalic, heroHeadlineItalic),
    "heroCtaText": coalesce(pageBuilder[_type == "heroSection"][0].heroCtaText, heroCtaText),
    "heroBackgroundImageUrl": coalesce(pageBuilder[_type == "heroSection"][0].heroBackgroundImage.asset->url, heroBackgroundImage.asset->url),

    "statYears": coalesce(pageBuilder[_type == "trustStripSection"][0].statYears, statYears),
    "statRating": coalesce(pageBuilder[_type == "trustStripSection"][0].statRating, statRating),
    "statLocations": coalesce(pageBuilder[_type == "trustStripSection"][0].statLocations, statLocations),
    "statReviews": coalesce(pageBuilder[_type == "trustStripSection"][0].statReviews, statReviews),
    "partners": coalesce(pageBuilder[_type == "trustStripSection"][0].partners[] {
      name,
      "logoUrl": logo.asset->url,
      websiteUrl
    }, partners[] {
      name,
      "logoUrl": logo.asset->url,
      websiteUrl
    }),

    "hairImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].hairServiceImage.asset->url, hairServiceImage.asset->url),
    "bridalImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].bridalServiceImage.asset->url, bridalServiceImage.asset->url),
    "skinImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].skinServiceImage.asset->url, skinServiceImage.asset->url),
    "tattooImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].tattooServiceImage.asset->url, tattooServiceImage.asset->url),
    "nailsImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].nailsServiceImage.asset->url, nailsServiceImage.asset->url),
    "piercingImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].piercingServiceImage.asset->url, piercingServiceImage.asset->url),

    "featuredHairImageUrl": coalesce(pageBuilder[_type == "featuredScrollSection"][0].featuredHairImage.asset->url, featuredHairImage.asset->url, hairServiceImage.asset->url),
    "featuredBridalImageUrl": coalesce(pageBuilder[_type == "featuredScrollSection"][0].featuredBridalImage.asset->url, featuredBridalImage.asset->url, bridalServiceImage.asset->url),
    "featuredSkinImageUrl": coalesce(pageBuilder[_type == "featuredScrollSection"][0].featuredSkinImage.asset->url, featuredSkinImage.asset->url, skinServiceImage.asset->url),
    "featuredTattooImageUrl": coalesce(pageBuilder[_type == "featuredScrollSection"][0].featuredTattooImage.asset->url, featuredTattooImage.asset->url, tattooServiceImage.asset->url),

    "beforeAfterHairBeforeUrl": coalesce(pageBuilder[_type == "beforeAfterSection"][0].beforeAfterHairBefore.asset->url, beforeAfterHairBefore.asset->url),
    "beforeAfterHairAfterUrl": coalesce(pageBuilder[_type == "beforeAfterSection"][0].beforeAfterHairAfter.asset->url, beforeAfterHairAfter.asset->url)
  }`;
  const result = await client.fetch(testQuery);
  console.log('Coalesced HomePage Query Result:', JSON.stringify(result, null, 2));
}

run().catch(console.error);

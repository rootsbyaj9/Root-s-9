import { groq } from 'next-sanity'

export const getSiteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    yearsOfMastery,
    googleRating,
    reviewCount,
    branchCount,
    offerBannerEnabled,
    offerBannerText,
    offerBannerExpiry,
    contactEmail,
    contactPhone,
    contactWhatsApp,
    socialInstagram,
    socialFacebook,
    footerTagline
  }
`

export const getHomePageQuery = groq`
  // Cache buster: 2026-09-12
  *[_type == "homePage"][0] {
    // Hero
    "heroEyebrow": pageBuilder[_type == "heroSection"][0].heroEyebrow,
    "heroHeadline": pageBuilder[_type == "heroSection"][0].heroHeadline,
    "heroHeadlineItalic": pageBuilder[_type == "heroSection"][0].heroHeadlineItalic,
    "heroCtaText": pageBuilder[_type == "heroSection"][0].heroCtaText,
    "heroBackgroundImageUrl": pageBuilder[_type == "heroSection"][0].heroBackgroundImage.asset->url,
    "heroBackgroundImageAlt": pageBuilder[_type == "heroSection"][0].heroBackgroundImage.alt,

    // Trust strip
    "statYears": pageBuilder[_type == "trustStripSection"][0].statYears,
    "statRating": pageBuilder[_type == "trustStripSection"][0].statRating,
    "statLocations": pageBuilder[_type == "trustStripSection"][0].statLocations,
    "statReviews": pageBuilder[_type == "trustStripSection"][0].statReviews,
    "partners": pageBuilder[_type == "trustStripSection"][0].partners[] {
      name,
      "logoUrl": logo.asset->url,
      websiteUrl
    },

    // Services grid
    "servicesHeadline": pageBuilder[_type == "servicesGridSection"][0].servicesHeadline,
    "servicesSubheadline": pageBuilder[_type == "servicesGridSection"][0].servicesSubheadline,
    "hairImageUrl": pageBuilder[_type == "servicesGridSection"][0].hairServiceImage.asset->url,
    "bridalImageUrl": pageBuilder[_type == "servicesGridSection"][0].bridalServiceImage.asset->url,
    "skinImageUrl": pageBuilder[_type == "servicesGridSection"][0].skinServiceImage.asset->url,
    "tattooImageUrl": pageBuilder[_type == "servicesGridSection"][0].tattooServiceImage.asset->url,
    "nailsImageUrl": pageBuilder[_type == "servicesGridSection"][0].nailsServiceImage.asset->url,
    "piercingImageUrl": pageBuilder[_type == "servicesGridSection"][0].piercingServiceImage.asset->url,

    // Featured services scroll
    "featuredHairImageUrl": pageBuilder[_type == "featuredScrollSection"][0].featuredHairImage.asset->url,
    "featuredBridalImageUrl": pageBuilder[_type == "featuredScrollSection"][0].featuredBridalImage.asset->url,
    "featuredSkinImageUrl": pageBuilder[_type == "featuredScrollSection"][0].featuredSkinImage.asset->url,
    "featuredTattooImageUrl": pageBuilder[_type == "featuredScrollSection"][0].featuredTattooImage.asset->url,

    // Before & after
    "transformationsHeadline": pageBuilder[_type == "beforeAfterSection"][0].transformationsHeadline,
    "transformationsSubheadline": pageBuilder[_type == "beforeAfterSection"][0].transformationsSubheadline,
    "beforeAfterHairBeforeUrl": pageBuilder[_type == "beforeAfterSection"][0].beforeAfterHairBefore.asset->url,
    "beforeAfterHairAfterUrl": pageBuilder[_type == "beforeAfterSection"][0].beforeAfterHairAfter.asset->url,
    "beforeAfterSkinBeforeUrl": pageBuilder[_type == "beforeAfterSection"][0].beforeAfterSkinBefore.asset->url,
    "beforeAfterSkinAfterUrl": pageBuilder[_type == "beforeAfterSection"][0].beforeAfterSkinAfter.asset->url,

    // CTA
    "ctaHeadline": pageBuilder[_type == "ctaSection"][0].ctaHeadline,
    "ctaButtonText": pageBuilder[_type == "ctaSection"][0].ctaButtonText
  }
`


// NOTE: founderImageUrl and aboutBackgroundImageUrl are resolved server-side
// using GROQ asset->url projection so components receive plain strings directly.
export const getAboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heroEyebrow,
    heroSubtext,
    founderName,
    founderHeadline,
    founderQuote,
    founderBio1,
    founderBio2,
    valuesHeading,
    values[] {
      number,
      title,
      body
    },
    timelineHeading,
    milestones[] {
      year,
      event
    },
    "founderImageUrl": founderImage.asset->url,
    "aboutBackgroundImageUrl": aboutBackgroundImage.asset->url
  }
`

export const getLocationsQuery = groq`
  *[_type == "location" && isActive != false] | order(displayOrder asc) {
    _id,
    name,
    shortName,
    address,
    phone,
    whatsappNumber,
    description,
    hours,
    googleMapsUrl,
    embedUrl,
    isActive,
    isNew
  }
`

// NOTE: heroBackgroundImageUrl resolved server-side via asset->url
export const getFranchisePageQuery = groq`
  *[_type == "franchisePage"][0] {
    heroEyebrow,
    heroHeadline,
    heroSubtext,
    "heroBackgroundImageUrl": heroBackgroundImage.asset->url,
    reasonsHeading,
    reasons[] {
      title,
      body
    },
    modelHeading,
    modelPoints[] {
      label,
      value
    },
    faqHeading,
    faqs[] {
      q,
      a
    }
  }
`

export const getServiceCategoriesQuery = groq`
  *[_type == "serviceCategory"] | order(displayOrder asc) {
    _id,
    title,
    "slug": slug.current,
    gender,
    displayOrder,
    "imageUrl": image.asset->url,
    "imageHotspot": image.hotspot,
    "imageAlt": image.alt,
    items[] {
      name,
      price,
      description,
      isHighlighted
    }
  }
`

export const getReviewsQuery = groq`
  *[_type == "review"] {
    _id,
    name,
    branch,
    rating,
    date,
    service,
    reviewText
  }
`

export const getTransformationsQuery = groq`
  *[_type == "transformation"] {
    _id,
    title,
    description,
    image,
    aspect,
    mood,
  }
`

export const getPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    category,
    publishedAt,
    readTime
  }
`

export const getPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    category,
    publishedAt,
    readTime
  }
`

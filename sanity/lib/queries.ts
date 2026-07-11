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
  // Cache buster: 2026-06-18
  *[_type == "homePage"][0] {
    heroEyebrow,
    heroHeadline,
    heroHeadlineItalic,
    heroCtaText,
    statYears,
    statRating,
    statLocations,
    statReviews,
    "heroBackgroundImageUrl": heroBackgroundImage.asset->url,
    servicesHeadline,
    servicesSubheadline,
    "hairImageUrl": hairServiceImage.asset->url,
    "hairImageHotspot": hairServiceImage.hotspot,
    "bridalImageUrl": bridalServiceImage.asset->url,
    "bridalImageHotspot": bridalServiceImage.hotspot,
    "skinImageUrl": skinServiceImage.asset->url,
    "skinImageHotspot": skinServiceImage.hotspot,
    "tattooImageUrl": tattooServiceImage.asset->url,
    "tattooImageHotspot": tattooServiceImage.hotspot,
    "nailsImageUrl": nailsServiceImage.asset->url,
    "nailsImageHotspot": nailsServiceImage.hotspot,
    "piercingImageUrl": piercingServiceImage.asset->url,
    "piercingImageHotspot": piercingServiceImage.hotspot,
    transformationsHeadline,
    transformationsSubheadline,
    "beforeAfterHairBeforeUrl": beforeAfterHairBefore.asset->url,
    "beforeAfterHairAfterUrl": beforeAfterHairAfter.asset->url,
    "beforeAfterSkinBeforeUrl": beforeAfterSkinBefore.asset->url,
    "beforeAfterSkinAfterUrl": beforeAfterSkinAfter.asset->url,
    ctaHeadline,
    ctaButtonText
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

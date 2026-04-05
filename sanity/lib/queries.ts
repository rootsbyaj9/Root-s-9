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
  *[_type == "homePage"][0] {
    heroEyebrow,
    heroHeadline,
    heroHeadlineItalic,
    heroCtaText,
    statYears,
    statRating,
    statLocations,
    statReviews,
    "heroImageUrl": heroBackgroundImage.asset->url,
    "hairImageUrl": hairServiceImage.asset->url,
    "hairImageHotspot": hairServiceImage.hotspot,
    "bridalImageUrl": bridalServiceImage.asset->url,
    "bridalImageHotspot": bridalServiceImage.hotspot,
    "skinImageUrl": skinServiceImage.asset->url,
    "skinImageHotspot": skinServiceImage.hotspot,
    "tattooImageUrl": tattooServiceImage.asset->url,
    "tattooImageHotspot": tattooServiceImage.hotspot,
    "beforeAfterHairBefore": beforeAfterHairBefore.asset->url,
    "beforeAfterHairAfter": beforeAfterHairAfter.asset->url,
    "beforeAfterSkinBefore": beforeAfterSkinBefore.asset->url,
    "beforeAfterSkinAfter": beforeAfterSkinAfter.asset->url
  }
`

export const getAboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    "founderImageUrl": founderImage.asset->url,
    "aboutBackgroundImageUrl": aboutBackgroundImage.asset->url
  }
`

export const getLocationsQuery = groq`
  *[_type == "location"] | order(displayOrder asc) {
    _id,
    branchName,
    isNew,
    address,
    phone,
    email,
    whatsappNumber,
    googleMapsLink,
    timings
  }
`

export const getFranchisePageQuery = groq`
  *[_type == "franchisePage"][0] {
    heroEyebrow,
    heroHeadline,
    heroSubtext,
    "heroImageUrl": heroBackgroundImage.asset->url,
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
    "imageUrl": image.asset->url,
    aspect,
    mood
  }
`

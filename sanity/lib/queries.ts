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
    heroBackgroundImage,
    servicesHeadline,
    servicesSubheadline,
    hairServiceImage,
    bridalServiceImage,
    skinServiceImage,
    tattooServiceImage,
    transformationsHeadline,
    transformationsSubheadline,
    beforeAfterHairBefore,
    beforeAfterHairAfter,
    beforeAfterSkinBefore,
    beforeAfterSkinAfter,
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
      icon,
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
    image,
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
    mood
  }
`

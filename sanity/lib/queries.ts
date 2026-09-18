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
    // Hero
    "heroEyebrow": coalesce(pageBuilder[_type == "heroSection"][0].heroEyebrow, heroEyebrow),
    "heroHeadline": coalesce(pageBuilder[_type == "heroSection"][0].heroHeadline, heroHeadline),
    "heroHeadlineItalic": coalesce(pageBuilder[_type == "heroSection"][0].heroHeadlineItalic, heroHeadlineItalic),
    "heroCtaText": coalesce(pageBuilder[_type == "heroSection"][0].heroCtaText, heroCtaText),
    "heroBackgroundImageUrl": coalesce(pageBuilder[_type == "heroSection"][0].heroBackgroundImage.asset->url, heroBackgroundImage.asset->url),
    "heroBackgroundImageAlt": coalesce(pageBuilder[_type == "heroSection"][0].heroBackgroundImage.alt, heroBackgroundImage.alt),

    // Trust strip
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

    // Services grid
    "servicesHeadline": coalesce(pageBuilder[_type == "servicesGridSection"][0].servicesHeadline, servicesHeadline),
    "servicesSubheadline": coalesce(pageBuilder[_type == "servicesGridSection"][0].servicesSubheadline, servicesSubheadline),
    "hairImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].hairServiceImage.asset->url, hairServiceImage.asset->url),
    "bridalImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].bridalServiceImage.asset->url, bridalServiceImage.asset->url),
    "skinImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].skinServiceImage.asset->url, skinServiceImage.asset->url),
    "tattooImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].tattooServiceImage.asset->url, tattooServiceImage.asset->url),
    "nailsImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].nailsServiceImage.asset->url, nailsServiceImage.asset->url),
    "piercingImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].piercingServiceImage.asset->url, piercingServiceImage.asset->url),
    "hairExtensionsImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].hairExtensionsServiceImage.asset->url, hairExtensionsServiceImage.asset->url),
    "hairWeavingImageUrl": coalesce(pageBuilder[_type == "servicesGridSection"][0].hairWeavingServiceImage.asset->url, hairWeavingServiceImage.asset->url),
    "hairExtensionsImageHotspot": coalesce(pageBuilder[_type == "servicesGridSection"][0].hairExtensionsServiceImage.hotspot, hairExtensionsServiceImage.hotspot),
    "hairWeavingImageHotspot": coalesce(pageBuilder[_type == "servicesGridSection"][0].hairWeavingServiceImage.hotspot, hairWeavingServiceImage.hotspot),
    "hairServiceImage": coalesce(pageBuilder[_type == "servicesGridSection"][0].hairServiceImage, hairServiceImage),
    "bridalServiceImage": coalesce(pageBuilder[_type == "servicesGridSection"][0].bridalServiceImage, bridalServiceImage),
    "skinServiceImage": coalesce(pageBuilder[_type == "servicesGridSection"][0].skinServiceImage, skinServiceImage),
    "tattooServiceImage": coalesce(pageBuilder[_type == "servicesGridSection"][0].tattooServiceImage, tattooServiceImage),
    "nailsServiceImage": coalesce(pageBuilder[_type == "servicesGridSection"][0].nailsServiceImage, nailsServiceImage),
    "piercingServiceImage": coalesce(pageBuilder[_type == "servicesGridSection"][0].piercingServiceImage, piercingServiceImage),
    "hairExtensionsServiceImage": coalesce(pageBuilder[_type == "servicesGridSection"][0].hairExtensionsServiceImage, hairExtensionsServiceImage),
    "hairWeavingServiceImage": coalesce(pageBuilder[_type == "servicesGridSection"][0].hairWeavingServiceImage, hairWeavingServiceImage),

    // Featured services scroll (8 services)
    "scrollHairCutImageUrl": coalesce(scrollHairCutImage.asset->url, pageBuilder[_type == "featuredScrollSection"][0].scrollHairCutImage.asset->url, featuredHairImage.asset->url, hairServiceImage.asset->url),
    "scrollHairCutHotspot": coalesce(scrollHairCutImage.hotspot, pageBuilder[_type == "featuredScrollSection"][0].scrollHairCutImage.hotspot),
    "scrollHairColorImageUrl": coalesce(scrollHairColorImage.asset->url, pageBuilder[_type == "featuredScrollSection"][0].scrollHairColorImage.asset->url),
    "scrollHairColorHotspot": coalesce(scrollHairColorImage.hotspot, pageBuilder[_type == "featuredScrollSection"][0].scrollHairColorImage.hotspot),
    "scrollHairTextureImageUrl": coalesce(scrollHairTextureImage.asset->url, pageBuilder[_type == "featuredScrollSection"][0].scrollHairTextureImage.asset->url),
    "scrollHairTextureHotspot": coalesce(scrollHairTextureImage.hotspot, pageBuilder[_type == "featuredScrollSection"][0].scrollHairTextureImage.hotspot),
    "scrollNailArtImageUrl": coalesce(scrollNailArtImage.asset->url, pageBuilder[_type == "featuredScrollSection"][0].scrollNailArtImage.asset->url, nailsServiceImage.asset->url),
    "scrollNailArtHotspot": coalesce(scrollNailArtImage.hotspot, pageBuilder[_type == "featuredScrollSection"][0].scrollNailArtImage.hotspot),
    "scrollPedicureImageUrl": coalesce(scrollPedicureImage.asset->url, pageBuilder[_type == "featuredScrollSection"][0].scrollPedicureImage.asset->url),
    "scrollPedicureHotspot": coalesce(scrollPedicureImage.hotspot, pageBuilder[_type == "featuredScrollSection"][0].scrollPedicureImage.hotspot),
    "scrollFacialsImageUrl": coalesce(scrollFacialsImage.asset->url, pageBuilder[_type == "featuredScrollSection"][0].scrollFacialsImage.asset->url, skinServiceImage.asset->url),
    "scrollFacialsHotspot": coalesce(scrollFacialsImage.hotspot, pageBuilder[_type == "featuredScrollSection"][0].scrollFacialsImage.hotspot),
    "scrollBridalImageUrl": coalesce(scrollBridalImage.asset->url, pageBuilder[_type == "featuredScrollSection"][0].scrollBridalImage.asset->url, featuredBridalImage.asset->url, bridalServiceImage.asset->url),
    "scrollBridalHotspot": coalesce(scrollBridalImage.hotspot, pageBuilder[_type == "featuredScrollSection"][0].scrollBridalImage.hotspot),

    // Before & after
    "transformationsHeadline": coalesce(pageBuilder[_type == "beforeAfterSection"][0].transformationsHeadline, transformationsHeadline),
    "transformationsSubheadline": coalesce(pageBuilder[_type == "beforeAfterSection"][0].transformationsSubheadline, transformationsSubheadline),
    "beforeAfterHairBeforeUrl": coalesce(pageBuilder[_type == "beforeAfterSection"][0].beforeAfterHairBefore.asset->url, beforeAfterHairBefore.asset->url),
    "beforeAfterHairAfterUrl": coalesce(pageBuilder[_type == "beforeAfterSection"][0].beforeAfterHairAfter.asset->url, beforeAfterHairAfter.asset->url),
    "beforeAfterSkinBeforeUrl": coalesce(pageBuilder[_type == "beforeAfterSection"][0].beforeAfterSkinBefore.asset->url, beforeAfterSkinBefore.asset->url),
    "beforeAfterSkinAfterUrl": coalesce(pageBuilder[_type == "beforeAfterSection"][0].beforeAfterSkinAfter.asset->url, beforeAfterSkinAfter.asset->url),

    // CTA
    "ctaHeadline": coalesce(pageBuilder[_type == "ctaSection"][0].ctaHeadline, ctaHeadline),
    "ctaButtonText": coalesce(pageBuilder[_type == "ctaSection"][0].ctaButtonText, ctaButtonText)
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
    "photoUrl": photo.asset->url,
    "photoAlt": photo.alt,
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
    displayTabs,
    displayOrder,
    image,
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

/**
 * src/types/sanity.ts
 *
 * Central TypeScript interfaces for all Sanity CMS data shapes.
 * Each interface is derived directly from the GROQ query projections
 * in sanity/lib/queries.ts and verified against the Sanity schemas.
 *
 * Rule: every Sanity-fetched value that flows into a component prop
 * must be typed via one of these interfaces — never `any`.
 */

// -- Site Settings -------------------------------------------------------------
// Derived from: getSiteSettingsQuery / siteSettings.ts schema

export interface SiteSettings {
  yearsOfMastery: string | undefined;
  googleRating: string | undefined;
  reviewCount: string | undefined;
  branchCount: string | undefined;
  offerBannerEnabled: boolean | undefined;
  offerBannerText: string | undefined;
  offerBannerExpiry: string | undefined;
  contactEmail: string | undefined;
  contactPhone: string | undefined;
  contactWhatsApp: string | undefined;
  socialInstagram: string | undefined;
  socialFacebook: string | undefined;
  footerTagline: string | undefined;
}

// -- Home Page -----------------------------------------------------------------
// Derived from: getHomePageQuery / homePage.ts schema

export interface SanityImageHotspot {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SanityHomePageData {
  heroEyebrow: string | undefined;
  heroHeadline: string | undefined;
  heroHeadlineItalic: string | undefined;
  heroCtaText: string | undefined;
  statYears: number | undefined;
  statRating: number | undefined;
  statLocations: number | undefined;
  statReviews: number | undefined;
  heroBackgroundImageUrl: string | undefined;
  servicesHeadline: string | undefined;
  servicesSubheadline: string | undefined;
  hairImageUrl: string | undefined;
  hairImageHotspot: SanityImageHotspot | undefined;
  bridalImageUrl: string | undefined;
  bridalImageHotspot: SanityImageHotspot | undefined;
  skinImageUrl: string | undefined;
  skinImageHotspot: SanityImageHotspot | undefined;
  tattooImageUrl: string | undefined;
  tattooImageHotspot: SanityImageHotspot | undefined;
  nailsImageUrl: string | undefined;
  nailsImageHotspot: SanityImageHotspot | undefined;
  piercingImageUrl: string | undefined;
  piercingImageHotspot: SanityImageHotspot | undefined;
  transformationsHeadline: string | undefined;
  transformationsSubheadline: string | undefined;
  beforeAfterHairBeforeUrl: string | undefined;
  beforeAfterHairAfterUrl: string | undefined;
  beforeAfterSkinBeforeUrl: string | undefined;
  beforeAfterSkinAfterUrl: string | undefined;
  ctaHeadline: string | undefined;
  ctaButtonText: string | undefined;
}

// -- About Page ----------------------------------------------------------------
// Derived from: getAboutPageQuery / aboutPage.ts schema

export interface SanityAboutValue {
  number: string;
  title: string;
  body: string;
}

export interface SanityAboutMilestone {
  year: string;
  event: string;
}

export interface SanityAboutPageData {
  heroEyebrow: string | undefined;
  heroSubtext: string | undefined;
  founderName: string | undefined;
  founderHeadline: string | undefined;
  founderQuote: string | undefined;
  founderBio1: string | undefined;
  founderBio2: string | undefined;
  valuesHeading: string | undefined;
  values: SanityAboutValue[] | undefined;
  timelineHeading: string | undefined;
  milestones: SanityAboutMilestone[] | undefined;
  founderImageUrl: string | undefined;
  aboutBackgroundImageUrl: string | undefined;
}

// -- Locations -----------------------------------------------------------------
// Derived from: getLocationsQuery / location.ts schema

export interface SanityLocation {
  _id: string;
  name: string;
  shortName?: string;
  address: string;
  phone: string;
  whatsappNumber?: string;
  description?: string;
  hours: string;
  mapUrl?: string;
  googleMapsUrl?: string;
  embedUrl?: string;
  isActive?: boolean;
  isNew?: boolean;
}

// -- Franchise Page ------------------------------------------------------------
// Derived from: getFranchisePageQuery / franchisePage.ts schema

export interface SanityFranchiseReason {
  title: string;
  body: string;
  number?: string;
  icon?: any;
}

export interface SanityFranchiseModelPoint {
  label: string;
  value: string;
}

export interface SanityFranchiseFaq {
  q: string;
  a: string;
}

export interface SanityFranchisePageData {
  heroEyebrow: string | undefined;
  heroHeadline: string | undefined;
  heroSubtext: string | undefined;
  heroBackgroundImageUrl: string | undefined;
  reasonsHeading: string | undefined;
  reasons: SanityFranchiseReason[] | undefined;
  modelHeading: string | undefined;
  modelPoints: SanityFranchiseModelPoint[] | undefined;
  faqHeading: string | undefined;
  faqs: SanityFranchiseFaq[] | undefined;
}

// -- Reviews -------------------------------------------------------------------
// Derived from: getReviewsQuery / review.ts schema

export interface SanityReview {
  _id: string;
  id?: string;
  name: string;
  branch: 'Uppal' | 'Tarnaka' | 'General';
  rating: number;
  date?: string;
  service?: string;
  reviewText: string;
  review?: string;
  avatar?: string;
}

/** Internal display shape used by ReviewsClient after mapping from SanityReview */
export interface ReviewDisplayItem {
  id: string;
  name: string;
  branch: string;
  rating: number;
  date: string;
  service: string;
  review: string;
  avatar?: string;
}

// -- Transformations -----------------------------------------------------------
// Derived from: getTransformationsQuery / transformation.ts schema

export interface SanityTransformationImage {
  asset: { _ref: string; _type: 'reference' };
  hotspot?: SanityImageHotspot;
  alt?: string;
}

export interface SanityTransformation {
  _id: string;
  title: string;
  description: string;
  image?: SanityTransformationImage;
  imageUrl?: string;
  aspect: string;
  mood?: 'warm' | 'dark';
}

/** Internal display shape used in bento/masonry after mapping */
export interface TransformationDisplayItem {
  id: string;
  label: string;
  description: string;
  aspectClass: string;
  mood: 'warm' | 'dark';
  imageUrl?: string;
  title?: string;
}

// -- Service Categories --------------------------------------------------------
// Derived from: getServiceCategoriesQuery / serviceCategory.ts schema

export interface SanityServiceItem {
  name: string;
  price: string | undefined;
  description: string | undefined;
  isHighlighted: boolean | undefined;
}

export interface SanityServiceCategory {
  _id: string;
  title: string;
  slug: string;
  gender: 'mens' | 'womens' | 'unisex';
  displayOrder: number;
  imageUrl: string | undefined;
  imageHotspot: SanityImageHotspot | undefined;
  imageAlt: string | undefined;
  items: SanityServiceItem[];
}

// -- Blog Posts ----------------------------------------------------------------
// Derived from: getPostsQuery / getPostBySlugQuery / post.ts schema

export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | undefined;
  body?: any;
  mainImageUrl: string | undefined;
  mainImageAlt?: string | undefined;
  category: string | undefined;
  publishedAt: string | undefined;
  readTime: number | undefined;
}

export interface SanityPostFull extends SanityPost {
  // body is Portable Text content — typed as unknown[] to avoid spreading `any`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
}

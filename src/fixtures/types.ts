/**
 * src/fixtures/types.ts
 *
 * Strongly-typed domain models for Root's Family Salon content system.
 * Based on salon-cms-antigravity-guide.md Section 4.2.
 * Decouples content structure from presentation layer.
 */

export interface SiteSettingsRecord {
  brandName: string;
  legalName: string;
  tagline: string;
  founderStory: {
    name: string;
    quote: string;
    background: string;
    philosophy: string;
  };
  metrics: {
    yearsOfMastery: number;
    yearsLabel: string;
    googleRating: number;
    reviewCount: number;
    reviewCountLabel: string;
    branchCount: number;
    happyClientsCount: number;
    happyClientsLabel: string;
  };
  contact: {
    primaryPhone: string;
    primaryPhoneFormatted: string;
    whatsappNumber: string;
    whatsappDisplay: string;
    email: string;
  };
  social: {
    instagram: string;
    facebook: string;
    googleMapsUppal: string;
    googleMapsTarnaka: string;
  };
  hours: {
    general: string;
    days: string;
  };
}

export interface BranchRecord {
  _id: string;
  id: string;
  name: string;
  shortName: string;
  slug: string;
  address: {
    street: string;
    colony: string;
    landmark: string;
    area: string;
    city: string;
    pincode: string;
    fullFormatted: string;
  };
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  hours: string;
  googleMapsUrl: string;
  embedUrl: string;
  description: string;
  accessNotes?: string;
  servicesAvailable: string[];
  isSignature?: boolean;
}

export interface ServiceCategoryRecord {
  _id: string;
  title: string;
  slug: string;
  gender: 'womens' | 'mens' | 'bridal' | 'tattoo' | 'unisex';
  displayOrder: number;
  description: string;
  eyebrow?: string;
  metaDescription?: string;
}

export interface ServiceRecord {
  _id: string;
  title: string;
  slug: string;
  categoryId: string;
  categorySlug: string;
  summary: string;
  durationMinutes?: number;
  durationLabel?: string;
  priceNote?: string;
  requiresConsultation?: boolean;
  branches: string[];
  preparation?: string[];
  aftercare?: string[];
}

export interface TransformationRecord {
  _id: string;
  id: string;
  title: string;
  serviceCategory: 'hair' | 'skin' | 'bridal' | 'tattoo' | 'nails';
  artistName?: string;
  branch?: string;
  date?: string;
  caption: string;
  description: string;
  aspectClass: string;
  mood: 'warm' | 'dark';
  imageUrl?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  hasConsent: boolean;
}

export interface ReviewRecord {
  _id: string;
  id: string;
  name: string;
  branch: 'Uppal' | 'Tarnaka' | 'Yamjal' | 'General';
  rating: number;
  date: string;
  service: string;
  reviewText: string;
  source: 'Google' | 'Direct' | 'Instagram';
  sourceUrl?: string;
  avatar?: string;
}

export interface FaqRecord {
  _id: string;
  question: string;
  answer: string;
  category: string;
  relatedBranch?: string;
  sortOrder: number;
}

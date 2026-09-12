/**
 * src/lib/content-adapter.ts
 *
 * Content Adapter & Fallback Snapshot System.
 * Bridges Sanity CMS queries with typed local fixtures.
 *
 * Guarantees:
 * 1. Zero layout shift or missing content if CMS is down or during build time.
 * 2. Unified type-safe access across all page routes.
 * 3. Fallback snapshot is deterministic and production-safe.
 */

import { client } from '@/sanity/client';
import {
  getSiteSettingsQuery,
  getHomePageQuery,
  getAboutPageQuery,
  getLocationsQuery,
  getServiceCategoriesQuery,
  getTransformationsQuery,
  getReviewsQuery,
} from '@/sanity/lib/queries';

import {
  SITE_SETTINGS_FIXTURE,
  BRANCHES_FIXTURE,
  SERVICES_FIXTURE,
  SERVICE_CATEGORIES_FIXTURE,
  TRANSFORMATIONS_FIXTURE,
  REVIEWS_FIXTURE,
  FAQS_FIXTURE,
  type SiteSettingsRecord,
  type BranchRecord,
  type ServiceRecord,
  type ServiceCategoryRecord,
  type TransformationRecord,
  type ReviewRecord,
  type FaqRecord,
} from '@/fixtures';

import type {
  SiteSettings,
  SanityHomePageData,
  SanityAboutPageData,
  SanityLocation,
  SanityTransformation,
  SanityReview,
  SanityServiceCategory,
} from '@/types/sanity';

export interface ContentAdapter {
  getSiteSettings(): Promise<SiteSettingsRecord>;
  getHomePage(): Promise<SanityHomePageData>;
  getAboutPage(): Promise<SanityAboutPageData>;
  getBranches(): Promise<BranchRecord[]>;
  getServices(): Promise<ServiceRecord[]>;
  getServiceCategories(): Promise<ServiceCategoryRecord[]>;
  getTransformations(): Promise<TransformationRecord[]>;
  getReviews(): Promise<ReviewRecord[]>;
  getFaqs(category?: string): Promise<FaqRecord[]>;
  getSnapshot(): ContentSnapshot;
}

export interface ContentSnapshot {
  settings: SiteSettingsRecord;
  branches: BranchRecord[];
  services: ServiceRecord[];
  categories: ServiceCategoryRecord[];
  transformations: TransformationRecord[];
  reviews: ReviewRecord[];
  faqs: FaqRecord[];
  generatedAt: string;
}

class StandardContentAdapter implements ContentAdapter {
  private snapshot: ContentSnapshot = {
    settings: SITE_SETTINGS_FIXTURE,
    branches: BRANCHES_FIXTURE,
    services: SERVICES_FIXTURE,
    categories: SERVICE_CATEGORIES_FIXTURE,
    transformations: TRANSFORMATIONS_FIXTURE,
    reviews: REVIEWS_FIXTURE,
    faqs: FAQS_FIXTURE,
    generatedAt: new Date().toISOString(),
  };

  public getSnapshot(): ContentSnapshot {
    return this.snapshot;
  }

  public async getSiteSettings(): Promise<SiteSettingsRecord> {
    try {
      if (!client) return this.snapshot.settings;
      const cms = await client.fetch<SiteSettings | null>(getSiteSettingsQuery);
      if (!cms) return this.snapshot.settings;

      return {
        ...this.snapshot.settings,
        tagline: cms.footerTagline || this.snapshot.settings.tagline,
        metrics: {
          ...this.snapshot.settings.metrics,
          yearsLabel: cms.yearsOfMastery || this.snapshot.settings.metrics.yearsLabel,
          googleRating: cms.googleRating ? parseFloat(cms.googleRating) : this.snapshot.settings.metrics.googleRating,
          reviewCountLabel: cms.reviewCount || this.snapshot.settings.metrics.reviewCountLabel,
          branchCount: cms.branchCount ? parseInt(cms.branchCount, 10) : this.snapshot.settings.metrics.branchCount,
        },
        contact: {
          ...this.snapshot.settings.contact,
          email: cms.contactEmail || this.snapshot.settings.contact.email,
          primaryPhone: cms.contactPhone || this.snapshot.settings.contact.primaryPhone,
          whatsappNumber: cms.contactWhatsApp || this.snapshot.settings.contact.whatsappNumber,
        },
        social: {
          ...this.snapshot.settings.social,
          instagram: cms.socialInstagram || this.snapshot.settings.social.instagram,
          facebook: cms.socialFacebook || this.snapshot.settings.social.facebook,
        },
      };
    } catch {
      return this.snapshot.settings;
    }
  }

  public async getHomePage(): Promise<SanityHomePageData> {
    try {
      if (!client) return {} as SanityHomePageData;
      const data = await client.fetch<SanityHomePageData | null>(getHomePageQuery);
      return data || ({} as SanityHomePageData);
    } catch {
      return {} as SanityHomePageData;
    }
  }

  public async getAboutPage(): Promise<SanityAboutPageData> {
    try {
      if (!client) return {} as SanityAboutPageData;
      const data = await client.fetch<SanityAboutPageData | null>(getAboutPageQuery);
      return data || ({} as SanityAboutPageData);
    } catch {
      return {} as SanityAboutPageData;
    }
  }

  public async getBranches(): Promise<BranchRecord[]> {
    try {
      if (!client) return this.snapshot.branches;
      const data = await client.fetch<SanityLocation[] | null>(getLocationsQuery);
      if (!data || data.length === 0) return this.snapshot.branches;

      return data.map((loc, idx) => ({
        _id: loc._id || `branch-${idx}`,
        id: `branch-${idx + 1}`,
        name: loc.name,
        shortName: loc.shortName || loc.name.split('—')[1]?.trim() || loc.name,
        slug: (loc.shortName || loc.name).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        address: {
          street: loc.address,
          colony: '',
          landmark: '',
          area: loc.shortName || '',
          city: 'Hyderabad',
          pincode: '',
          fullFormatted: loc.address,
        },
        phone: loc.phone || '+919700744357',
        phoneFormatted: loc.phone || '+91 97007 44357',
        whatsappNumber: loc.whatsappNumber || '919700744357',
        hours: loc.hours || 'Mon–Sun: 10:00 AM – 9:00 PM',
        googleMapsUrl: loc.googleMapsUrl || loc.mapUrl || '',
        embedUrl: loc.embedUrl || '',
        description: loc.description || '',
        servicesAvailable: ['Hair', 'Skin', 'Bridal', 'Tattoo'],
        isSignature: idx === 0,
      }));
    } catch {
      return this.snapshot.branches;
    }
  }

  public async getServices(): Promise<ServiceRecord[]> {
    return this.snapshot.services;
  }

  public async getServiceCategories(): Promise<ServiceCategoryRecord[]> {
    try {
      if (!client) return this.snapshot.categories;
      const data = await client.fetch<SanityServiceCategory[] | null>(getServiceCategoriesQuery);
      if (!data || data.length === 0) return this.snapshot.categories;

      return data.map((cat) => ({
        _id: cat._id,
        title: cat.title,
        slug: cat.slug,
        gender: (cat.gender as any) || 'womens',
        displayOrder: cat.displayOrder || 1,
        description: cat.items?.[0]?.description || '',
      }));
    } catch {
      return this.snapshot.categories;
    }
  }

  public async getTransformations(): Promise<TransformationRecord[]> {
    try {
      if (!client) return this.snapshot.transformations;
      const data = await client.fetch<SanityTransformation[] | null>(getTransformationsQuery);
      if (!data || data.length === 0) return this.snapshot.transformations;

      return data.map((t, idx) => ({
        _id: t._id || `trans-${idx}`,
        id: `t${idx + 1}`,
        title: t.title,
        serviceCategory: 'hair',
        caption: t.description || t.title,
        description: t.description || '',
        aspectClass: t.aspect || 'aspect-[3/4]',
        mood: t.mood || 'warm',
        imageUrl: t.imageUrl,
        hasConsent: true,
      }));
    } catch {
      return this.snapshot.transformations;
    }
  }

  public async getReviews(): Promise<ReviewRecord[]> {
    try {
      if (!client) return this.snapshot.reviews;
      const data = await client.fetch<SanityReview[] | null>(getReviewsQuery);
      if (!data || data.length === 0) return this.snapshot.reviews;

      return data.map((r, idx) => ({
        _id: r._id || `rev-${idx}`,
        id: r.id || `rev-${idx}`,
        name: r.name,
        branch: r.branch,
        rating: r.rating || 5,
        date: r.date || 'Recent',
        service: r.service || 'Salon Service',
        reviewText: r.reviewText || r.review || '',
        source: 'Google',
        avatar: r.avatar,
      }));
    } catch {
      return this.snapshot.reviews;
    }
  }

  public async getFaqs(category?: string): Promise<FaqRecord[]> {
    if (!category) return this.snapshot.faqs;
    return this.snapshot.faqs.filter((f) => f.category.toLowerCase() === category.toLowerCase());
  }
}

export const contentAdapter = new StandardContentAdapter();

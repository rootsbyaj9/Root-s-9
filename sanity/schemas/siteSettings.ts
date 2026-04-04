import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton — enforced via structureTool structure in sanity.config.ts
  fields: [
    // ── Stats shown across homepage / about ──────────────────────────────────
    defineField({
      name: "yearsOfMastery",
      title: "Years of Mastery",
      type: "string",
      description: 'e.g. "8+"',
      initialValue: "8+",
    }),
    defineField({
      name: "googleRating",
      title: "Google Rating",
      type: "string",
      description: 'e.g. "4.8/5"',
      initialValue: "4.8/5",
    }),
    defineField({
      name: "reviewCount",
      title: "Total Review Count",
      type: "string",
      description: 'e.g. "1,600+"',
      initialValue: "1,600+",
    }),
    defineField({
      name: "branchCount",
      title: "Number of Branches",
      type: "string",
      description: 'e.g. "2"',
      initialValue: "2",
    }),
    // ── Offer strip banner ───────────────────────────────────────────────────
    defineField({
      name: "offerBannerEnabled",
      title: "Enable Offer Banner",
      type: "boolean",
      description: "Show the orange offer strip at the top of the site",
      initialValue: true,
    }),
    defineField({
      name: "offerBannerText",
      title: "Offer Banner Text",
      type: "string",
      description: "Text shown in the offer strip marquee",
      initialValue: "Book via WhatsApp & get 10% off your first visit",
    }),
    defineField({
      name: "offerBannerExpiry",
      title: "Offer Expiry Date",
      type: "datetime",
      description: "Banner auto-hides after this date (leave empty for no expiry)",
    }),
  ],
  preview: {
    select: { title: "googleRating", subtitle: "reviewCount" },
    prepare({ title, subtitle }) {
      return { title: `Site Settings — ${title} · ${subtitle} reviews` };
    },
  },
});

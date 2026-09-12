import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "🏠 Home Page",
  type: "document",
  fields: [
    defineField({
      name: "pageBuilder",
      title: "Page Sections (Page Builder)",
      description: "Add, edit, and reorder sections exactly as they appear on the live site.",
      type: "array",
      of: [
        // ── 1. HERO SECTION ─────────────────────────────────────────────────────────────
        {
          name: "heroSection",
          title: "🎬 Hero Section",
          type: "object",
          fields: [
            defineField({
              name: "heroEyebrow",
              title: "Small Label (above headline)",
              type: "string",
              description: 'e.g. "Hyderabad\'s premium family salon"',
              initialValue: "Hyderabad's premium family salon for hair, skin, bridal & tattoo artistry",
            }),
            defineField({
              name: "heroHeadline",
              title: "Headline — Normal Text",
              type: "string",
              description: 'e.g. "Walk in."',
              initialValue: "Walk in.",
            }),
            defineField({
              name: "heroHeadlineItalic",
              title: "Headline — Italic Text",
              type: "string",
              description: 'e.g. "Walk out different."',
              initialValue: "Walk out different.",
            }),
            defineField({
              name: "heroCtaText",
              title: "Button Label",
              type: "string",
              description: 'e.g. "Book Your Appointment"',
              initialValue: "Book Your Appointment",
            }),
            defineField({
              name: "heroBackgroundImage",
              title: "Background Photo",
              type: "image",
              options: { hotspot: true },
              description: "Required Size: exactly 1920 × 1080 px (16:9). Format: WEBP or JPG.",
              fields: [
                defineField({ name: "alt", title: "Alt Text", type: "string" }),
              ],
            }),
          ],
          preview: {
            select: { title: "heroHeadline", subtitle: "heroHeadlineItalic", media: "heroBackgroundImage" },
            prepare({ title, subtitle, media }) {
              return { title: "Hero Section", subtitle: `${title} ${subtitle}`, media };
            },
          },
        },

        // ── 2. TRUST STRIP ──────────────────────────────────────────────────────────────
        {
          name: "trustStripSection",
          title: "📊 Trust Stats Strip",
          type: "object",
          fields: [
            defineField({
              name: "statYears",
              title: "Years in Business",
              type: "number",
              initialValue: 8,
            }),
            defineField({
              name: "statRating",
              title: "Google Rating",
              type: "number",
              initialValue: 4.8,
            }),
            defineField({
              name: "statLocations",
              title: "Number of Branches",
              type: "number",
              initialValue: 2,
            }),
            defineField({
              name: "statReviews",
              title: "Total Reviews (in thousands, e.g. 1.6)",
              type: "number",
              initialValue: 1.6,
            }),
            defineField({
              name: "partners",
              title: "Partner Brands (Marquee)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "name", title: "Brand Name", type: "string" },
                    { name: "logo", title: "Logo Image", type: "image" },
                    { name: "websiteUrl", title: "Website URL", type: "url" },
                  ],
                },
              ],
            }),
          ],
          preview: {
            prepare() { return { title: "Trust Stats & Brands Strip" }; },
          },
        },

        // ── 3. SERVICES GRID ────────────────────────────────────────────────────────────
        {
          name: "servicesGridSection",
          title: "💇 Services Grid (Bento)",
          type: "object",
          fields: [
            defineField({
              name: "servicesHeadline",
              title: "Headline",
              type: "string",
              initialValue: "Curated Services",
            }),
            defineField({
              name: "servicesSubheadline",
              title: "Subheadline",
              type: "text",
            }),
            defineField({
              name: "hairServiceImage",
              title: "Hair Card Photo",
              type: "image",
              options: { hotspot: true },
              description: "Required Size: 600 × 800 px (3:4).",
            }),
            defineField({
              name: "bridalServiceImage",
              title: "Bridal Card Photo",
              type: "image",
              options: { hotspot: true },
              description: "Required Size: 600 × 800 px (3:4).",
            }),
            defineField({
              name: "skinServiceImage",
              title: "Skin Card Photo",
              type: "image",
              options: { hotspot: true },
              description: "Required Size: 600 × 800 px (3:4).",
            }),
            defineField({
              name: "tattooServiceImage",
              title: "Tattoo Card Photo",
              type: "image",
              options: { hotspot: true },
              description: "Required Size: 600 × 800 px (3:4).",
            }),
            defineField({
              name: "nailsServiceImage",
              title: "Nails Card Photo",
              type: "image",
              options: { hotspot: true },
              description: "Required Size: 600 × 800 px (3:4).",
            }),
            defineField({
              name: "piercingServiceImage",
              title: "Piercing Card Photo",
              type: "image",
              options: { hotspot: true },
              description: "Required Size: 600 × 800 px (3:4).",
            }),
          ],
          preview: {
            prepare() { return { title: "Services Grid (Bento)" }; },
          },
        },

        // ── 4. STICKY FEATURED SCROLL ───────────────────────────────────────────────────
        {
          name: "featuredScrollSection",
          title: "✨ Featured Services (Sticky Scroll)",
          type: "object",
          fields: [
            defineField({
              name: "featuredHairImage",
              title: "Hair Portrait Photo",
              type: "image",
              options: { hotspot: true },
              description: "Required Size: 600 × 800 px (3:4).",
              fields: [{ name: "alt", title: "Alt Text", type: "string" }],
            }),
            defineField({
              name: "featuredBridalImage",
              title: "Bridal Portrait Photo",
              type: "image",
              options: { hotspot: true },
              description: "Required Size: 600 × 800 px (3:4).",
              fields: [{ name: "alt", title: "Alt Text", type: "string" }],
            }),
            defineField({
              name: "featuredSkinImage",
              title: "Skin Portrait Photo",
              type: "image",
              options: { hotspot: true },
              description: "Required Size: 600 × 800 px (3:4).",
              fields: [{ name: "alt", title: "Alt Text", type: "string" }],
            }),
            defineField({
              name: "featuredTattooImage",
              title: "Tattoo Portrait Photo",
              type: "image",
              options: { hotspot: true },
              description: "Required Size: 600 × 800 px (3:4).",
              fields: [{ name: "alt", title: "Alt Text", type: "string" }],
            }),
          ],
          preview: {
            prepare() { return { title: "Featured Services (Sticky Scroll)" }; },
          },
        },

        // ── 5. BEFORE & AFTER ───────────────────────────────────────────────────────────
        {
          name: "beforeAfterSection",
          title: "🔁 Before & After Slider",
          type: "object",
          fields: [
            defineField({
              name: "transformationsHeadline",
              title: "Headline",
              type: "string",
              initialValue: "Visible Transformations",
            }),
            defineField({
              name: "transformationsSubheadline",
              title: "Subheadline",
              type: "text",
            }),
            defineField({
              name: "beforeAfterHairBefore",
              title: "Hair — BEFORE Photo",
              type: "image",
              options: { hotspot: true },
              description: "MUST exactly match AFTER size.",
            }),
            defineField({
              name: "beforeAfterHairAfter",
              title: "Hair — AFTER Photo",
              type: "image",
              options: { hotspot: true },
              description: "MUST exactly match BEFORE size.",
            }),
            defineField({
              name: "beforeAfterSkinBefore",
              title: "Skin — BEFORE Photo",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "beforeAfterSkinAfter",
              title: "Skin — AFTER Photo",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            prepare() { return { title: "Before & After Slider" }; },
          },
        },

        // ── 6. CALL TO ACTION ───────────────────────────────────────────────────────────
        {
          name: "ctaSection",
          title: "⚡ Call To Action",
          type: "object",
          fields: [
            defineField({
              name: "ctaHeadline",
              title: "Bottom CTA Headline",
              type: "string",
              description: 'e.g. "Ready for your Look?"',
            }),
            defineField({
              name: "ctaButtonText",
              title: "Bottom CTA Button Text",
              type: "string",
              description: 'e.g. "Book Consultation"',
            }),
          ],
          preview: {
            prepare() { return { title: "Call To Action (CTA)" }; },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "🏠 Home Page Builder", subtitle: "Edit homepage layout & content blocks" };
    },
  },
});

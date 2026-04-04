import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page Configuration",
  type: "document",
  fields: [
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow Text",
      type: "string",
      initialValue: "The Premium Experience",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline (Normal text)",
      type: "string",
      initialValue: "Walk in.",
    }),
    defineField({
      name: "heroHeadlineItalic",
      title: "Hero Headline (Italic text)",
      type: "string",
      initialValue: "Walk out different.",
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero Call-to-Action Text",
      type: "string",
      initialValue: "Reserve Your Time",
    }),
    // ── Trust Strip Stats ──────────────────────────────────────────────────
    defineField({
      name: "statYears",
      title: "Years of Mastery (Number)",
      type: "number",
      initialValue: 8,
    }),
    defineField({
      name: "statRating",
      title: "Google Rating (Out of 5)",
      type: "number",
      initialValue: 4.8,
    }),
    defineField({
      name: "statLocations",
      title: "Premium Locations (Number)",
      type: "number",
      initialValue: 2,
    }),
    defineField({
      name: "statReviews",
      title: "Google Reviews (in thousands)",
      type: "number",
      initialValue: 1.6,
    }),
    defineField({
      name: "hairServiceImage",
      title: "Hair Category Image (For Home Grid)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bridalServiceImage",
      title: "Bridal Category Image (For Home Grid)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "skinServiceImage",
      title: "Skin Category Image (For Home Grid)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tattooServiceImage",
      title: "Tattoo Category Image (For Home Grid)",
      type: "image",
      options: { hotspot: true },
    }),
    // ── Before/After Home Setting ──────────────────────────────────────────────
    defineField({
      name: "beforeAfterHairBefore",
      title: "Hair Transformation: Before Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "beforeAfterHairAfter",
      title: "Hair Transformation: After Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "beforeAfterSkinBefore",
      title: "Skin Transformation: Before Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "beforeAfterSkinAfter",
      title: "Skin Transformation: After Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: `Home Page Configurations` };
    },
  },
});

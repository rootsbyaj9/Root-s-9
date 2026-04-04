import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "🏠 Home Page",
  type: "document",
  groups: [
    { name: "hero",      title: "🎬 Hero Section",           default: true },
    { name: "stats",     title: "📊 Stats Strip"                          },
    { name: "services",  title: "💇 Service Grid Images"                  },
    { name: "transform", title: "🔁 Before & After Slider"               },
  ],
  fields: [
    // ── HERO ─────────────────────────────────────────────────────────────
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Photo",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description: "📸 HERO BACKGROUND — fills the entire screen on load. Ratio: 16:9 (landscape). Minimum size: 1920 × 1080 px. Ideal: 2560 × 1440 px. Use a high-quality salon or transformation photo with a clear focal point in the centre.",
      fields: [
        defineField({
          name: "alt",
          title: "Image Description",
          type: "string",
          description: 'e.g. "Stylist doing a bridal hairstyle at Root\'s The Family Salon"',
        }),
      ],
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Small Label (above headline)",
      type: "string",
      group: "hero",
      description: 'Small uppercase text shown above the main headline. e.g. "The Premium Experience"',
      initialValue: "The Premium Experience",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline — Normal Text",
      type: "string",
      group: "hero",
      description: 'First line of the big heading. e.g. "Walk in."',
      initialValue: "Walk in.",
    }),
    defineField({
      name: "heroHeadlineItalic",
      title: "Hero Headline — Italic Text",
      type: "string",
      group: "hero",
      description: 'Second line of the big heading, displayed in italic. e.g. "Walk out different."',
      initialValue: "Walk out different.",
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero Button Label",
      type: "string",
      group: "hero",
      description: 'Text on the main call-to-action button. e.g. "Reserve Your Time" or "Book Now"',
      initialValue: "Reserve Your Time",
    }),

    // ── STATS ─────────────────────────────────────────────────────────────
    defineField({
      name: "statYears",
      title: "Years in Business",
      type: "number",
      group: "stats",
      description: "Displayed in the stats strip on the homepage. Just enter the number, e.g. 8",
      initialValue: 8,
    }),
    defineField({
      name: "statRating",
      title: "Google Rating",
      type: "number",
      group: "stats",
      description: "Your star rating out of 5. e.g. 4.8",
      initialValue: 4.8,
    }),
    defineField({
      name: "statLocations",
      title: "Number of Branches",
      type: "number",
      group: "stats",
      description: "How many active branch locations you have. e.g. 2",
      initialValue: 2,
    }),
    defineField({
      name: "statReviews",
      title: "Total Reviews (in thousands)",
      type: "number",
      group: "stats",
      description: "Enter the number in thousands. e.g. enter 1.6 to display 1.6K reviews.",
      initialValue: 1.6,
    }),

    // ── SERVICE GRID IMAGES ───────────────────────────────────────────────
    defineField({
      name: "hairServiceImage",
      title: "Hair — Grid Card Photo",
      type: "image",
      group: "services",
      options: { hotspot: true },
      description: "📸 HOME PAGE — Hair card in the Services Grid. Ratio: 3:4 (portrait/tall). Size: 600 × 800 px minimum. Crops from centre — ensure the main subject is centred.",
    }),
    defineField({
      name: "bridalServiceImage",
      title: "Bridal — Grid Card Photo",
      type: "image",
      group: "services",
      options: { hotspot: true },
      description: "📸 HOME PAGE — Bridal card in the Services Grid. Ratio: 3:4 (portrait/tall). Size: 600 × 800 px minimum. Keep the subject (face/hair) centred in the frame.",
    }),
    defineField({
      name: "skinServiceImage",
      title: "Skin — Grid Card Photo",
      type: "image",
      group: "services",
      options: { hotspot: true },
      description: "📸 HOME PAGE — Skin card in the Services Grid. Ratio: 3:4 (portrait/tall). Size: 600 × 800 px minimum. Close-up facial or treatment photos work best.",
    }),
    defineField({
      name: "tattooServiceImage",
      title: "Tattoo — Grid Card Photo",
      type: "image",
      group: "services",
      options: { hotspot: true },
      description: "📸 HOME PAGE — Tattoo card in the Services Grid. Ratio: 3:4 (portrait/tall). Size: 600 × 800 px minimum. Use a clear, well-lit tattoo or studio photo.",
    }),

    // ── BEFORE & AFTER ────────────────────────────────────────────────────
    defineField({
      name: "beforeAfterHairBefore",
      title: "Hair Transformation — BEFORE Photo",
      type: "image",
      group: "transform",
      options: { hotspot: true },
      description: "📸 HOME PAGE — Before/After Slider, hair BEFORE photo (left side). Ratio: 1:1 (square) or 4:5. Size: 800 × 800 px (square) or 800 × 1000 px (4:5). ⚠️ The BEFORE and AFTER photos must be the SAME ratio and size — otherwise the slider will look misaligned.",
    }),
    defineField({
      name: "beforeAfterHairAfter",
      title: "Hair Transformation — AFTER Photo",
      type: "image",
      group: "transform",
      options: { hotspot: true },
      description: "📸 HOME PAGE — Before/After Slider, hair AFTER photo (right side). Ratio: must match the BEFORE photo exactly — same size and crop. Size: 800 × 800 px (square) or 800 × 1000 px (4:5).",
    }),
    defineField({
      name: "beforeAfterSkinBefore",
      title: "Skin Transformation — BEFORE Photo",
      type: "image",
      group: "transform",
      options: { hotspot: true },
      description: "📸 HOME PAGE — Before/After Slider, skin BEFORE photo (left side). Ratio: 1:1 (square) or 4:5. Size: 800 × 800 px (square) or 800 × 1000 px (4:5). ⚠️ Must be the same ratio as the AFTER photo.",
    }),
    defineField({
      name: "beforeAfterSkinAfter",
      title: "Skin Transformation — AFTER Photo",
      type: "image",
      group: "transform",
      options: { hotspot: true },
      description: "📸 HOME PAGE — Before/After Slider, skin AFTER photo (right side). Ratio: must match the BEFORE photo exactly. Size: 800 × 800 px (square) or 800 × 1000 px (4:5).",
    }),
  ],
  preview: {
    select: { media: "heroBackgroundImage" },
    prepare({ media }) {
      return { title: "🏠 Home Page", subtitle: "Edit homepage content & photos", media };
    },
  },
});

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
      description: "📸 This is the large full-screen photo that customers see first when they visit the homepage. Use a stunning salon or transformation photo. Recommended: landscape, minimum 1920×1080px.",
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
      description: "📸 This photo appears on the 'Hair Masterclass' card on the home page services grid. Use a portrait-style hair photo.",
    }),
    defineField({
      name: "bridalServiceImage",
      title: "Bridal — Grid Card Photo",
      type: "image",
      group: "services",
      options: { hotspot: true },
      description: "📸 This photo appears on the 'Bridal Studio' card on the home page services grid. Use a bridal makeup/hairstyle photo.",
    }),
    defineField({
      name: "skinServiceImage",
      title: "Skin — Grid Card Photo",
      type: "image",
      group: "services",
      options: { hotspot: true },
      description: "📸 This photo appears on the 'Skin Rituals' card on the home page services grid. Use a facial or skin treatment photo.",
    }),
    defineField({
      name: "tattooServiceImage",
      title: "Tattoo — Grid Card Photo",
      type: "image",
      group: "services",
      options: { hotspot: true },
      description: "📸 This photo appears on the 'Tattoo Artistry' card on the home page services grid. Use a tattoo work or studio photo.",
    }),

    // ── BEFORE & AFTER ────────────────────────────────────────────────────
    defineField({
      name: "beforeAfterHairBefore",
      title: "Hair Transformation — BEFORE Photo",
      type: "image",
      group: "transform",
      options: { hotspot: true },
      description: "📸 Left side of the hair drag-slider on the homepage. Shows the client's hair before the treatment.",
    }),
    defineField({
      name: "beforeAfterHairAfter",
      title: "Hair Transformation — AFTER Photo",
      type: "image",
      group: "transform",
      options: { hotspot: true },
      description: "📸 Right side of the hair drag-slider. Shows the final result after the treatment.",
    }),
    defineField({
      name: "beforeAfterSkinBefore",
      title: "Skin Transformation — BEFORE Photo",
      type: "image",
      group: "transform",
      options: { hotspot: true },
      description: "📸 Left side of the skin drag-slider. Shows the client's skin before treatment (e.g. before HydraFacial).",
    }),
    defineField({
      name: "beforeAfterSkinAfter",
      title: "Skin Transformation — AFTER Photo",
      type: "image",
      group: "transform",
      options: { hotspot: true },
      description: "📸 Right side of the skin drag-slider. Shows the glowing result.",
    }),
  ],
  preview: {
    select: { media: "heroBackgroundImage" },
    prepare({ media }) {
      return { title: "🏠 Home Page", subtitle: "Edit homepage content & photos", media };
    },
  },
});

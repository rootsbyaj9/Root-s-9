import { defineField, defineType } from "sanity";

export const transformation = defineType({
  name: "transformation",
  title: "🪞 Transformations Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Transformation Title",
      type: "string",
      description: 'A short label for this photo. e.g. "Balayage Colour", "Bridal Look — Priya S.", "HydraFacial Glow"',
      validation: (Rule) => Rule.required().error("Please add a title for this transformation."),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "string",
      description: 'One line describing the treatment. e.g. "Global hair colour with toning — 3.5 hrs"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Transformation Photo",
      type: "image",
      options: { hotspot: true },
      description: "📸 TRANSFORMATIONS GALLERY — Choose your aspect ratio below first, then upload a photo cropped to those exact dimensions. The photo will fill the entire gallery card. File size: keep under 400 KB for fast loading.",
      fields: [
        defineField({
          name: "alt",
          title: "Image Description (for accessibility)",
          type: "string",
          description: 'e.g. "Client after balayage colour treatment at Root\'s Salon Uppal"',
        }),
      ],
    }),
    defineField({
      name: "aspect",
      title: "Photo Shape",
      type: "string",
      description: "Choose the shape of the gallery card for this photo. Upload a photo that matches the listed pixel size for the best result — uploading the wrong ratio will cause cropping.",
      options: {
        list: [
          { title: "📐 Portrait — Tall  (3:4) — upload 900 × 1200 px",        value: "aspect-[3/4]"  },
          { title: "📐 Landscape — Wide  (4:3) — upload 1200 × 900 px",      value: "aspect-[4/3]"  },
          { title: "📐 Narrow Portrait — Tallest (2:3) — upload 800 × 1200 px", value: "aspect-[2/3]"  },
          { title: "📐 Square  (1:1) — upload 900 × 900 px",                  value: "aspect-[1/1]"  },
          { title: "📐 Near-Square Portrait (4:5) — upload 960 × 1200 px",    value: "aspect-[4/5]"  },
        ],
        layout: "radio",
      },
      initialValue: "aspect-[3/4]",
    }),
    defineField({
      name: "mood",
      title: "Card Colour (fallback when no photo)",
      type: "string",
      description: "If no photo is uploaded, the gallery card uses this colour. Usually not visible.",
      options: {
        list: [
          { title: "☀️ Warm (cream/gold)",  value: "warm" },
          { title: "🌑 Dark (obsidian)",    value: "dark" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "warm",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Untitled", subtitle: subtitle || "", media };
    },
  },
});

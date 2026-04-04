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
      description: "📸 Upload the transformation photo here. This appears in the scrolling gallery on the Transformations page. For best results use a clear, well-lit photo.",
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
      description: "Choose how the photo is cropped in the gallery. Portrait (tall) works best for full-length looks; Square for face/detail shots.",
      options: {
        list: [
          { title: "📐 Portrait — Tall (best for full look)",             value: "aspect-[3/4]"  },
          { title: "📐 Landscape — Wide (good for groups/scene)",          value: "aspect-[4/3]"  },
          { title: "📐 Narrow Portrait — Tallest",                         value: "aspect-[2/3]"  },
          { title: "📐 Square",                                             value: "aspect-[1/1]"  },
          { title: "📐 Near-Square Portrait",                               value: "aspect-[4/5]"  },
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

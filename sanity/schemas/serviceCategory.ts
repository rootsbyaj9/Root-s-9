import { defineField, defineType } from "sanity";

export const serviceCategory = defineType({
  name: "serviceCategory",
  title: "Service Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      description: 'e.g. "Hair Masterclass", "Skin Rituals"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gender",
      title: "Gender Tab",
      type: "string",
      description: "Which tab this category appears under",
      options: {
        list: [
          { title: "Women's", value: "womens" },
          { title: "Men's", value: "mens" },
          { title: "Bridal Studio", value: "bridal" },
          { title: "Tattoo Artistry", value: "tattoo" },
          { title: "Both (Women & Men)", value: "both" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 10,
    }),
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "items",
      title: "Service Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Service Name", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "price", title: "Price", type: "string", description: 'e.g. "from ₹999" or "₹400"' }),
            defineField({ name: "description", title: "Description (optional)", type: "text", rows: 2 }),
            defineField({
              name: "isHighlighted",
              title: "Highlight (shows in gold)",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
          },
        },
      ],
    }),
    defineField({
      name: "bookingUrl",
      title: "Booking URL (optional)",
      type: "url",
    }),
  ],
  orderings: [{ title: "Display Order", name: "displayOrderAsc", by: [{ field: "displayOrder", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "gender" },
  },
});

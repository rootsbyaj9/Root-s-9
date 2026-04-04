import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "reviewerName",
      title: "Reviewer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reviewText",
      title: "Review Text",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(20).max(500),
    }),
    defineField({
      name: "rating",
      title: "Rating (1–5 stars)",
      type: "number",
      options: {
        list: [1, 2, 3, 4, 5],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "service",
      title: "Service Received",
      type: "string",
      description: 'e.g. "Balayage", "Bridal Makeup", "Facial"',
    }),
    defineField({
      name: "branch",
      title: "Branch",
      type: "string",
      options: {
        list: [
          { title: "Uppal", value: "Uppal" },
          { title: "Tarnaka", value: "Tarnaka" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isFeature",
      title: "Feature on Homepage",
      type: "boolean",
      description: "Show this review in the homepage marquee",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first in the marquee",
      initialValue: 100,
    }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "reviewerName", subtitle: "branch", description: "reviewText" },
  },
});

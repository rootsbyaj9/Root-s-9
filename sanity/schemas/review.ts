import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "⭐ Client Reviews",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      description: "The customer's name. e.g. \"Priya S.\" or \"Rahul Mehta\"",
      validation: (Rule) => Rule.required().error("Client name is required."),
    }),
    defineField({
      name: "branch",
      title: "Which branch did they visit?",
      type: "string",
      description: "Choose the branch. Select 'General' if it is not branch-specific.",
      options: {
        list: [
          { title: "Uppal Branch",   value: "Uppal"   },
          { title: "Tarnaka Branch", value: "Tarnaka" },
          { title: "General",        value: "General" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "General",
    }),
    defineField({
      name: "rating",
      title: "Star Rating (1–5)",
      type: "number",
      description: "How many stars did they give? Enter a number from 1 to 5.",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5).error("Rating must be between 1 and 5."),
    }),
    defineField({
      name: "date",
      title: "Date Label",
      type: "string",
      description: 'How the date appears on the website. e.g. "March 2025", "Recent", or "2 months ago"',
      initialValue: "Recent",
    }),
    defineField({
      name: "service",
      title: "Service Received (optional)",
      type: "string",
      description: 'The service this review is about. e.g. "Bridal Makeover", "HydraFacial", "Hair Colour"',
    }),
    defineField({
      name: "reviewText",
      title: "Review Text",
      type: "text",
      rows: 4,
      description: "The full review written by the customer.",
      validation: (Rule) => Rule.required().error("Review text is required."),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "reviewText" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Unnamed Review",
        subtitle: subtitle ? subtitle.substring(0, 60) + "…" : "No review text",
      };
    },
  },
});

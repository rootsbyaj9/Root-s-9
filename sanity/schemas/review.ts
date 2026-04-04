import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Reviewer Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "branch", title: "Branch Visited", type: "string", options: { list: ["Uppal", "Tarnaka", "General"] }, initialValue: "General" }),
    defineField({ name: "rating", title: "Rating (Out of 5)", type: "number", initialValue: 5, validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "date", title: "Date Label", type: "string", initialValue: "Recent" }),
    defineField({ name: "service", title: "Service Received", type: "string", description: "e.g. Hair Styling, Tattoo Studio" }),
    defineField({ name: "reviewText", title: "Review Text", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "name", subtitle: "branch" },
  },
});

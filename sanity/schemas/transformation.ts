import { defineField, defineType } from "sanity";

export const transformation = defineType({
  name: "transformation",
  title: "Transformation (Gallery)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "aspect", title: "Aspect Ratio", type: "string", options: { list: ["aspect-[3/4]", "aspect-[4/3]", "aspect-[2/3]", "aspect-[1/1]", "aspect-[4/5]"] }, initialValue: "aspect-[3/4]" }),
    defineField({ name: "mood", title: "Mood (Fallback Style)", type: "string", options: { list: ["warm", "dark"] }, initialValue: "warm" }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
  },
});

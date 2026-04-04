import { defineField, defineType } from "sanity";

export const location = defineType({
  name: "location",
  title: "Branch Location",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Branch Name",
      type: "string",
      description: 'e.g. "Root\'s The Family Salon - Uppal"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Full Address",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone (with country code)",
      type: "string",
      description: 'e.g. "+919700744357"',
      initialValue: "+919700744357",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number (digits only, no +)",
      type: "string",
      description: 'e.g. "919700744357"',
      initialValue: "919700744357",
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps URL",
      type: "url",
    }),
    defineField({
      name: "embedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      description: "The embed URL for the iframe map",
    }),
    defineField({
      name: "hours",
      title: "Opening Hours",
      type: "string",
      description: 'e.g. "Mon–Sun: 10 AM – 9 PM"',
      initialValue: "Mon–Sun: 10 AM – 9 PM",
    }),
    defineField({
      name: "description",
      title: "Branch Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "photo",
      title: "Branch Photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "isActive",
      title: "Active (show on site)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      initialValue: 1,
    }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "displayOrder", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "address" },
  },
});

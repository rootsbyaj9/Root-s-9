import { defineField, defineType } from "sanity";

export const serviceCategory = defineType({
  name: "serviceCategory",
  title: "💇 Services Menu",
  type: "document",
  groups: [
    { name: "basics",   title: "📋 Basic Info",    default: true },
    { name: "services", title: "✂️ Service Items"              },
    { name: "image",    title: "🖼️ Category Image"             },
  ],
  fields: [
    // ── BASICS ───────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Category Name",
      type: "string",
      group: "basics",
      description: 'What is this group of services called? e.g. "Hair Masterclass", "Skin Rituals", "Bridal Studio"',
      validation: (Rule) => Rule.required().error("Please enter a name for this category."),
    }),
    defineField({
      name: "slug",
      title: "URL Identifier (auto-generated)",
      type: "slug",
      group: "basics",
      options: { source: "title" },
      description: "📌 Click Generate — this is filled automatically from the name above. You don't need to type anything here.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gender",
      title: "Which tab does this appear under?",
      type: "string",
      group: "basics",
      description: "Pick the correct section on the Services page. Customers browse by these tabs.",
      options: {
        list: [
          { title: "💆 Women's",               value: "womens"  },
          { title: "💈 Men's",                  value: "mens"    },
          { title: "👰 Bridal Studio",           value: "bridal"  },
          { title: "🖋 Tattoo Artistry",          value: "tattoo"  },
          { title: "👫 Both (Women & Men)",       value: "both"    },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayOrder",
      title: "Sort Order",
      type: "number",
      group: "basics",
      description: "Lower numbers appear first on the page. e.g. 1 = top, 10 = near bottom.",
      initialValue: 10,
    }),
    defineField({
      name: "bookingUrl",
      title: "Booking Link (optional)",
      type: "url",
      group: "basics",
      description: 'Paste a WhatsApp or booking link if you want a unique CTA for this category. Leave blank to use the default.',
    }),

    // ── SERVICE ITEMS ─────────────────────────────────────────────────────
    defineField({
      name: "items",
      title: "Services in this category",
      type: "array",
      group: "services",
      description: "Add, edit, or remove individual services below. Each item shows as a row in the menu.",
      of: [
        {
          type: "object",
          title: "Service",
          fields: [
            defineField({
              name: "name",
              title: "Service Name",
              type: "string",
              description: 'e.g. "Hair Cut & Style", "HydraFacial"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              description: 'Type the price as you want it displayed. e.g. "from ₹999" or "₹400 – ₹800"',
            }),
            defineField({
              name: "description",
              title: "Short Description (optional)",
              type: "text",
              rows: 2,
              description: "A one-line note about what's included. Leave blank if not needed.",
            }),
            defineField({
              name: "isHighlighted",
              title: "⭐ Highlight this service?",
              type: "boolean",
              description: "Turn on to show this service in gold/orange — great for a bestseller or new launch.",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
            prepare({ title, subtitle }) {
              return { title: title || "Unnamed service", subtitle: subtitle || "No price set" };
            },
          },
        },
      ],
    }),

    // ── IMAGE ────────────────────────────────────────────────────────────
    defineField({
      name: "image",
      title: "Category Cover Photo",
      type: "image",
      group: "image",
      options: { hotspot: true },
      description: "📸 HOME PAGE — Services Grid card photo. Required Size: exactly 600 × 800 px (3:4 portrait). Max file size: 300KB. Format: WEBP or JPG. 📱 The subject MUST be centred — use the hotspot feature to set the focal point for mobile devices.",
      fields: [
        defineField({
          name: "alt",
          title: "Image Description (for accessibility)",
          type: "string",
          description: 'Describe the photo briefly, e.g. "Woman with newly coloured balayage hair". Helps screen readers and Google.',
        }),
      ],
    }),
  ],
  orderings: [
    { title: "Sort Order (low to high)", name: "displayOrderAsc", by: [{ field: "displayOrder", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "gender", media: "image" },
    prepare({ title, subtitle, media }) {
      const tab = { womens: "Women's", mens: "Men's", bridal: "Bridal", tattoo: "Tattoo", both: "Both" } as Record<string,string>;
      return { title: title || "Untitled", subtitle: tab[subtitle] ?? subtitle, media };
    },
  },
});

import { defineField, defineType } from "sanity";

export const location = defineType({
  name: "location",
  title: "📍 Branch Locations",
  type: "document",
  groups: [
    { name: "contact",  title: "📞 Contact & Address", default: true },
    { name: "hours",    title: "🕐 Hours & Map"                      },
    { name: "photo",    title: "📸 Branch Photo"                      },
    { name: "settings", title: "⚙️ Settings"                          },
  ],
  fields: [
    // ── CONTACT & ADDRESS ─────────────────────────────────────────────────
    defineField({
      name: "name",
      title: "Branch Name",
      type: "string",
      group: "contact",
      description: 'Full name of this branch. e.g. "Root\'s The Family Salon - Uppal"',
      validation: (Rule) => Rule.required().error("Branch name is required."),
    }),
    defineField({
      name: "address",
      title: "Full Street Address",
      type: "text",
      rows: 3,
      group: "contact",
      description: "Paste the complete address as it should appear on the website and Google.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number (with + country code)",
      type: "string",
      group: "contact",
      description: 'Include the country code. e.g. "+919700744357"',
      initialValue: "+919700744357",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number (digits only, no + sign)",
      type: "string",
      group: "contact",
      description: 'Write only digits — no spaces, no plus. e.g. "919700744357". This is used for the WhatsApp chat button.',
      initialValue: "919700744357",
    }),
    defineField({
      name: "description",
      title: "Branch Description",
      type: "text",
      rows: 2,
      group: "contact",
      description: "Optional one or two sentences describing this branch. e.g. its specialty or notable features.",
    }),

    // ── HOURS & MAP ──────────────────────────────────────────────────────
    defineField({
      name: "hours",
      title: "Opening Hours",
      type: "string",
      group: "hours",
      description: 'How hours appear on the site. e.g. "Mon–Sun: 10 AM – 9 PM"',
      initialValue: "Mon–Sun: 10 AM – 9 PM",
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps Link",
      type: "url",
      group: "hours",
      description: '🗺️ Open Google Maps, find your branch, click "Share" → "Copy Link". Paste that full link here. Used for the "Get Directions" button.',
    }),
    defineField({
      name: "embedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      group: "hours",
      description: '🗺️ To get this: open Google Maps → your location → Share → Embed a map → copy just the URL from inside src="...". Paste it here to show an interactive map on the page.',
    }),

    // ── PHOTO ─────────────────────────────────────────────────────────────
    defineField({
      name: "photo",
      title: "Branch Photo",
      type: "image",
      group: "photo",
      options: { hotspot: true },
      description: "📸 LOCATIONS PAGE — Branch card photo. Ratio: 16:9 (landscape/wide) or 4:3. Size: 1200 × 675 px (16:9) or 1200 × 900 px (4:3). Use a clear salon exterior or interior shot with good lighting. File size: keep under 500 KB.",
      fields: [
        defineField({
          name: "alt",
          title: "Image Description (for accessibility)",
          type: "string",
          description: 'e.g. "Root\'s Salon Uppal branch exterior on main road"',
        }),
      ],
    }),

    // ── SETTINGS ─────────────────────────────────────────────────────────
    defineField({
      name: "isActive",
      title: "Show this branch on the website?",
      type: "boolean",
      group: "settings",
      description: "Turn OFF to temporarily hide a branch (e.g. if it's under renovation). Turning it back ON shows it again immediately.",
      initialValue: true,
    }),
    defineField({
      name: "displayOrder",
      title: "Sort Order",
      type: "number",
      group: "settings",
      description: "The branch with 1 appears first on the page, 2 second, etc.",
      initialValue: 1,
    }),
  ],
  orderings: [
    { title: "Sort Order", name: "orderAsc", by: [{ field: "displayOrder", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "address", media: "photo" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Unnamed Branch", subtitle: (subtitle || "").split("\n")[0], media };
    },
  },
});

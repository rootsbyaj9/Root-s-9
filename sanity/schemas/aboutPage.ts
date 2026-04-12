import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  // Singleton — enforced via structureTool structure in sanity.config.ts
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "founder", title: "Founder Section" },
    { name: "timeline", title: "Timeline Section" },
    { name: "values", title: "Values Section" },
  ],
  fields: [
    // ── Background ─────────────────────────────────────────────────────────────
    defineField({
      name: "aboutBackgroundImage",
      title: "About Section Full-Width Background Pattern/Image",
      type: "image",
      options: { hotspot: true },
      description: "📸 ABOUT PAGE — full-width decorative background pattern or texture. Required Size: exactly 1920 × 600 px (panoramic). Max file size: 400KB. Format: WEBP or JPG. 📱 Mobile Safe Zone: keep important elements centred as edges will crop on mobile.",
    }),
    // ── Hero ─────────────────────────────────────────────────────────────────
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow Text",
      type: "string",
      group: "hero",
      initialValue: "OUR STORY",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      group: "hero",
      initialValue: "We started Root's for our family.",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      group: "hero",
      rows: 3,
      initialValue:
        "Root's The Family Salon — where every generation walks out feeling their best. Expert hair, skin, bridal and tattoo services in Hyderabad.",
    }),

    // ── Founder ──────────────────────────────────────────────────────────────
    defineField({
      name: "founderName",
      title: "Founder Name",
      type: "string",
      group: "founder",
      initialValue: "Anikanth Jadhav",
    }),
    defineField({
      name: "founderHeadline",
      title: "Founder Section Headline",
      type: "string",
      group: "founder",
      initialValue: "I started Root's for my family.",
    }),
    defineField({
      name: "founderQuote",
      title: "Founder Pull Quote",
      type: "text",
      group: "founder",
      rows: 3,
      initialValue:
        "I wanted one place where my parents, my spouse, my kids — every generation — could walk out feeling their best. That's still why I do this.",
    }),
    defineField({
      name: "founderBio1",
      title: "Founder Bio — Paragraph 1",
      type: "text",
      group: "founder",
      rows: 3,
      initialValue:
        "Before Root's, Hyderabad had a clear gap — boutique-quality salons were expensive and inaccessible; affordable salons often cut corners. We built the alternative: premium technique, professional-grade products, and a genuinely warm space that welcomes every age and every budget.",
    }),
    defineField({
      name: "founderBio2",
      title: "Founder Bio — Paragraph 2",
      type: "text",
      group: "founder",
      rows: 3,
      initialValue:
        "Three branches later, we're still that same place my family visits every month. We've simply invited more families in.",
    }),
    defineField({
      name: "founderImage",
      title: "Founder / Salon Photo",
      type: "image",
      group: "founder",
      description: "📸 ABOUT PAGE — Founder photo shown next to the founder story. Required Size: exactly 600 × 800 px (3:4 portrait). Max file size: 300KB. Format: WEBP or JPG. 📱 Focal point should be centred for optimal mobile display.",
    }),

    // ── Timeline ─────────────────────────────────────────────────────────────
    defineField({
      name: "timelineHeading",
      title: "Timeline Section Heading",
      type: "string",
      group: "timeline",
      initialValue: "Eight years of growing together.",
    }),
    defineField({
      name: "milestones",
      title: "Milestones",
      type: "array",
      group: "timeline",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "Year", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "event", title: "Event Description", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "year", subtitle: "event" } },
        },
      ],
    }),

    // ── Values ───────────────────────────────────────────────────────────────
    defineField({
      name: "valuesHeading",
      title: "Values Section Heading",
      type: "string",
      group: "values",
      initialValue: "Our three principles.",
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      group: "values",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "number", title: "Number Label", type: "string", description: 'e.g. "01"' }),
            defineField({ name: "title", title: "Value Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "body", title: "Value Description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "title", subtitle: "number" } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page Content" };
    },
  },
});

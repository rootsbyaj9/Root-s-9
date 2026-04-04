import { defineField, defineType } from "sanity";

export const franchisePage = defineType({
  name: "franchisePage",
  title: "🤝 Franchise Page",
  type: "document",
  groups: [
    { name: "hero",    title: "🎬 Hero Section",       default: true },
    { name: "reasons", title: "✅ Why Partner With Us"               },
    { name: "model",   title: "💰 Investment Details"                },
    { name: "faq",     title: "❓ FAQ"                               },
  ],
  fields: [
    // ── HERO ─────────────────────────────────────────────────────────────
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Photo",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description: "📸 FRANCHISE PAGE — full-screen hero background. Ratio: 16:9 (landscape). Size: minimum 1920 × 1080 px. Ideal: 2560 × 1440 px. Use a professional salon interior or team photo.",
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Small Label (above headline)",
      type: "string",
      group: "hero",
      description: 'Small text above the main heading. e.g. "FRANCHISE OPPORTUNITY"',
      initialValue: "FRANCHISE OPPORTUNITY",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      group: "hero",
      description: 'The big headline. e.g. "Own a Root\'s."',
      initialValue: "Own a Root's.",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Description",
      type: "text",
      rows: 3,
      group: "hero",
      description: "A 2–3 sentence pitch below the headline. Keep it motivating and clear.",
      initialValue: "Bring Hyderabad's most trusted family salon to your city. We'll give you the brand, the training, and the support. You bring the ambition.",
    }),

    // ── WHY PARTNER ───────────────────────────────────────────────────────
    defineField({
      name: "reasonsHeading",
      title: "Section Heading",
      type: "string",
      group: "reasons",
      description: 'Heading above the list of benefits. e.g. "Built for successful franchise partners."',
      initialValue: "Built for successful franchise partners.",
    }),
    defineField({
      name: "reasons",
      title: "Benefit Points",
      type: "array",
      group: "reasons",
      description: "Each item is a reason/benefit explaining why someone should franchise with Root's. Add, edit, or remove points here.",
      of: [
        {
          type: "object",
          title: "Benefit",
          fields: [
            defineField({ name: "title", title: "Benefit Title",       type: "string", description: 'e.g. "A Brand People Trust"' }),
            defineField({ name: "body",  title: "Benefit Description", type: "text",   rows: 3, description: "Explain this benefit in 2–3 sentences." }),
          ],
          preview: {
            select: { title: "title" },
            prepare: ({ title }) => ({ title: title || "Unnamed Benefit" }),
          },
        },
      ],
      initialValue: [
        { title: "A Brand People Trust", body: "Root's has built a loyal customer base across Hyderabad over 5 years. When you open a Root's franchise, you inherit that trust immediately — not having to build it from zero." },
        { title: "Full Training & Ongoing Support", body: "From recruitment and pricing to operations and client management — we train your team and stay available. Our franchise partners never feel alone." },
        { title: "Exclusive Territory Rights", body: "Each franchise is given exclusive geographic territory. No Root's outlet will open within your zone — your market is protected." },
      ],
    }),

    // ── MODEL / INVESTMENT ────────────────────────────────────────────────
    defineField({
      name: "modelHeading",
      title: "Investment Section Heading",
      type: "string",
      group: "model",
      description: 'Heading above the investment table. e.g. "A model built to win."',
      initialValue: "A model built to win.",
    }),
    defineField({
      name: "modelPoints",
      title: "Investment Details",
      type: "array",
      group: "model",
      description: 'Each row is a key–value pair in the investment table. e.g. Label: "Investment Range", Value: "₹15L – ₹30L".',
      of: [
        {
          type: "object",
          title: "Detail Row",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", description: 'e.g. "Investment Range", "Royalty %" ' }),
            defineField({ name: "value", title: "Value", type: "string", description: 'e.g. "₹15L – ₹30L", "6% of monthly revenue"' }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
            prepare: ({ title, subtitle }) => ({ title: title || "Row", subtitle: subtitle || "" }),
          },
        },
      ],
      initialValue: [
        { label: "Investment Range",    value: "₹15L – ₹30L (depending on location & size)" },
        { label: "Avg. Break-even",     value: "12–18 months"                                },
        { label: "Royalty",             value: "6% of monthly revenue"                        },
        { label: "Training Duration",   value: "4 weeks (on-site at Hyderabad HQ)"            },
        { label: "Launch Support",      value: "Grand Opening marketing, local social campaign"},
        { label: "Territories Open",    value: "Pan-India (priority to Hyderabad zones)"       },
      ],
    }),

    // ── FAQ ───────────────────────────────────────────────────────────────
    defineField({
      name: "faqHeading",
      title: "FAQ Section Heading",
      type: "string",
      group: "faq",
      description: 'Heading above the FAQ accordion. e.g. "Common Questions"',
      initialValue: "FAQ",
    }),
    defineField({
      name: "faqs",
      title: "Questions & Answers",
      type: "array",
      group: "faq",
      description: "Each item is one FAQ. Click + to add a new question. Click any existing one to edit it.",
      of: [
        {
          type: "object",
          title: "FAQ",
          fields: [
            defineField({ name: "q", title: "Question", type: "string", description: 'e.g. "Do I need prior experience in the beauty industry?"' }),
            defineField({ name: "a", title: "Answer",   type: "text",   rows: 3, description: "Give a clear, honest answer." }),
          ],
          preview: {
            select: { title: "q" },
            prepare: ({ title }) => ({ title: title || "Untitled FAQ" }),
          },
        },
      ],
      initialValue: [
        { q: "Do I need prior experience in the beauty industry?", a: "No. Business acumen and a passion for customer experience are more important. We train your staff on all technical skills." },
        { q: "How long does it take to open after signing?",        a: "Typically 60–90 days from agreement to grand opening. This includes location fit-out, staff recruitment, and training." },
        { q: "What kind of support do I receive after launch?",     a: "Dedicated franchise coordinator, monthly performance reviews, access to Root's marketing materials, product sourcing at partner rates, and priority support for any operational issues." },
        { q: "Can I open in a city outside Hyderabad?",             a: "Yes. We are actively looking for franchise partners across Telangana and Andhra Pradesh. Pan-India expansion is in the pipeline for 2025–26." },
        { q: "Is there a minimum salon size requirement?",          a: "We recommend a minimum of 800 sq. ft. Smaller formats (600 sq. ft.) are possible for express-service outlets." },
      ],
    }),
  ],
  preview: {
    select: { media: "heroBackgroundImage" },
    prepare({ media }) {
      return { title: "🤝 Franchise Page", subtitle: "Edit franchise page content", media };
    },
  },
});

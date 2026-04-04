import { defineField, defineType } from "sanity";

export const franchisePage = defineType({
  name: "franchisePage",
  title: "Franchise Page",
  type: "document",
  fields: [
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow Text",
      type: "string",
      initialValue: "FRANCHISE OPPORTUNITY",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      initialValue: "Own a Root's.",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 3,
      initialValue: "Bring Hyderabad's most trusted family salon to your city. We'll give you the brand, the training, and the support. You bring the ambition.",
    }),
    defineField({
      name: "reasonsHeading",
      title: "Why Partner With Us Heading",
      type: "string",
      initialValue: "Built for successful franchise partners.",
    }),
    defineField({
      name: "reasons",
      title: "Why Partner With Us (Reasons)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Description", type: "text", rows: 3 }),
          ],
        },
      ],
      initialValue: [
        { title: "A Brand People Trust", body: "Root's has built a loyal customer base across Hyderabad over 5 years. When you open a Root's franchise, you inherit that trust immediately — not having to build it from zero." },
        { title: "Full Training & Ongoing Support", body: "From recruitment and pricing to operations and client management — we train your team and stay available. Our franchise partners never feel alone." },
        { title: "Exclusive Territory Rights", body: "Each franchise is given exclusive geographic territory. No Root's outlet will open within your zone — your market is protected." },
      ]
    }),
    defineField({
      name: "modelHeading",
      title: "Model Overview Heading",
      type: "string",
      initialValue: "A model built to win.",
    }),
    defineField({
      name: "modelPoints",
      title: "Model Overview Points",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
      initialValue: [
        { label: "Investment Range", value: "₹15L – ₹30L (depending on location & size)" },
        { label: "Avg. Break-even", value: "12–18 months" },
        { label: "Royalty", value: "6% of monthly revenue" },
        { label: "Training Duration", value: "4 weeks (on-site at Hyderabad HQ)" },
        { label: "Launch Support", value: "Grand Opening marketing, local social campaign" },
        { label: "Territories Open", value: "Pan-India (priority to Hyderabad expanded zones)" },
      ]
    }),
    defineField({
      name: "faqHeading",
      title: "FAQ Heading",
      type: "string",
      initialValue: "FAQ",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "q", title: "Question", type: "string" }),
            defineField({ name: "a", title: "Answer", type: "text", rows: 3 }),
          ],
        },
      ],
      initialValue: [
        { q: "Do I need prior experience in the beauty industry?", a: "No. Business acumen and a passion for customer experience are more important. We train your staff on all technical skills. You focus on running an excellent business." },
        { q: "How long does it take to open after signing?", a: "Typically 60–90 days from agreement to grand opening. This includes location fit-out, staff recruitment, and training." },
        { q: "What kind of support do I receive after launch?", a: "Ongoing: dedicated franchise coordinator, monthly performance reviews, access to Root's marketing materials, product sourcing at partner rates, and priority support for any operational issues." },
        { q: "Can I open in a city outside Hyderabad?", a: "Yes. We are actively looking for franchise partners across Telangana and Andhra Pradesh. Pan-India expansion is in the pipeline for 2025–26." },
        { q: "Is there a minimum salon size requirement?", a: "We recommend a minimum of 800 sq. ft. to accommodate hair, skin, and beauty services comfortably. Smaller formats (600 sq. ft.) are possible for express-service outlets." },
      ]
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: `Franchise Page Configuration` };
    },
  },
});

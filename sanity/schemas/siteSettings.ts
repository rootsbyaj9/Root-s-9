import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "⚙️ Site Settings",
  type: "document",
  groups: [
    { name: "stats",   title: "📊 Homepage Stats",   default: true },
    { name: "banner",  title: "📢 Offer Banner"                    },
    { name: "contact", title: "📞 Contact & Social"                 },
    { name: "footer",  title: "🦶 Footer Text"                      },
  ],
  fields: [
    // ── HOMEPAGE STATS ────────────────────────────────────────────────────
    defineField({
      name: "yearsOfMastery",
      title: "Years in Business",
      type: "string",
      group: "stats",
      description: 'Shown in the homepage "trust strip" as a stat. e.g. "8+" or "9+"',
      initialValue: "8+",
    }),
    defineField({
      name: "googleRating",
      title: "Google Rating",
      type: "string",
      group: "stats",
      description: 'Your average star rating. e.g. "4.8/5"',
      initialValue: "4.8/5",
    }),
    defineField({
      name: "reviewCount",
      title: "Total Number of Reviews",
      type: "string",
      group: "stats",
      description: 'Total review count across all branches. e.g. "1,600+" or "1,900+"',
      initialValue: "1,600+",
    }),
    defineField({
      name: "branchCount",
      title: "Number of Branches",
      type: "string",
      group: "stats",
      description: 'e.g. "2" or "3"',
      initialValue: "2",
    }),

    // ── OFFER BANNER ──────────────────────────────────────────────────────
    defineField({
      name: "offerBannerEnabled",
      title: "Show offer banner at the top of the website?",
      type: "boolean",
      group: "banner",
      description: "Toggle this ON to display a scrolling announcement bar at the very top of every page.",
      initialValue: true,
    }),
    defineField({
      name: "offerBannerText",
      title: "Offer Banner Message",
      type: "string",
      group: "banner",
      description: 'The message that scrolls across the top. e.g. "Book via WhatsApp & get 10% off your first visit 🎉"',
      initialValue: "Book via WhatsApp & get 10% off your first visit",
    }),
    defineField({
      name: "offerBannerExpiry",
      title: "Auto-hide banner after this date (optional)",
      type: "datetime",
      group: "banner",
      description: "If you set a date here, the banner will disappear automatically once that date passes. Leave blank to keep it showing permanently.",
    }),

    // ── CONTACT & SOCIAL ──────────────────────────────────────────────────
    defineField({
      name: "contactEmail",
      title: "Business Email",
      type: "string",
      group: "contact",
      description: "Used in the footer and contact section.",
      initialValue: "rootsbyaj9@gmail.com",
    }),
    defineField({
      name: "contactPhone",
      title: "Phone Number (displayed on site)",
      type: "string",
      group: "contact",
      description: 'How the phone number appears as text. e.g. "+91 97007 44357"',
      initialValue: "+91 97007 44357",
    }),
    defineField({
      name: "contactWhatsApp",
      title: "WhatsApp Number (digits only, no + sign)",
      type: "string",
      group: "contact",
      description: 'Digits only — no spaces or +. e.g. "919700744357". Used for the WhatsApp buttons across the site.',
      initialValue: "919700744357",
    }),
    defineField({
      name: "socialInstagram",
      title: "Instagram Profile URL",
      type: "url",
      group: "contact",
      description: 'Paste your full Instagram link. e.g. "https://www.instagram.com/roots_by_aj"',
      initialValue: "https://www.instagram.com/roots_by_aj",
    }),
    defineField({
      name: "socialFacebook",
      title: "Facebook Profile URL",
      type: "url",
      group: "contact",
      description: 'Paste your full Facebook page link.',
      initialValue: "https://www.facebook.com/anikanth.jadhav.1",
    }),

    // ── FOOTER ────────────────────────────────────────────────────────────
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "text",
      group: "footer",
      description: "The short paragraph that appears under the logo in the footer at the bottom of every page.",
      initialValue: "Hyderabad's family salon — premium hair, skin, and beauty services across 3 branches. Crafted for every generation.",
    }),
  ],
  preview: {
    select: { title: "googleRating", subtitle: "reviewCount" },
    prepare({ title, subtitle }) {
      return { title: "⚙️ Site Settings", subtitle: `Rating: ${title} · Reviews: ${subtitle}` };
    },
  },
});

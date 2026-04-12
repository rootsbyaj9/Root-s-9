import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "📝 Blog Posts",
  type: "document",
  groups: [
    { name: "content",   title: "✍️ Write Your Post", default: true },
    { name: "thumbnail", title: "🖼️ Cover Image & Category"          },
    { name: "settings",  title: "⚙️ Publish Settings"                },
  ],
  fields: [
    // ── CONTENT ──────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Blog Post Title",
      type: "string",
      group: "content",
      description: 'Write a clear, engaging title. e.g. "5 Hair Care Tips for Monsoon Season"',
      validation: (Rule) => Rule.required().error("Every blog post needs a title."),
    }),
    defineField({
      name: "slug",
      title: "Web Address (auto-generated)",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      description: "📌 Click Generate after writing your title. This becomes part of the blog post URL. You do not need to type this yourself.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short Summary",
      type: "text",
      rows: 3,
      group: "content",
      description: "Write 1–2 sentences summarising the post. This appears in search results and on the blog listing page. Keep it under 160 characters.",
      validation: (Rule) =>
        Rule.required()
          .max(160)
          .error("Summary must be 160 characters or fewer."),
    }),
    defineField({
      name: "body",
      title: "Post Content",
      type: "array",
      group: "content",
      description: "Write your full blog post here. Use the toolbar to add headings, bold text, bullet points, or photos inside the article.",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          description: "📸 BLOG BODY — in-article photo. Required Size: exactly 800 × 450 px (16:9) or 800 × 600 px (4:3). Max file size: 300KB. Format: WEBP or JPG. 📱 Displays full-width inside the article.",
          fields: [
            defineField({
              name: "alt",
              title: "Image Description",
              type: "string",
              description: "Describe this photo briefly for accessibility. e.g. \"Stylist applying hair colour at Root's salon\"",
            }),
          ],
        },
      ],
    }),

    // ── COVER IMAGE & CATEGORY ────────────────────────────────────────────
    defineField({
      name: "mainImage",
      title: "Cover Photo",
      type: "image",
      group: "thumbnail",
      options: { hotspot: true },
      description: "📸 BLOG — Cover/thumbnail photo. Required Size: exactly 1200 × 630 px (16:9). Max file size: 400KB. Format: WEBP or JPG. 📱 Optimal for WhatsApp sharing and mobile SEO.",
      fields: [
        defineField({
          name: "alt",
          title: "Image Description",
          type: "string",
          description: 'e.g. "Beautiful balayage hair colour result at Root\'s Salon Hyderabad"',
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Post Category",
      type: "string",
      group: "thumbnail",
      description: "Choose the category that best fits this article. It will appear as a tag on the blog listing.",
      options: {
        list: [
          { title: "💇 Hair Colour",    value: "Hair Colour"   },
          { title: "✨ Skin Therapy",   value: "Skin Therapy"  },
          { title: "👰 Bridal",         value: "Bridal"        },
          { title: "🖋 Tattoo",          value: "Tattoo"        },
          { title: "🌿 Hair Care Tips", value: "Hair Care"     },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── PUBLISH SETTINGS ──────────────────────────────────────────────────
    defineField({
      name: "publishedAt",
      title: "Publish Date",
      type: "datetime",
      group: "settings",
      description: "When was / will this post go live? Defaults to today.",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "readTime",
      title: "Estimated Read Time (minutes)",
      type: "number",
      group: "settings",
      description: "Roughly how many minutes to read. e.g. 3 for a short post, 7 for a long one. This appears as a badge on the blog card.",
      initialValue: 3,
    }),
  ],
  orderings: [
    { title: "Newest First", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "mainImage" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Draft Post", subtitle: subtitle || "No category", media };
    },
  },
});

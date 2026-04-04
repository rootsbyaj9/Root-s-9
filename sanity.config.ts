import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectId, dataset } from "./sanity/env";
import { serviceCategory } from "./sanity/schemas/serviceCategory";
import { post } from "./sanity/schemas/post";
import { location } from "./sanity/schemas/location";
import { siteSettings } from "./sanity/schemas/siteSettings";
import { aboutPage } from "./sanity/schemas/aboutPage";
import { homePage } from "./sanity/schemas/homePage";
import { franchisePage } from "./sanity/schemas/franchisePage";
import { review } from "./sanity/schemas/review";
import { transformation } from "./sanity/schemas/transformation";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Root's Salon — Content Manager",
  schema: {
    types: [
      siteSettings,
      aboutPage,
      homePage,
      franchisePage,
      serviceCategory,
      post,
      location,
      review,
      transformation,
    ],
  },
  plugins: [
    structureTool({
      title: "📂 Content",
      structure: (S) =>
        S.list()
          .title("What would you like to update?")
          .items([

            // ── SERVICES MENU ─────────────────────────────────────────────
            S.listItem()
              .title("✂️ Services Menu")
              .icon(() => "✂️")
              .child(
                S.documentTypeList("serviceCategory")
                  .title("Select a category to edit")
                  .defaultOrdering([{ field: "displayOrder", direction: "asc" }])
              ),

            // ── BLOG POSTS ────────────────────────────────────────────────
            S.listItem()
              .title("📝 Blog Posts")
              .icon(() => "📝")
              .child(
                S.documentTypeList("post")
                  .title("Blog Posts")
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
              ),

            // ── CLIENT REVIEWS ────────────────────────────────────────────
            S.listItem()
              .title("⭐ Client Reviews")
              .icon(() => "⭐")
              .child(
                S.documentTypeList("review")
                  .title("Client Reviews")
              ),

            // ── TRANSFORMATIONS ───────────────────────────────────────────
            S.listItem()
              .title("🪞 Transformations Gallery")
              .icon(() => "🪞")
              .child(
                S.documentTypeList("transformation")
                  .title("Transformation Photos")
              ),

            S.divider(),

            // ── PAGE CONTENT ──────────────────────────────────────────────
            S.listItem()
              .title("🏠 Home Page — Edit Text & Photos")
              .icon(() => "🏠")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
                  .title("Home Page")
              ),
            S.listItem()
              .title("ℹ️ About Page — Edit Text & Photos")
              .icon(() => "ℹ️")
              .child(
                S.document()
                  .schemaType("aboutPage")
                  .documentId("aboutPage")
                  .title("About Page")
              ),
            S.listItem()
              .title("🤝 Franchise Page — Edit Text & Photos")
              .icon(() => "🤝")
              .child(
                S.document()
                  .schemaType("franchisePage")
                  .documentId("franchisePage")
                  .title("Franchise Page")
              ),

            S.divider(),

            // ── LOCATIONS & GLOBAL ────────────────────────────────────────
            S.listItem()
              .title("📍 Branch Locations — Addresses & Hours")
              .icon(() => "📍")
              .child(
                S.documentTypeList("location")
                  .title("Branch Locations")
                  .defaultOrdering([{ field: "displayOrder", direction: "asc" }])
              ),
            S.listItem()
              .title("⚙️ Site Settings — Contact, Banner & Social Links")
              .icon(() => "⚙️")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site Settings")
              ),
          ]),
    }),
    visionTool(),
  ],
});

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
      homePage,
      aboutPage,
      serviceCategory,
      location,
      transformation,
      review,
      post,
      franchisePage,
      siteSettings,
    ],
  },
  plugins: [
    structureTool({
      title: "📂 Content",
      structure: (S) =>
        S.list()
          .title("Root's Content Manager")
          .items([
            // ── 1. HOME PAGE ──────────────────────────────────────────────
            S.listItem()
              .title("🏠 1. Home Page")
              .icon(() => "🏠")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
                  .title("Home Page — All Sections in Scroll Order")
              ),

            // ── 2. ABOUT PAGE ─────────────────────────────────────────────
            S.listItem()
              .title("ℹ️ 2. About Page")
              .icon(() => "ℹ️")
              .child(
                S.document()
                  .schemaType("aboutPage")
                  .documentId("aboutPage")
                  .title("About Page — Story, Philosophy & Principles")
              ),

            // ── 3. SERVICES MENU ──────────────────────────────────────────
            S.listItem()
              .title("✂️ 3. Services Menu")
              .icon(() => "✂️")
              .child(
                S.documentTypeList("serviceCategory")
                  .title("Service Menus (Women, Men, Bridal, Tattoo)")
                  .defaultOrdering([{ field: "displayOrder", direction: "asc" }])
              ),

            // ── 4. BRANCH LOCATIONS ───────────────────────────────────────
            S.listItem()
              .title("📍 4. Branch Locations")
              .icon(() => "📍")
              .child(
                S.documentTypeList("location")
                  .title("Branches (Uppal, Tarnaka, Yamjal)")
                  .defaultOrdering([{ field: "displayOrder", direction: "asc" }])
              ),

            S.divider(),

            // ── 5. TRANSFORMATIONS GALLERY ────────────────────────────────
            S.listItem()
              .title("🪞 5. Transformations Gallery")
              .icon(() => "🪞")
              .child(
                S.documentTypeList("transformation")
                  .title("Real Client Transformation Photos")
              ),

            // ── 6. CLIENT REVIEWS ─────────────────────────────────────────
            S.listItem()
              .title("⭐ 6. Client Reviews")
              .icon(() => "⭐")
              .child(
                S.documentTypeList("review")
                  .title("Verified Client Reviews")
              ),

            // ── 7. BLOG POSTS ─────────────────────────────────────────────
            S.listItem()
              .title("📝 7. Blog Articles")
              .icon(() => "📝")
              .child(
                S.documentTypeList("post")
                  .title("Blog Posts & Hair/Skin Care Guides")
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
              ),

            // ── 8. FRANCHISE PAGE ─────────────────────────────────────────
            S.listItem()
              .title("🤝 8. Franchise Page")
              .icon(() => "🤝")
              .child(
                S.document()
                  .schemaType("franchisePage")
                  .documentId("franchisePage")
                  .title("Franchise Page — Model & Information")
              ),

            S.divider(),

            // ── 9. GLOBAL SITE SETTINGS ───────────────────────────────────
            S.listItem()
              .title("⚙️ 9. Site Settings")
              .icon(() => "⚙️")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Global Contact, Hours, Social & Banner")
              ),
          ]),
    }),
    visionTool(),
  ],
});

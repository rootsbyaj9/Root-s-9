import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectId, dataset } from "./sanity/env";
import { serviceCategory } from "./sanity/schemas/serviceCategory";
import { review } from "./sanity/schemas/review";
import { post } from "./sanity/schemas/post";
import { location } from "./sanity/schemas/location";
import { siteSettings } from "./sanity/schemas/siteSettings";
import { aboutPage } from "./sanity/schemas/aboutPage";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Root's Salon CMS",
  schema: {
    types: [
      // ── Page / singleton content ───────────────────────────
      siteSettings,
      aboutPage,
      // ── Repeatable content ─────────────────────────────────
      serviceCategory,
      review,
      post,
      location,
    ],
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singletons — only one document each
            S.listItem()
              .title("Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("About Page")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.divider(),
            // Collections
            S.documentTypeListItem("serviceCategory").title("Service Categories"),
            S.documentTypeListItem("review").title("Reviews"),
            S.documentTypeListItem("post").title("Blog Posts"),
            S.documentTypeListItem("location").title("Branch Locations"),
          ]),
    }),
    visionTool(),
  ],
});

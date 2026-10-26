import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { getLocationsQuery } from "@/sanity/lib/queries";
import { BRANCHES_FIXTURE } from "@/fixtures/locations";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rootssalons.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsLocations = await client?.fetch(getLocationsQuery).catch(() => null) ?? [];
  const rawLocations = Array.isArray(cmsLocations) && cmsLocations.length > 0 ? cmsLocations : BRANCHES_FIXTURE;

  const branchEntries: MetadataRoute.Sitemap = rawLocations.map((loc: any) => ({
    url: `${BASE_URL}/locations/${(loc.slug || loc.shortName || loc.name.split(/[-—]/).pop()?.trim()).toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/locations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...branchEntries,
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/franchise`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/transformations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}

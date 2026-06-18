import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./env";

// `client` is null at build time when env vars aren't present (Vercel preview
// build without secrets configured). Pages handle this via .catch(() => null).
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Always query live Sanity API — Next.js ISR handles page caching
    })
  : null;

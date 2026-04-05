// Provide empty-string fallbacks so createClient() never receives `undefined`
// during static build (the fetch will fail gracefully, not throw at construction).
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ncrxhomy";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

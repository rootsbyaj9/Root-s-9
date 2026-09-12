import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const studioSecurityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
];

const securityHeaders = [
  ...studioSecurityHeaders,
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    // CSP: allow Sanity API/CDN, Google Analytics, Google Fonts, self
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io https://*.api.sanity.io https://*.apicdn.sanity.io https://lh3.googleusercontent.com https://streetviewpixels-pa.googleapis.com https://images.unsplash.com https://res.cloudinary.com",
      "connect-src 'self' https://*.sanity.io https://*.api.sanity.io https://*.apicdn.sanity.io wss://*.sanity.io wss://*.api.sanity.io https://*.sanity.work https://registry.npmjs.org https://www.google-analytics.com https://places.googleapis.com ws: wss:",
      "worker-src 'self' blob:",
      "frame-src 'self' https://www.google.com https://*.sanity.io https://*.api.sanity.io",
      "media-src 'self' blob:",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  compress: true,
  poweredByHeader: false,
  images: {
    dangerouslyAllowLocalIP: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000, // 30 days
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "streetviewpixels-pa.googleapis.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async headers() {
    return [
      {
        // Apply full security headers including CSP to all customer-facing routes
        source: "/((?!studio).*)",
        headers: securityHeaders,
      },
      {
        // Exclude /studio from CSP so Sanity Studio can freely communicate with its dynamic APIs, workers, and package registries
        source: "/studio/:path*",
        headers: studioSecurityHeaders,
      },
      {
        source: "/studio",
        headers: studioSecurityHeaders,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);

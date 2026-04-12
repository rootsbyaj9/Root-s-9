import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import MobileCTABar from "@/components/layout/MobileCTABar";
import { client } from "@/sanity/client";
import { getSiteSettingsQuery } from "@/sanity/lib/queries";
import Script from "next/script";

/**
 * Fonts are self-hosted via next/font (no Google CDN call at runtime).
 * Each font injects a CSS custom property onto the <html> element:
 *   --font-playfair and --font-dm-sans
 *
 * In globals.css @theme:
 *   --font-serif: var(--font-playfair)  → font-serif utility class
 *   --font-sans:  var(--font-dm-sans)   → font-sans utility class
 *
 * This chain resolves correctly at render time.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://root-s-9.vercel.app";

export const metadata = {
  title: "Root's The Family Salon | Premium Salon in Hyderabad",
  description:
    "Root's Family Salon — premium hair, skin, bridal, and tattoo services in Hyderabad. Real transformations. Expert stylists. Book via WhatsApp.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    siteName: "Root's The Family Salon",
    locale: "en_IN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

// ── JSON-LD: Two HairSalon branches ───────────────────────────────────────────
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "Root's The Family Salon - Uppal",
    "image": `${BASE_URL}/logo-nobg1.svg`,
    "telephone": "+919700744357",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "#10-25/7, Taj Mahal Colony, Peerzadiguda Road, opp. Global Indian International School",
      "addressLocality": "Uppal",
      "addressRegion": "Telangana",
      "postalCode": "500039",
      "addressCountry": "IN",
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      "opens": "10:00",
      "closes": "21:00",
    },
    "priceRange": "₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1600",
    },
    "url": `${BASE_URL}/locations`,
  },
  {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "Root's The Family Salon - Tarnaka",
    "image": `${BASE_URL}/logo-nobg1.svg`,
    "telephone": "+919700744357",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "#12-5-16/4, Vijayapuri Colony, opp. St Ann's School, Chenna Reddy Lane, Tarnaka South Lallaguda",
      "addressLocality": "Secunderabad",
      "addressRegion": "Telangana",
      "postalCode": "500017",
      "addressCountry": "IN",
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      "opens": "10:00",
      "closes": "21:00",
    },
    "priceRange": "₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "275",
    },
    "url": `${BASE_URL}/locations`,
  },
];

export const revalidate = 60;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await client?.fetch(getSiteSettingsQuery).catch(() => null) ?? null;

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        {/* ── JSON-LD Structured Data: Local Business (both branches) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* ── Google Analytics 4 ── */}
        {/* Set NEXT_PUBLIC_GA_ID in Vercel to activate tracking */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        
        <SmoothScroll>
          {/* ── Fixed header shell (OfferStrip + Navbar) ── */}
          <Header settings={settings} />

          {/* ── Page content ── */}
          <main className="pb-16 md:pb-0">{children}</main>

          {/* ── Global footer ── */}
          <Footer settings={settings} />

          {/* ── Persistent sticky WhatsApp button ── */}
          <WhatsAppButton settings={settings} />

          {/* ── Mobile-only sticky booking bar ── */}
          <MobileCTABar settings={settings} />
        </SmoothScroll>
      </body>
    </html>
  );
}

import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import MobileCTABar from "@/components/layout/MobileCTABar";
import RouteScrollReset from "@/components/layout/RouteScrollReset";
import BookingModal from "@/components/layout/BookingModal";
import SiteChrome from "@/components/layout/SiteChrome";
import Script from "next/script";
import { client } from "@/sanity/client";
import { getSiteSettingsQuery, getLocationsQuery } from "@/sanity/lib/queries";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-outfit",
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
  const [settings, locations] = await Promise.all([
    client?.fetch(getSiteSettingsQuery).catch(() => null),
    client?.fetch(getLocationsQuery).catch(() => null)
  ]);
  
  const branches = (locations || []).length > 0 
    ? locations.map((l: any) => l.shortName).filter(Boolean) 
    : ["Uppal", "Tarnaka"];

  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <head>
        {/* ── Preconnect to external origins ── */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
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
          {/* ── Page content ── */}
          <main>{children}</main>

          {/* ── Site chrome — hidden on /studio ── */}
          <SiteChrome>
            <RouteScrollReset />
            {/* ── Fixed header shell (OfferStrip + Navbar) ── */}
            <Header settings={settings} />

            {/* ── Global footer ── */}
            <Footer settings={settings} />

            {/* ── Persistent sticky WhatsApp button ── */}
            <WhatsAppButton settings={settings} />

            {/* ── Mobile-only sticky booking bar ── */}
            <MobileCTABar settings={settings} />

            {/* ── Booking Modal (global, triggered via CustomEvent) ── */}
            <BookingModal branches={branches} />
          </SiteChrome>
        </SmoothScroll>
      </body>
    </html>
  );
}

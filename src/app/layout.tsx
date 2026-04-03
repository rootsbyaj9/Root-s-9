import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

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

export const metadata = {
  title: "Root's The Family Salon | Premium Salon in Hyderabad",
  description:
    "Root's Family Salon — premium hair, skin, bridal, and tattoo services in Hyderabad. Real transformations. Expert stylists. Book via WhatsApp.",
  metadataBase: new URL("https://rootssalon.in"),
  openGraph: {
    title: "Root's The Family Salon",
    description: "Premium hair, skin, bridal, and tattoo services in Hyderabad.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <SmoothScroll>
          {/* ── Fixed header shell (OfferStrip + Navbar) ── */}
          <Header />

          {/* ── Page content ── */}
          <main>{children}</main>

          {/* ── Global footer ── */}
          <Footer />

          {/* ── Persistent sticky WhatsApp button ── */}
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}

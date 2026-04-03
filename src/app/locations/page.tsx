/**
 * locations/page.tsx — Locations Page
 *
 * Section order (per implementation plan §Phase 5):
 *   1. Hero header — "Find Your Nearest Root's"
 *   2. Three branch cards — address, hours, map link, WhatsApp CTA
 *   3. NEW branch badge on branch #3
 *   4. Embedded map section (iframe or Google Maps link CTA)
 *   5. CTASection
 *
 * Branch data pulled from CLAUDE.md:
 *  - Kondapur: https://maps.app.goo.gl/KhgoKHXQ1poNibB27
 *  - Manikonda: https://maps.app.goo.gl/DVKd2j2KB39Ubmat6
 *  - New Branch (opening soon — address TBC by client)
 */

import type { Metadata } from 'next';
import LocationsClient from '@/components/sections/locations/LocationsClient';

export const metadata: Metadata = {
  title: "Locations | Root's The Family Salon Hyderabad",
  description:
    "Find Root's The Family Salon near you. Visit our premium branches across Hyderabad.",
  openGraph: {
    title: "Our Locations | Root's The Family Salon",
    description: "Visit our premium branches across Hyderabad.",
    type: 'website',
  },
};

export default function LocationsPage() {
  return <LocationsClient />;
}

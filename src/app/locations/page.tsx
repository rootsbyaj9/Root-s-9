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
  title: "Salon Near Me in Uppal & Tarnaka Hyderabad | Root's",
  description:
    "Find Root's Family Salon near you. Two premium branches in Hyderabad — Uppal (Peerzadiguda Road) and Tarnaka (South Lallaguda). Open Mon–Sun 10AM–9PM.",
  openGraph: {
    title: "Salon Near Me in Uppal & Tarnaka Hyderabad | Root's",
    description:
      "Two premium branches in Hyderabad — Uppal and Tarnaka. Open Mon–Sun 10AM–9PM.",
    type: 'website',
  },
};

export const revalidate = 60;

export default async function LocationsPage() {
  const locations: any[] = []; // Sanity fetching disabled — will be wired at final delivery
  return <LocationsClient locationsData={locations} />;
}

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
 * Branch data:
 *  - Uppal: https://maps.app.goo.gl/ocq8uts9jYaCp3bu8
 *  - Tarnaka: https://maps.app.goo.gl/HtxnUPQ9b9a4f5Qv7
 *  - Brahmanpally: Hyderabad
 */

import type { Metadata } from 'next';
import LocationsClient from '@/components/sections/locations/LocationsClient';
import { client } from '@/sanity/client';
import { getLocationsQuery } from '@/sanity/lib/queries';

export const metadata: Metadata = {
  title: "Salon Near Me in Uppal, Tarnaka & Brahmanpally Hyderabad | Root's",
  description:
    "Find Root's Family Salon near you. Three premium branches in Hyderabad — Uppal (Peerzadiguda Road), Tarnaka (South Lallaguda), and Brahmanpally. Open Mon–Sun 10AM–9PM.",
  openGraph: {
    title: "Salon Near Me in Uppal, Tarnaka & Brahmanpally Hyderabad | Root's",
    description:
      "Three premium branches in Hyderabad — Uppal, Tarnaka, and Brahmanpally. Open Mon–Sun 10AM–9PM.",
    type: 'website',
  },
};

export const revalidate = 60;

export default async function LocationsPage() {
  const locations = await client?.fetch(getLocationsQuery).catch(() => null) ?? [];
  return <LocationsClient locationsData={locations} />;
}

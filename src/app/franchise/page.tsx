/**
 * franchise/page.tsx — Franchise Enquiry Page (Server Wrapper)
 */

import type { Metadata } from 'next';
import FranchiseClient from '@/components/sections/franchise/FranchiseClient';

export const metadata: Metadata = {
  title: "Franchise Opportunity | Root's The Family Salon Hyderabad",
  description:
    "Own a Root's The Family Salon franchise in Hyderabad or beyond. Low investment, proven model, full training & support. Enquire today.",
  openGraph: {
    title: "Franchise With Root's | The Family Salon",
    description: "Own a Root's Salon. Proven model, full training, exclusive territory.",
    type: 'website',
  },
};

export default function FranchisePage() {
  return <FranchiseClient />;
}

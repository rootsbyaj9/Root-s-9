/**
 * franchise/page.tsx — Franchise Enquiry Page (Server Wrapper)
 */

import type { Metadata } from 'next';
import FranchiseClient from '@/components/sections/franchise/FranchiseClient';

export const metadata: Metadata = {
  title: "Salon Franchise Opportunity Hyderabad | Root's The Family Salon",
  description:
    "Own a Root's franchise. Investment ₹15L–₹30L. 12–18 month break-even. Full training and territory protection. Enquire via WhatsApp.",
  openGraph: {
    title: "Salon Franchise Opportunity Hyderabad | Root's",
    description:
      "Own a Root's franchise. Investment ₹15L–₹30L. Full training and territory protection.",
    type: 'website',
  },
};

export default function FranchisePage() {
  return <FranchiseClient />;
}

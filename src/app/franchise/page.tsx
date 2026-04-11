import FranchiseClient from "@/components/sections/franchise/FranchiseClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Franchise Opportunity | Root's Family Salon",
  description:
    "Own a Root's franchise — invest in Hyderabad's most trusted family salon. ₹15L–₹30L investment, 12–18 month break-even, pan-India expansion.",
};

export const revalidate = 60;

export default function FranchisePage() {
  return (
    <main className="min-h-screen">
      <FranchiseClient />
    </main>
  );
}

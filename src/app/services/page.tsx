import type { Metadata } from "next";
import ServicesHero from "@/components/sections/services/ServicesHero";
import { Suspense } from "react";
import ServicesContent from "@/components/sections/services/ServicesContent";
import ServicesCTA from "@/components/sections/services/ServicesCTA";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "Services Menu | Root's The Family Salon Hyderabad",
  description:
    "Curated treatments, expert artistry, and real results — from a quick blowdry to a full bridal transformation at Root's Family Salon.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-[#FEFCF8]">Loading...</div>}>
        <ServicesContent />
      </Suspense>
      <ServicesCTA />
      <ScrollToTop />
    </>
  );
}

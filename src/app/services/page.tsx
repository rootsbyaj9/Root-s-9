import { Suspense } from "react";
import type { Metadata } from "next";
import ServicesHero from "@/components/sections/services/ServicesHero";
import ServicesContent from "@/components/sections/services/ServicesContent";
import ServicesCTA from "@/components/sections/services/ServicesCTA";
import ScrollToTop from "@/components/ui/ScrollToTop";
export const metadata: Metadata = {
  title: "Hair, Skin & Bridal Services in Hyderabad | Root's Salon",
  description:
    "Explore Root's complete service menu — haircuts from ₹200, facials from ₹500, bridal packages from ₹7000. Women's and men's services at 2 branches in Hyderabad.",
  openGraph: {
    title: "Hair, Skin & Bridal Services in Hyderabad | Root's Salon",
    description:
      "Full service menu — haircuts from ₹200, facials from ₹500, bridal packages from ₹7000. Two branches in Hyderabad.",
    type: "website",
  },
};
import { client } from "@/sanity/client";
import { getServiceCategoriesQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

export default async function ServicesPage() {
  const rawCategories = await client?.fetch(getServiceCategoriesQuery).catch(() => []) ?? [];

  // Resolve raw Sanity image objects → imageUrl strings server-side
  // so client component ServicesContent receives a plain string it can render directly.
  const categories = rawCategories.map((cat: any) => ({
    ...cat,
    imageUrl: cat.image ? urlForImage(cat.image).width(800).url() : undefined,
  }));

  return (
    <>
      {/* Desktop: full hero. Mobile: hidden — tabs show first instead */}
      <div className="hidden md:block">
        <ServicesHero />
      </div>

      {/* Mobile-only compact header — gives context without burying the menu */}
      <div className="md:hidden bg-parchment pt-[100px] pb-6 px-6 border-b border-obsidian/10">
        <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-roots-orange block mb-2">
          MENU
        </span>
        <p className="font-serif text-4xl text-obsidian" role="heading" aria-level={2}>
          Our Services<span className="italic">.</span>
        </p>
      </div>

      <Suspense fallback={<div className="min-h-screen bg-parchment flex items-center justify-center animate-pulse"><span className="text-sm uppercase tracking-widest text-roots-orange">Loading Menu...</span></div>}>
        <ServicesContent cmsCategories={categories} />
      </Suspense>
      <ServicesCTA />
      <ScrollToTop />
    </>
  );
}

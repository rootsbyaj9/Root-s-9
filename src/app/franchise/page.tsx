import React from "react";
import { client } from "@/sanity/client";
import { getFranchisePageQuery } from "@/sanity/lib/queries";
import CTASection from "@/components/sections/shared/CTASection";

export const revalidate = 60; // Revalidate every minute

export default async function FranchisePage() {
  const data = await client.fetch(getFranchisePageQuery) || {};

  return (
    <main className="min-h-screen bg-parchment pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <span className="eyebrow block mb-4">OWN A SALON</span>
          <h1 className="font-serif text-5xl md:text-7xl text-obsidian mb-6">
            {data.headline || "Partner with Root's"}
          </h1>
          <p className="font-sans text-warm-gray text-lg max-w-2xl mx-auto">
            {data.subheadline || "Bring Hyderabad's most trusted premium family salon to your neighbourhood."}
          </p>
        </div>

        {data.heroImageUrl && (
          <div className="w-full h-[400px] rounded-2xl overflow-hidden mb-16 shadow-lg">
            <img src={data.heroImageUrl} alt="Franchise Hero" className="w-full h-full object-cover" />
          </div>
        )}

        {data.investmentMin && data.investmentMax && (
          <div className="bg-obsidian text-parchment p-8 rounded-2xl text-center mb-16">
            <h3 className="font-serif text-2xl mb-2">Investment Profile</h3>
            <p className="font-sans text-lg">{data.investmentMin} - {data.investmentMax}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {data.benefits?.map((benefit: any, idx: number) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-obsidian/5 flex gap-6 items-start">
              {benefit.imageUrl && <img src={benefit.imageUrl} alt={benefit.title} className="w-16 h-16 rounded-lg object-cover" />}
              <div>
                <h4 className="font-serif text-xl text-obsidian mb-2">{benefit.title}</h4>
                <p className="font-sans text-warm-gray text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CTASection
        heading="Ready to Partner?"
        subtext="Contact our franchise team to start your journey."
        ctaLabel="Contact Us"
      />
    </main>
  );
}

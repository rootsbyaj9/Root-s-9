import React from "react";
import WomensHair from "./womens/WomensHair";
import WomensSkin from "./womens/WomensSkin";
import WomensThreading from "./womens/WomensThreading";

export default function WomensServices() {
  return (
    <section id="womens" className="py-section md:py-section-md bg-parchment">
      <div className="container mx-auto px-8 md:px-16 max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left">
          <span className="eyebrow">CURATED FOR HER</span>
          <h2 className="font-serif text-[48px] md:text-[56px] text-obsidian">Women&apos;s Menu.</h2>
          <p className="font-sans text-[16px] text-obsidian/60 max-w-[600px] mt-4 mx-auto md:mx-0">
            From essential grooming to complete transformations. Experience personalized care with 
            premium products and expert artistry.
          </p>

          {/* Sub-Navigation for Easy Jump */}
          <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
            <a href="#hair-women" className="inline-flex items-center justify-center font-sans text-[11px] uppercase tracking-[0.05em] px-4 py-2 border border-roots-orange/30 text-roots-orange bg-roots-orange/5 hover:bg-roots-orange hover:text-parchment rounded-md transition-colors">
              Hair
            </a>
            <a href="#skin-women" className="inline-flex items-center justify-center font-sans text-[11px] uppercase tracking-[0.05em] px-4 py-2 border border-roots-orange/30 text-roots-orange bg-roots-orange/5 hover:bg-roots-orange hover:text-parchment rounded-md transition-colors">
              Skin Rituals
            </a>
            <a href="#refinement-women" className="inline-flex items-center justify-center font-sans text-[11px] uppercase tracking-[0.05em] px-4 py-2 border border-roots-orange/30 text-roots-orange bg-roots-orange/5 hover:bg-roots-orange hover:text-parchment rounded-md transition-colors">
              Refinement
            </a>
          </div>
        </div>

        {/* Service Blocks */}
        <div className="flex flex-col gap-12">
          <WomensHair />
          <WomensSkin />
          <WomensThreading />
        </div>
      </div>
    </section>
  );
}

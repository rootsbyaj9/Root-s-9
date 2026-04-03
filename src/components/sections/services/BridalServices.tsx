import React from "react";
import WomensBridal from "./womens/WomensBridal";

export default function BridalServices() {
  return (
    <section id="bridal" className="py-section md:py-section-md bg-linen">
      <div className="container mx-auto px-8 md:px-16 max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left">
          <span className="eyebrow">THE BIG DAY</span>
          <h2 className="font-serif text-[48px] md:text-[56px] text-obsidian">Bridal Studio.</h2>
          <p className="font-sans text-[16px] text-obsidian/60 max-w-[600px] mt-4 mx-auto md:mx-0">
            Complete bridal transformations tailored for your special day. From HD makeup to elegant
            hairstyles and nail art.
          </p>
        </div>

        {/* Service Blocks */}
        <div className="flex flex-col gap-12">
          <WomensBridal isStandalone={true} />
        </div>
      </div>
    </section>
  );
}

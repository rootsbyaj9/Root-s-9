import React from "react";

export default function TattooServices() {
  return (
    <section id="tattoo" className="py-section md:py-section-md bg-obsidian text-parchment">
      <div className="container mx-auto px-8 md:px-16 max-w-[1400px]">
        <div className="grid md:grid-cols-2 gap-[64px] items-start">
          
          {/* Left: Content & Services */}
          <div>
            <div className="mb-12">
              <span className="font-sans text-[40px] text-parchment/20 inline-block mr-4">01</span>
              <h2 className="font-serif text-[40px] md:text-[48px] text-parchment inline-block">Tattoo Artistry</h2>
              <div className="w-full h-px bg-parchment/10 mt-4"></div>
              <p className="font-sans text-[14px] text-parchment/60 mt-6 max-w-[480px]">
                Fine-line precision. Realism artistry. Permanent marks worth wearing.
              </p>
            </div>

            {/* Service List */}
            <div className="mb-12">
              <TattooRow name="Fine-Line Tattoo (Small)" price="₹500 onwards" />
              <TattooRow name="Fine-Line Tattoo (Large)" price="₹4000 onwards" />
              <TattooRow name="Realism Tattoo" price="₹3000 onwards" />
              <TattooRow name="Cover-Up Tattoo" price="₹5000 onwards" />
              <TattooRow name="Touch-Up Session" price="₹800" />
              <TattooRow name="Custom Design Consultation" price="Free" />
              <TattooRow name="Ear Piercing" price="₹500" />
            </div>

            {/* Legal / Note */}
            <p className="font-sans text-[13px] text-parchment/50 mb-10 max-w-[400px] italic">
              Price varies by size, complexity, and placement. Book a free consultation to get your exact quote.
            </p>

            {/* CTA Button */}
            <div>
              <a
                href="https://wa.me/919700744357"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-roots-orange text-roots-orange font-sans text-[11px] uppercase tracking-[0.08em] px-[32px] py-[14px] rounded-md transition-colors hover:bg-roots-orange hover:text-parchment"
              >
                BOOK FREE CONSULTATION
              </a>
            </div>
          </div>

          {/* Right: Image Placeholder */}
          <div className="aspect-[4/3] w-full bg-[#1A1008] border border-parchment/10 flex items-center justify-center rounded-md">
            <span className="font-sans text-[14px] uppercase tracking-widest text-parchment/40">
              TATTOO ARTISTRY
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

function TattooRow({ name, price }: { name: string; price: string }) {
  return (
    <div className="flex justify-between items-end border-b border-parchment/10 pb-3 mb-4">
      <span className="font-sans text-[16px] text-parchment pr-4">{name}</span>
      <span className="font-sans text-[13px] font-medium text-roots-orange whitespace-nowrap">{price}</span>
    </div>
  );
}

import React from "react";

export default function ServicesCTA() {
  return (
    <section className="bg-obsidian py-24 md:py-32 px-8">
      <div className="container mx-auto max-w-[1400px] text-center flex flex-col items-center">
        <h2 className="font-serif text-[40px] md:text-[48px] text-parchment">
          Ready to book your look?
        </h2>
        
        <p className="font-sans text-[16px] text-parchment/70 max-w-[480px] mt-6">
          WhatsApp us to check availability, ask questions, or lock in your appointment. 
          No forms. No waiting.
        </p>

        <a
          href="https://wa.me/919700744357"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-roots-orange text-parchment font-sans text-[12px] uppercase tracking-[0.08em] px-[40px] py-[16px] rounded-md transition-colors hover:bg-[#C9621E] mt-10"
        >
          BOOK VIA WHATSAPP
        </a>
      </div>
    </section>
  );
}

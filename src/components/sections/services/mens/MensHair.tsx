"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const listItemVariant: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const imageCurtainVariant: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: { clipPath: "inset(0% 0 0 0)", transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] } }
};

export default function MensHair() {
  return (
    <motion.div id="hair-men" className="grid md:grid-cols-2 gap-[64px] items-start mb-32"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Left: Service List */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeUpVariant} className="mb-8">
          <span className="font-sans text-[40px] text-obsidian/20 inline-block mr-4">01</span>
          <h3 className="font-serif text-[40px] text-obsidian inline-block">Men&apos;s Grooming</h3>
          <div className="w-full h-px bg-[#E8D4BE] mt-4"></div>
        </motion.div>

        {/* Sub-category: HAIR CUTS */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mb-3">HAIR CUTS</motion.h4>
          <ServiceRow name="Haircut" price="₹200" />
          <ServiceRow name="Advanced Haircut" price="₹250" />
          <ServiceRow name="Clean Shave" price="₹100" />
          <ServiceRow name="Beard Styling" price="₹100" />
          <ServiceRow name="Hair Wash Styling" price="₹150" />
          <ServiceRow name="Kid Little Champs" price="₹200" />
        </div>

        {/* Sub-category: OIL HEAD MASSAGE */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">OIL HEAD MASSAGE</motion.h4>
          <ServiceRow name="Head Massage (Parachute)" price="₹150" />
          <ServiceRow name="Herbal Oil Massage" price="₹150" />
          <ServiceRow name="Olive & Almond Oil" price="₹250" />
        </div>

        {/* Sub-category: HAIR COLOURING */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">HAIR COLOURING</motion.h4>
          <ServiceRow name="Global Hair Colour" price="₹500" />
          <ServiceRow name="Global Hair Colour (Ammonia Free)" price="₹500" />
          <ServiceRow name="Fashion Highlights Per Streak" price="₹150" />
          <ServiceRow name="Fashion Global Highlights" price="₹600" />
          <ServiceRow name="Beard Colour" price="₹300" />
        </div>

        {/* Sub-category: HAIR SPA */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">HAIR SPA</motion.h4>
          <ServiceRow name="Classic Hair Spa" price="₹800" />
          <ServiceRow name="Dry & Frizzy Control Spa" price="₹1200" />
          <ServiceRow name="Keratine Hair Spa" price="₹500" />
          <ServiceRow name="Anti Hair Fall Treatment" price="₹1500" />
          <ServiceRow name="Anti Dandruff Treatment" price="₹1500" />
        </div>

        {/* Sub-category: HAIR STRAIGHTENING */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">HAIR STRAIGHTENING</motion.h4>
          <ServiceRow name="Hair Smoothening" price="₹1500 onwards" />
          <ServiceRow name="Hair Keratin" price="₹3000 onwards" />
        </div>

        {/* CTA Button */}
        <motion.div variants={fadeUpVariant} className="mt-8">
          <a
            href="https://wa.me/919700744357"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-roots-orange text-parchment font-sans text-[11px] uppercase tracking-[0.08em] px-[28px] py-[14px] rounded-md transition-colors hover:bg-[#C9621E]"
          >
            BOOK THIS SERVICE
          </a>
        </motion.div>
      </motion.div>

      {/* Image Placeholders */}
      <div className="flex flex-col gap-6 h-full w-full mb-8 md:mb-0">
        {[...Array(2)].map((_, i) => (
          <motion.div 
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageCurtainVariant}
            className="w-full h-[400px] sm:h-[500px] md:h-auto md:aspect-[4/5] bg-[#E8D4BE] flex flex-col items-center justify-center rounded-md overflow-hidden group"
          >
            <span className="font-sans text-[12px] uppercase tracking-widest text-[#1A1008]/40 mb-2">
              IMAGE PLACEHOLDER
            </span>
            <span className="font-sans text-[14px] uppercase tracking-widest text-[#1A1008]/80 group-hover:scale-105 transition-transform duration-700 ease-out">
              MEN'S HAIR
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ServiceRow({ name, price }: { name: string; price: string }) {
  return (
    <motion.div 
      variants={listItemVariant}
      className="group flex justify-between items-end border-b border-obsidian/10 hover:border-obsidian/30 pb-3 mb-3 transition-colors duration-300"
    >
      <span className="font-serif text-[18px] text-obsidian pr-4">{name}</span>
      <span className="font-sans text-[13px] font-medium text-obsidian group-hover:text-roots-orange whitespace-nowrap transition-colors duration-300">{price}</span>
    </motion.div>
  );
}

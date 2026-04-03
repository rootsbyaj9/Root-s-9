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
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as any } }
};

const imageCurtainVariant: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] } }
};


export default function WomensHair() {
  return (
    <motion.div id="hair-women" className="grid md:grid-cols-2 gap-[64px] items-start mb-32"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Image Placeholders */}
      <div className="flex flex-col gap-6 h-full w-full mb-8 md:mb-0">
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageCurtainVariant}
            className="w-full h-[400px] sm:h-[500px] md:h-auto md:aspect-[4/5] bg-[#F5EDE0] flex flex-col items-center justify-center rounded-md overflow-hidden group"
          >
            <span className="font-sans text-[12px] uppercase tracking-widest text-[#1A1008]/40 mb-2">
              IMAGE PLACEHOLDER
            </span>
            <span className="font-sans text-[14px] uppercase tracking-widest text-[#1A1008]/80 group-hover:scale-105 transition-transform duration-700 ease-out">
              HAIR SERVICES
            </span>
          </motion.div>
        ))}
      </div>

      {/* Right: Service List */}
      <div>
        <motion.div variants={fadeUpVariant} className="mb-8">
          <span className="font-sans text-[40px] text-obsidian/20 inline-block mr-4">01</span>
          <h3 className="font-serif text-[40px] text-obsidian inline-block">Hair Masterclass</h3>
          <div className="w-full h-px bg-[#E8D4BE] mt-4"></div>
        </motion.div>

        {/* Sub-category: HAIR CUT */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mb-3">HAIR CUT</motion.h4>
          
          <ServiceRow name="U Cut" price="₹400" />
          <ServiceRow name="V Cut" price="₹400" />
          <ServiceRow name="Straight Cut" price="₹400" />
          <ServiceRow name="Advance Hair Cut" price="₹800" />
          <ServiceRow name="Kid Cut" price="₹400" />
          <ServiceRow name="Head Massage" price="₹300" />
          <ServiceRow name="Shampoo + Conditioning + Blast Dry" price="₹350" />
          <ServiceRow name="Blow Dry" price="₹450" />
          <ServiceRow name="Iron Curls" price="₹650 onwards" />
          <ServiceRow name="Tong Curls" price="₹1000 onwards" />
        </div>

        {/* Sub-category: HAIR COLOURING */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">HAIR COLOURING</motion.h4>
          <ServiceRow name="Root Touch Up (Ammonia Free)" price="₹1200" />
          <ServiceRow name="Global Colour (Ammonia Free)" price="₹2200 onwards" />
        </div>

        {/* Sub-category: HIGHLIGHTS */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">HIGHLIGHTS</motion.h4>
          <ServiceRow name="Global Highlights" price="S: ₹2000 / M: ₹2500 / L: ₹3500" />
          <ServiceRow name="Crown Highlights" price="₹1500 onwards" />
          <ServiceRow name="Funk's (1 Foil)" price="₹350 onwards" />
        </div>

        {/* Sub-category: HAIR SMOOTHENING */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">HAIR SMOOTHENING</motion.h4>
          <ServiceRow name="Smoothening S/M/L" price="₹4500/5000/6500 onwards" />
          <ServiceRow name="Rebonding S/M/L" price="₹4500/5000/6500 onwards" />
          <ServiceRow name="Keratin S/M/L" price="₹5500/6500/8000 onwards" />
        </div>

        {/* Sub-category: HAIR SPA */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">HAIR SPA</motion.h4>
          <ServiceRow name="Dry Hair Spa" price="₹1000 onwards" />
          <ServiceRow name="Smooth Straight Hair Spa" price="₹1400 onwards" />
          <ServiceRow name="Hair Fall Control Spa" price="₹1500 onwards" />
          <ServiceRow name="Frizz Control" price="₹1200 onwards" />
          <ServiceRow name="Repair & Rejuvenate" price="₹1500 onwards" />
        </div>

        {/* Sub-category: HAIR TREATMENT */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">HAIR TREATMENT</motion.h4>
          <ServiceRow name="Anti Hair Fall Treatment" price="₹1400 onwards" />
          <ServiceRow name="Anti-Dandruff Treatment" price="₹1500 onwards" />
          <ServiceRow name="Keratin Spa Treatment" price="₹2000 onwards" />
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
      <span className="font-serif text-[18px] text-obsidian group-hover:text-roots-orange pr-4 transition-colors duration-300">{name}</span>
      <span className="font-sans text-[13px] font-medium text-obsidian group-hover:text-roots-orange whitespace-nowrap transition-colors duration-300">{price}</span>
    </motion.div>
  );
}

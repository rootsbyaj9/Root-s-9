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


export default function WomensSkin() {
  return (
    <motion.div id="skin-women" className="grid md:grid-cols-2 gap-[64px] items-start mb-32"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Left: Service List (Reversed layout) */}
      <div className="order-2 md:order-1">
        <motion.div variants={fadeUpVariant} className="mb-8">
          <span className="font-sans text-[40px] text-obsidian/20 inline-block mr-4">02</span>
          <h3 className="font-serif text-[40px] text-obsidian inline-block">Skin Rituals</h3>
          <div className="w-full h-px bg-[#E8D4BE] mt-4"></div>
        </motion.div>

        {/* Sub-category: WAXING */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-3">
            <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange">WAXING</motion.h4>
            <span className="font-sans text-[11px] font-medium text-obsidian/60 hidden sm:block">Normal / Chocolate / Rica</span>
          </div>
          
          <ServiceRow name="Full Arms" price="₹250 / ₹400 / ₹650" />
          <ServiceRow name="Full Legs" price="₹600 / ₹700 / ₹1400" />
          <ServiceRow name="Half Legs" price="₹300 / ₹350 / ₹700" />
          <ServiceRow name="Under Arms" price="₹100 / ₹150 / ₹250" />
          <ServiceRow name="Full Face" price="₹100 / ₹200 / N/A" />
          <ServiceRow name="Upper Lip" price="₹50 / ₹70 / N/A" />
          <ServiceRow name="Chin" price="₹40 / ₹50 / N/A" />
          <ServiceRow name="Full Body Waxing" price="₹1000 / ₹1500 / ₹2200 onwards" />
        </div>

        {/* Sub-category: D-TAN */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">D-TAN</motion.h4>
          <ServiceRow name="Face & Neck" price="₹600" />
          <ServiceRow name="Face & Neck Blouse Line" price="₹800" />
          <ServiceRow name="Full Arms" price="₹800" />
          <ServiceRow name="Full Legs" price="₹1000" />
          <ServiceRow name="Half Arms" price="₹400" />
          <ServiceRow name="Half Legs" price="₹500" />
          <ServiceRow name="Full Back/Front" price="₹1000" />
        </div>

        {/* Sub-category: FACIALS */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">FACIALS</motion.h4>
          <ServiceRow name="Clean Up" price="₹500" />
          <ServiceRow name="Fruit Facial" price="₹800" />
          <ServiceRow name="Pearl Facial" price="₹1400" />
          <ServiceRow name="Gold Facial" price="₹1800" />
          <ServiceRow name="Silver Facial" price="₹1400" />
          <ServiceRow name="Diamond Facial" price="₹1500" />
          <ServiceRow name="Skin Whitening Facial" price="₹2200" />
          <ServiceRow name="Skin Tightening" price="₹1800" />
          <ServiceRow name="Shahnaz Diamond" price="₹2200" />
          <ServiceRow name="Shahnaz Gold" price="₹2400" />
        </div>

        {/* Sub-category: CHERYL'S COSMECEUTICALS */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-3 mt-8">
            <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange">CHERYL'S COSMECEUTICALS</motion.h4>
            <span className="font-sans text-[11px] italic text-obsidian/60 hidden sm:block">Skincare that works</span>
          </div>
          <ServiceRow name="Glovite Facial" price="₹2800" />
          <ServiceRow name="Oxy Blast Facial" price="₹2100" />
          <ServiceRow name="Tan Clear Facial" price="₹2300" />
          <ServiceRow name="Sensi Glow Facial" price="₹2800" />
          <ServiceRow name="Clari Glow Facial" price="₹3000" />
          <ServiceRow name="O2C2 Facial" price="₹4000" />
        </div>

        {/* Sub-category: O3+ FACIALS */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">O3+ FACIALS</motion.h4>
          <ServiceRow name="D Tan Clean Up" price="₹1000" />
          <ServiceRow name="Pore & Purifying Cleanup" price="₹1100" />
          <ServiceRow name="Whitening & Hydra Facial" price="₹3000" />
          <ServiceRow name="Purifying & Detox Facial" price="₹2200" />
          <ServiceRow name="Bridal Facial" price="₹4000" />
          <ServiceRow name="Protein Peel" price="₹1500" />
          <ServiceRow name="Acne & Blackhead Control Peel" price="₹1800" />
          <ServiceRow name="Lightning Peel" price="₹1700" />
          <ServiceRow name="Shine & Luminous Glow Peel" price="₹1800" />
          <ServiceRow name="Glow Active Procedure Peel" price="₹2200" />
          <ServiceRow name="O3+ Luxury Pedicure" price="₹1500" />
        </div>
        
        {/* Sub-category: PEDICURE / MANICURE */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">PEDICURE / MANICURE</motion.h4>
          <ServiceRow name="Basic Pedicure" price="₹800" />
          <ServiceRow name="Basic Manicure" price="₹500" />
          <ServiceRow name="Mini Pedicure" price="₹1300" />
          <ServiceRow name="Mini Manicure" price="₹1000" />
          <ServiceRow name="Crystal Spa Pedicure" price="₹1300" />
          <ServiceRow name="Crystal Spa Manicure" price="₹950" />
        </div>

        {/* Sub-category: BODY RELAXING MASSAGE */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">BODY RELAXING MASSAGE</motion.h4>
          <ServiceRow name="Full Body Scrub" price="₹1200" />
          <ServiceRow name="Full Body Coco Butter Massage" price="₹1500" />
          <ServiceRow name="Full Body D-Tan Removal" price="₹3500" />
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

      {/* Image Placeholders */}
      <div className="order-1 md:order-2 mt-8 md:mt-0 flex flex-col gap-6 h-full w-full mb-8 md:mb-0">
        {[...Array(4)].map((_, i) => (
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
              SKIN TREATMENTS
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
      <span className="font-serif text-[18px] text-obsidian group-hover:text-roots-orange pr-4 transition-colors duration-300">{name}</span>
      <span className="font-sans text-[13px] font-medium text-obsidian group-hover:text-roots-orange whitespace-nowrap transition-colors duration-300">{price}</span>
    </motion.div>
  );
}

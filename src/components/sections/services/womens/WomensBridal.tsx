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


export default function WomensBridal({ isStandalone = false }: { isStandalone?: boolean }) {
  return (
    <motion.div className="grid md:grid-cols-2 gap-[64px] items-start"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Left: Service List (Reversed layout) */}
      <div className="order-2 md:order-1">
        {!isStandalone && (
          <motion.div variants={fadeUpVariant} className="mb-8">
          <span className="font-sans text-[40px] text-obsidian/20 inline-block mr-4">04</span>
            <h3 className="font-serif text-[40px] text-obsidian inline-block">Bridal Studio</h3>
            <div className="w-full h-px bg-[#E8D4BE] mt-4"></div>
          </motion.div>
        )}

        {/* Sub-category: MAKEUP - HD */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mb-3">MAKEUP — HD</motion.h4>
          <ServiceRow name="Party Makeup" price="₹1500" />
          <ServiceRow name="Saree Draping" price="₹500 / ₹400" />
          <ServiceRow name="Hair Style" price="₹600 / ₹1000 / ₹2000" />
          <ServiceRow name="Reception Bridal Makeup" price="₹15,000" />
          <ServiceRow name="Wedding Bridal Makeup HD" price="₹15,000" />
          <ServiceRow name="Eng / Mehndi / Sangeet / Haldi" price="₹10,000" />
        </div>

        {/* Sub-category: MAKEUP - NON HD */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">MAKEUP — NON HD</motion.h4>
          <ServiceRow name="Reception Bridal Makeup" price="₹10,000" />
          <ServiceRow name="Wedding Bridal Makeup HD" price="₹10,000" />
          <ServiceRow name="Eng / Mehndi / Sangeet / Haldi" price="₹8,000" />
        </div>

        {/* Sub-category: MAKEUP - LIGHT */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">MAKEUP — LIGHT</motion.h4>
          <ServiceRow name="Baby Shower" price="₹4,000" />
          <ServiceRow name="Model Make-up" price="₹4,000" />
        </div>

        {/* Sub-category: NAIL ART */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">NAIL ART</motion.h4>
          <ServiceRow name="Gel Polish" price="₹850" />
          <ServiceRow name="Fake Nails + Gel Polish" price="₹1050" />
          <ServiceRow name="Nail Extensions / Acrylic Gel Polish" price="₹2500" />
          <ServiceRow name="Nail Polish Removal" price="₹250" />
        </div>

        {/* CTA Button */}
        <motion.div variants={fadeUpVariant} className="mt-8">
          <a
            href="https://wa.me/919700744357"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-roots-orange text-parchment font-sans text-[11px] uppercase tracking-[0.08em] px-[28px] py-[14px] rounded-md transition-colors hover:bg-[#C9621E]"
          >
            BOOK CONSULTATION
          </a>
        </motion.div>
      </div>

      {/* Image Placeholders */}
      <div className="order-1 md:order-2 mt-8 md:mt-0 flex flex-col gap-6 h-full w-full mb-8 md:mb-0">
        {[...Array(2)].map((_, i) => (
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
              BRIDAL MAKEOVER
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

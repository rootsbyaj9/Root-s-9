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


export default function MensSkin() {
  return (
    <motion.div id="skin-men" className="grid md:grid-cols-2 gap-[64px] items-start mb-32"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Image Placeholders */}
      <div className="order-2 md:order-1 mt-8 md:mt-0 flex flex-col gap-6 h-full w-full mb-8 md:mb-0">
        {[...Array(3)].map((_, i) => (
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
              MEN'S SKIN
            </span>
          </motion.div>
        ))}
      </div>

      {/* Right: Service List */}
      <div className="order-1 md:order-2">
        <motion.div variants={fadeUpVariant} className="mb-8">
          <span className="font-sans text-[40px] text-obsidian/20 inline-block mr-4">02</span>
          <h3 className="font-serif text-[40px] text-obsidian inline-block">Men&apos;s Skin</h3>
          <div className="w-full h-px bg-[#E8D4BE] mt-4"></div>
        </motion.div>

        {/* Sub-category: ADD ON MASK */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mb-3">ADD ON MASK</motion.h4>
          <ServiceRow name="Peel of Mask" price="₹600" />
          <ServiceRow name="Hydra of Rejuvenate Mask" price="₹5000" />
          <ServiceRow name="O3+ Rejuvenate Mask" price="₹2000" />
        </div>

        {/* Sub-category: PEDICURE */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">PEDICURE</motion.h4>
          <ServiceRow name="Pedicure" price="₹600" />
          <ServiceRow name="Spa Pedicure" price="₹1200" />
          <ServiceRow name="D.Tan Pedicure" price="₹1000" />
        </div>

        {/* Sub-category: MANICURE */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">MANICURE</motion.h4>
          <ServiceRow name="Manicure" price="₹600" />
          <ServiceRow name="Spa Manicure" price="₹1000" />
          <ServiceRow name="D.Tan Manicure" price="₹1250" />
          <ServiceRow name="Nail Cut & Filling" price="₹150" />
        </div>

        {/* Sub-category: D.TAN */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">D.TAN</motion.h4>
          <ServiceRow name="Face & Neck" price="₹450" />
          <ServiceRow name="Raaga & O3+" price="₹800" />
          <ServiceRow name="Full Hands" price="₹1500" />
          <ServiceRow name="Full Body" price="₹3000" />
          <ServiceRow name="Body Polishing" price="₹5000" />
        </div>

        {/* Sub-category: CLEAN UP */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">CLEAN UP</motion.h4>
          <ServiceRow name="Basic Cleanup" price="₹400" />
          <ServiceRow name="Lotus Cleanup" price="₹1000" />
          <ServiceRow name="O3+ Cleanup" price="₹1300" />
          <ServiceRow name="Raaga Cleanup" price="₹700" />
        </div>

        {/* Sub-category: FACIALS */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">FACIALS</motion.h4>
          <ServiceRow name="Fruit Facial" price="₹800" />
          <ServiceRow name="Pearl Facial" price="₹1500" />
          <ServiceRow name="Gold Facial" price="₹1800" />
          <ServiceRow name="Diamond Facial" price="₹1800" />
          <ServiceRow name="Skin Whitening" price="₹1700" />
          <ServiceRow name="Anti Ageing" price="₹1800" />
          <ServiceRow name="Cheryl's Oxy Blast" price="₹3000" />
          <ServiceRow name="Cheryl's D.Tan Facial" price="₹3000" />
          <ServiceRow name="O3+ Facial" price="₹3500" />
        </div>

        {/* Sub-category: MEN'S MAKEUP */}
        <div className="mb-8">
          <motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange mt-8 mb-3">MEN'S MAKEUP</motion.h4>
          <ServiceRow name="Party Makeup" price="₹3500" />
          <ServiceRow name="Groom Makeup" price="₹5000" />
          <ServiceRow name="Trial Makeup" price="₹2000" />
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

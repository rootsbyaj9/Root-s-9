"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const listItemVariant: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as any } },
};

/**
 * Legacy standalone ServiceRow — kept for any remaining static components.
 * New CMS-driven rendering uses the inline ServiceRow in ServicesContent.tsx.
 */
export default function ServiceRow({ name, price }: { name: string; price: string }) {
  return (
    <motion.div
      variants={listItemVariant}
      className="group flex justify-between items-end border-b border-obsidian/10 hover:border-obsidian/30 pb-3 mb-3 transition-colors duration-300"
    >
      <span className="font-sans text-[15px] text-obsidian group-hover:text-roots-orange pr-4 transition-colors duration-300">
        {name}
      </span>
      <span className="font-sans text-[13px] font-medium text-obsidian/70 group-hover:text-roots-orange whitespace-nowrap transition-colors duration-300">
        {price}
      </span>
    </motion.div>
  );
}

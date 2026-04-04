"use client";

import React, { useContext } from "react";
import { motion, Variants } from "framer-motion";
import { ServicesContext } from "./ServicesContent";

const listItemVariant: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as any } }
};

export default function ServiceRow({ name, price }: { name: string; price: string }) {
  const categories = useContext(ServicesContext);
  const allItems = categories?.flatMap((c: any) => c.items || []) || [];
  const match = allItems.find((item: any) => item?.title?.toLowerCase() === name.toLowerCase());
  
  const displayName = match?.title || name;
  const displayPrice = match?.price || price;

  return (
    <motion.div 
      variants={listItemVariant}
      className="group flex justify-between items-end border-b border-obsidian/10 hover:border-obsidian/30 pb-3 mb-3 transition-colors duration-300"
    >
      <span className="font-serif text-[18px] text-obsidian group-hover:text-roots-orange pr-4 transition-colors duration-300">{displayName}</span>
      <span className="font-sans text-[13px] font-medium text-obsidian group-hover:text-roots-orange whitespace-nowrap transition-colors duration-300">{displayPrice}</span>
    </motion.div>
  );
}

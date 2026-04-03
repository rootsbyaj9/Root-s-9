const fs = require('fs');

const variantsStr = `const staggerContainer: Variants = {
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
`;

const files = [
  'src/components/sections/services/mens/MensHair.tsx',
  'src/components/sections/services/mens/MensSkin.tsx',
  'src/components/sections/services/womens/WomensHair.tsx',
  'src/components/sections/services/womens/WomensSkin.tsx',
  'src/components/sections/services/womens/WomensThreading.tsx',
  'src/components/sections/services/womens/WomensBridal.tsx',
  'src/components/sections/services/tattoo/TattooServices.tsx'
];

files.forEach(f => {
  if(!fs.existsSync(f)) return;
  let text = fs.readFileSync(f, 'utf8');
  
  if(!text.includes('use client')) {
    text = text.replace(
      /import React(,\s*\{[^}]*\})? from "react";/, 
      `"use client";\n\nimport React$1 from "react";\nimport { motion, Variants } from "framer-motion";\n\n${variantsStr}`
    );
  }

  // Wrap category headings (01, etc)
  text = text.replace(
    /<div className="mb-8">\s*<span className="font-sans text-\[40px\] text-obsidian\/20/g,
    `<motion.div variants={fadeUpVariant} className="mb-8">\n          <span className="font-sans text-[40px] text-obsidian/20`
  );
  text = text.replace(
    /(<h3 [^>]+>.*?<\/h3>\s*<div className="w-full h-px bg-\[#(?:E8D4BE|332014)\] mt-4"><\/div>\s*)<\/div>/g,
    `$1</motion.div>`
  );

  // Replace sub-categories h4
  text = text.replace(
    /<h4 className="font-sans text-\[10px\] uppercase tracking-\[0\.1em\] text-roots-orange(.*?)>(.*?)<\/h4>/g,
    `<motion.h4 variants={listItemVariant} className="font-sans text-[10px] uppercase tracking-[0.1em] text-roots-orange$1">$2</motion.h4>`
  );

  // Replace CTA Button
  text = text.replace(
    /<div className="mt-8">\s*<a\s+href="https:\/\/wa.me\/919700744357"/g,
    `<motion.div variants={fadeUpVariant} className="mt-8">\n          <a\n            href="https://wa.me/919700744357"`
  );
  text = text.replace(
    /(BOOK (?:THIS SERVICE|CONSULTATION)\s*<\/a>\s*)<\/div>/g,
    `$1</motion.div>`
  );

  text = text.replace(
    /<div (id="[a-z-]+" )?className="grid md:grid-cols-2 gap-\[64px\] items-start([^>]*)">/,
    `<motion.div $1className="grid md:grid-cols-2 gap-[64px] items-start$2"\n      variants={staggerContainer}\n      initial="hidden"\n      whileInView="visible"\n      viewport={{ once: true, margin: "-100px" }}\n    >`
  );
  
  if (!text.includes('</motion.div>')) {
    const functionEndMatch = text.match(/}\s*\n*function ServiceRow/);
    if (functionEndMatch) {
      const fnIndex = functionEndMatch.index;
      const beforeFn = text.substring(0, fnIndex);
      const afterFn = text.substring(fnIndex);
      const lastDivIdx = beforeFn.lastIndexOf('</div>');
      text = beforeFn.substring(0, lastDivIdx) + '</motion.div>' + beforeFn.substring(lastDivIdx + 6) + afterFn;
    } else {
      const lastDivIdx = text.lastIndexOf('</div>');
      text = text.substring(0, lastDivIdx) + '</motion.div>' + text.substring(lastDivIdx + 6);
    }
  }

  // Update sticky image
  text = text.replace(
    /<div className="(order-[12] md:order-[12] )?sticky top-\[140px\]([^>]+bg-\[#(?:E8D4BE|F5EDE0|281A10)\][^>]+)">(\s*)<span className="font-sans text-\[14px\] uppercase tracking-widest text-\[#(?:1A1008|E8D4BE)\]\/60">([\s\S]*?)<\/span>\s*<\/div>/g,
    `<motion.div \n        initial="hidden"\n        whileInView="visible"\n        viewport={{ once: true, margin: "-100px" }}\n        variants={imageCurtainVariant}\n        className="$1sticky top-[140px]$2 overflow-hidden group"\n      >$3<span className="font-sans text-[14px] uppercase tracking-widest text-[#1A1008]/60 group-hover:scale-105 transition-transform duration-700 ease-out">$4</span>\n      </motion.div>`
  );

  // Update ServiceRow
  text = text.replace(
    /function ServiceRow\(\{ name, price \}: \{ name: string; price: string \}\) \{\s*return \(\s*<div className="flex justify-between items-end border-b border-obsidian\/10 pb-3 mb-3\">\s*<span className="font-serif text-\[18px\] text-obsidian pr-4\">\{name\}<\/span>\s*<span className="font-sans text-\[13px\] font-medium text-roots-orange whitespace-nowrap\">\{price\}<\/span>\s*<\/div>\s*\);\s*\}/g,
    `function ServiceRow({ name, price }: { name: string; price: string }) {\n  return (\n    <motion.div \n      variants={listItemVariant}\n      className="group flex justify-between items-end border-b border-obsidian/10 hover:border-obsidian/30 pb-3 mb-3 transition-colors duration-300"\n    >\n      <span className="font-serif text-[18px] text-obsidian group-hover:text-roots-orange pr-4 transition-colors duration-300">{name}</span>\n      <span className="font-sans text-[13px] font-medium text-obsidian group-hover:text-roots-orange whitespace-nowrap transition-colors duration-300">{price}</span>\n    </motion.div>\n  );\n}`
  );

  // Update ServiceRow for dark mode (TattooServices)
  text = text.replace(
    /function ServiceRow\(\{ name, price \}: \{ name: string; price: string \}\) \{\s*return \(\s*<div className=\"flex justify-between items-end border-b border-parchment\/10 pb-3 mb-3\">\s*<span className=\"font-serif text-\[18px\] text-parchment pr-4\">\{name\}<\/span>\s*<span className=\"font-sans text-\[13px\] font-medium text-roots-orange whitespace-nowrap\">\{price\}<\/span>\s*<\/div>\s*\);\s*\}/g,
    `function ServiceRow({ name, price }: { name: string; price: string }) {\n  return (\n    <motion.div \n      variants={listItemVariant}\n      className=\"group flex justify-between items-end border-b border-parchment/10 hover:border-parchment/30 pb-3 mb-3 transition-colors duration-300\"\n    >\n      <span className=\"font-serif text-[18px] text-parchment group-hover:text-roots-orange pr-4 transition-colors duration-300\">{name}</span>\n      <span className=\"font-sans text-[13px] font-medium text-parchment group-hover:text-roots-orange whitespace-nowrap transition-colors duration-300">{price}</span>\n    </motion.div>\n  );\n}`
  );

  fs.writeFileSync(f, text);
});
console.log('Script done');

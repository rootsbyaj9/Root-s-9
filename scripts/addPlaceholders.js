const fs = require('fs');

const configs = [
  {
    file: 'src/components/sections/services/mens/MensHair.tsx',
    numImages: 2,
    bg: 'bg-[#E8D4BE]',
    text: "MEN'S HAIR",
    extraClasses: ''
  },
  {
    file: 'src/components/sections/services/mens/MensSkin.tsx',
    numImages: 3,
    bg: 'bg-[#E8D4BE]',
    text: "MEN'S SKIN",
    extraClasses: 'order-2 md:order-1 mt-8 md:mt-0 '
  },
  {
    file: 'src/components/sections/services/womens/WomensHair.tsx',
    numImages: 3,
    bg: 'bg-[#F5EDE0]',
    text: 'HAIR SERVICES',
    extraClasses: ''
  },
  {
    file: 'src/components/sections/services/womens/WomensSkin.tsx',
    numImages: 4,
    bg: 'bg-[#F5EDE0]',
    text: 'SKIN TREATMENTS',
    extraClasses: 'order-1 md:order-2 mt-8 md:mt-0 '
  },
  {
    file: 'src/components/sections/services/womens/WomensThreading.tsx',
    numImages: 2,
    bg: 'bg-[#F5EDE0]',
    text: 'THREADING & MORE',
    extraClasses: ''
  },
  {
    file: 'src/components/sections/services/womens/WomensBridal.tsx',
    numImages: 2,
    bg: 'bg-[#F5EDE0]',
    text: 'BRIDAL MAKEOVER',
    extraClasses: 'order-1 md:order-2 mt-8 md:mt-0 '
  }
];

configs.forEach(c => {
  let content = fs.readFileSync(c.file, 'utf8');
  
  const regexText = c.text.replace(/&/g, '\\&');
  const regex = new RegExp(`\\{\\/\\* (Left|Right)\\: Image Placeholder \\(Sticky\\) \\*\\/\\}\\s*<motion\\.div[\\s\\S]*?${regexText}[\\s\\S]*?<\\/motion\\.div>`, 'g');
  
  const replacement = `{/* Image Placeholders */}
      <div className="${c.extraClasses}flex flex-col gap-6 h-full w-full mb-8 md:mb-0">
        {[...Array(${c.numImages})].map((_, i) => (
          <motion.div 
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageCurtainVariant}
            className="w-full h-[400px] sm:h-[500px] md:h-auto md:aspect-[4/5] ${c.bg} flex flex-col items-center justify-center rounded-md overflow-hidden group"
          >
            <span className="font-sans text-[12px] uppercase tracking-widest text-[#1A1008]/40 mb-2">
              IMAGE PLACEHOLDER
            </span>
            <span className="font-sans text-[14px] uppercase tracking-widest text-[#1A1008]/80 group-hover:scale-105 transition-transform duration-700 ease-out">
              ${c.text}
            </span>
          </motion.div>
        ))}
      </div>`;

  if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(c.file, content);
    console.log('Replaced in', c.file);
  } else {
    console.log('Failed to match in', c.file);
  }
});

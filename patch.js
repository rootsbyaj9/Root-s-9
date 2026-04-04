const fs = require('fs');

const files = [
  'src/components/sections/services/womens/WomensHair.tsx',
  'src/components/sections/services/womens/WomensSkin.tsx',
  'src/components/sections/services/womens/WomensBridal.tsx',
  'src/components/sections/services/womens/WomensThreading.tsx',
  'src/components/sections/services/mens/MensHair.tsx',
  'src/components/sections/services/mens/MensSkin.tsx',
];

files.forEach(file => {
  if (!fs.existsSync(file)) {
      console.log('Skipping ' + file)
      return;
  }
  let content = fs.readFileSync(file, 'utf-8');
  
  // Regex to remove the ServiceRow function definition
  const fnRegex = /function ServiceRow\(\{\s*name,\s*price\s*\}\s*:\s*\{\s*name:\s*string;\s*price:\s*string\s*\}\)\s*\{\s*return\s*\(\s*<motion\.div[\s\S]*?<\/motion\.div>\s*\);\s*\}/g;
  
  content = content.replace(fnRegex, '');
  
  // Add import if not present
  if (!content.includes('import ServiceRow')) {
    content = content.replace(
      'import React from "react";',
      'import React from "react";\nimport ServiceRow from "../ServiceRow";'
    );
  }

  // Same thing but mens path
  if (!content.includes('import ServiceRow')) {
    content = 'import ServiceRow from "../ServiceRow";\n' + content;
  }

  fs.writeFileSync(file, content);
  console.log('Patched ' + file);
});
console.log('Successfully patched files!');

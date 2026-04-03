const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = getFiles('src/components/sections/services');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // Fix the extra quote issue just in case
  if (content.includes('\"\">')) {
    content = content.replace(/\"\">/g, '\">');
    changed = true;
  }
  
  if (content.match(/<motion\.div[^>]*id=/)) {
    const targetEnding = "    </div>\r\n  );\r\n}";
    const targetEndingLnx = "    </div>\n  );\n}";
    
    if (content.includes(targetEnding)) {
      content = content.replace(targetEnding, "    </motion.div>\r\n  );\r\n}");
      changed = true;
    } else if (content.includes(targetEndingLnx)) {
      content = content.replace(targetEndingLnx, "    </motion.div>\n  );\n}");
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Fixed:', file);
  }
});
console.log('Done fixing syntax.');

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function findJsxFiles(dir, fileList = []) {
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) findJsxFiles(filePath, fileList);
    else if (filePath.endsWith('.jsx')) fileList.push(filePath);
  }
  return fileList;
}

const jsxFiles = findJsxFiles(srcDir);

let totalFixed = 0;

for (const file of jsxFiles) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Find icon-mask spans and inject width/height into the style if missing
  // Pattern: <span ...className="...icon-mask..."... style={{ ...WebkitMaskImage... }}>
  // We need to add width/height to the style object

  content = content.replace(
    /<span([^>]*)className="([^"]*icon-mask[^"]*)"([^>]*)style=\{\{([^}]*WebkitMaskImage[^}]*)\}\}([^>]*)><\/span>/g,
    (match, before, className, middle, styleContent, after) => {
      // Check if width/height already specified in style
      if (styleContent.includes('width') && styleContent.includes('height')) {
        return match; // already has explicit size
      }
      
      // Extract size from text-[Npx] or text-Ntail class
      let size = '20px'; // default
      const textSizeMatch = className.match(/text-\[(\d+)px\]/);
      if (textSizeMatch) {
        size = textSizeMatch[1] + 'px';
      } else if (className.includes('text-3xl')) size = '30px';
      else if (className.includes('text-2xl')) size = '24px';
      else if (className.includes('text-xl')) size = '20px';
      else if (className.includes('text-lg')) size = '18px';
      else if (className.includes('text-sm')) size = '14px';
      else if (className.includes('text-xs')) size = '12px';
      else if (className.includes('text-4xl')) size = '36px';
      else if (className.includes('text-5xl')) size = '48px';
      else if (className.includes('text-base')) size = '16px';
      
      // Inject width/height before the closing }}
      const newStyle = `${styleContent}, width: '${size}', height: '${size}'`;
      return `<span${before}className="${className}"${middle}style={{${newStyle}}}${after}></span>`;
    }
  );

  if (content !== original) {
    fs.writeFileSync(file, content);
    totalFixed++;
    console.log(`Fixed: ${path.basename(file)}`);
  }
}

console.log(`\nDone! Fixed ${totalFixed} files.`);

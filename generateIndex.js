import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, 'src');
const indexFilePath = path.join(srcDir, 'index.ts');

// Recursive function to gather all .ts files excluding index.ts
function getAllTSFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);

    try {
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Recurse into subdirectories, excluding specific paths
        results = results.concat(getAllTSFiles(filePath));
      } else if (file.endsWith('.ts') && file !== 'index.ts') {
        // Collect .ts files excluding index.ts itself
        results.push(filePath);
      }
    } catch (err) {
      console.warn(`Warning: Could not access ${filePath} - ${err.message}`);
    }
  });

  return results;
}

try {
  // Get all TypeScript files recursively
  const files = getAllTSFiles(srcDir);

  // Generate export statements
  const exports = files.map(file => {
    // Convert file path to relative import path
    const relativePath = path.relative(srcDir, file).replace(/\\/g, '/').replace('.ts', '');
    return `export * from './${relativePath}';`;
  }).join('\n');

  // Write to index.ts
  fs.writeFileSync(indexFilePath, exports);
  console.log('index.ts has been generated with the following exports:\n', exports);

} catch (error) {
  console.error('Error generating index.ts:', error);
}
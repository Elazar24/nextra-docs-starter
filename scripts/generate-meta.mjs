import fs from 'fs';
import path from 'path';

// This script generates _meta.json files for each year directory in the notes folder.
// This allows for dynamic sidebar navigation in Nextra.

// Get the absolute path to the notes directory.
const notesDir = path.join(process.cwd(), 'content', 'notes');

/**
 * Extracts the title from the frontmatter of an MDX file.
 * @param {string} filePath - The absolute path to the MDX file.
 * @returns {string|null} The title of the page, or null if not found.
 */
function getTitleFromMdx(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Use a regular expression to find the title in the frontmatter.
    const match = content.match(/^---\s*\ntitle:\s*['|"](.*)['|"]\n---\s*/s); // e.g. ---\ntitle: 'My Title'\n---
    if (match && match[1]) {
      return match[1];
    }
    return null;
  } catch (error) {
    console.error(`Error reading file: ${filePath}`, error);
    return null;
  }
}

// Read the notes directory.
fs.readdir(notesDir, { withFileTypes: true }, (err, dirents) => {
  if (err) {
    console.error('Error reading notes directory:', err);
    return;
  }

  // Iterate over each item in the notes directory.
  dirents.forEach(dirent => {
    // Process only directories (e.g., year1, year2).
    if (dirent.isDirectory()) {
      const yearDir = path.join(notesDir, dirent.name);
      const meta = {};

      // Read the contents of the year directory.
      fs.readdir(yearDir, { withFileTypes: true }, (err, moduleDirents) => {
        if (err) {
          console.error(`Error reading year directory: ${yearDir}`, err);
          return;
        }

        // Iterate over each item in the year directory.
        moduleDirents.forEach(moduleDirent => {
          // Process only MDX files.
          if (moduleDirent.isFile() && moduleDirent.name.endsWith('.mdx')) {
            const modulePath = path.join(yearDir, moduleDirent.name);
            const title = getTitleFromMdx(modulePath);
            const slug = moduleDirent.name.replace(/\.mdx$/, ''); // Remove .mdx extension
            
            // Use the title from frontmatter, or generate a title from the slug.
            meta[slug] = title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          }
        });

        // Write the generated metadata to the _meta.json file.
        const metaPath = path.join(yearDir, '_meta.json');
        fs.writeFile(metaPath, JSON.stringify(meta, null, 2), err => {
          if (err) {
            console.error(`Error writing _meta.json for ${dirent.name}:`, err);
          } else {
            console.log(`Successfully generated _meta.json for ${dirent.name}`);
          }
        });
      });
    }
  });
});
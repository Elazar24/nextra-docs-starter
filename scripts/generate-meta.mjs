import fs from 'fs/promises';
import path from 'path';

// This script generates _meta.json files for each directory in the notes folder.
// This allows for dynamic sidebar navigation in Nextra.

// Get the absolute path to the notes directory.
const notesDir = path.join(process.cwd(), 'content', 'notes');

/**
 * Extracts the title from the frontmatter of an MDX file.
 * @param {string} filePath - The absolute path to the MDX file.
 * @returns {string|null} The title of the page, or null if not found.
 */
async function getTitleFromMdx(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    // Use a regular expression to find the title in the frontmatter.
    const match = content.match(/^---\s*\ntitle:\s*['|"](.*)['|"]\n---\s*/s); // e.g. ---\ntitle: 'My Title'\n---
    if (match && match[1]) {
      return match[1];
    }
    return null;
  } catch (error) {
    // It's okay if the file doesn't exist or has no title.
    if (error.code === 'ENOENT') {
      return null;
    }
    console.error(`Error reading file: ${filePath}`, error);
    return null;
  }
}

/**
 * Generates a title from a slug.
 * @param {string} slug - The slug to generate a title from.
 * @returns {string} The generated title.
 */
function generateTitleFromSlug(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Recursively generates _meta.json files for a given directory.
 * @param {string} dir - The directory to process.
 */
async function generateMeta(dir) {
  try {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const meta = {};

    for (const dirent of dirents) {
      const direntPath = path.join(dir, dirent.name);
      if (dirent.isDirectory()) {
        // This is a module directory, recursively generate its meta.
        await generateMeta(direntPath);
        // Then, add the directory to the parent's meta.
        const title = generateTitleFromSlug(dirent.name);
        meta[dirent.name] = {
          title: title,
          type: 'folder',
        };
      } else if (dirent.isFile() && dirent.name.endsWith('.mdx')) {
        // This is a chapter or a module file.
        const slug = dirent.name.replace(/\.mdx$/, '');
        const title = await getTitleFromMdx(direntPath);
        meta[slug] = title || generateTitleFromSlug(slug);
      }
    }

    // Write the generated metadata to the _meta.json file.
    if (Object.keys(meta).length > 0) {
      const metaPath = path.join(dir, '_meta.json');
      await fs.writeFile(metaPath, JSON.stringify(meta, null, 2));
      console.log(`Successfully generated _meta.json for ${dir}`);
    }
  } catch (error) {
    console.error(`Error processing directory: ${dir}`, error);
  }
}

/**
 * Starts the meta generation process for all year directories.
 */
async function main() {
  try {
    const yearDirents = await fs.readdir(notesDir, { withFileTypes: true });
    for (const yearDirent of yearDirents) {
      if (yearDirent.isDirectory()) {
        await generateMeta(path.join(notesDir, yearDirent.name));
      }
    }
  } catch (error) {
    console.error('Error reading notes directory:', error);
  }
}

main();

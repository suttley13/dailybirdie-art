import { readdir, mkdir, copyFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
const output = 'public-assets';
await rm(output, { recursive: true, force: true });
let count = 0;
async function walk(directory = '') {
  for (const entry of await readdir(directory || '.', { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (/^(courses|v[23]|pairs|replacements)(\/|$)/.test(path) && !path.split('/').includes('audit')) await walk(path);
    } else if (entry.isFile() && (/^course-\d+\.jpg$/.test(path)
      || /^(?:v[23]\/)?courses\/\d+\/[^/]+\.(json|jpg)$/.test(path)
      || /^(pairs|replacements)\/\d+\.json$/.test(path))) {
      await mkdir(dirname(join(output, path)), { recursive: true });
      await copyFile(path, join(output, path));
      count++;
    }
  }
}
await walk();
console.log(`Prepared ${count} public course assets; audit files and generation runs stay out of the CDN.`);

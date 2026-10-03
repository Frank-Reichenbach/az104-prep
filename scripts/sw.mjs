import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Content hash over all precached files, so any change invalidates the offline cache.
export async function hashFiles(root, files) {
  const hash = createHash('sha256');
  for (const file of [...files].sort()) {
    hash.update(file + '\0');
    hash.update(await readFile(path.join(root, file)));
  }
  return hash.digest('hex').slice(0, 12);
}

// Fill the placeholders of app/sw.js; paths are relative to the service worker scope.
export function renderServiceWorker(template, files, version) {
  if (!template.includes('__VERSION__') || !template.includes('__PRECACHE__')) throw new Error('sw.js placeholders missing');
  // The list is embedded in a single-quoted JS string, so escape backslashes and quotes.
  const list = JSON.stringify([...files].sort()).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return template.replace('__VERSION__', () => version).replace('__PRECACHE__', () => list);
}

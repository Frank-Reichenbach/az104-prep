import { cp, mkdir, rm, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, filesUnder } from './content.mjs';

export async function buildSite(destination = path.join(ROOT, '_site')) {
  // Output only an explicit content allowlist, never the whole repository.
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });
  for (const name of ['index.html', 'style.css', 'main.mjs', 'theme.js', 'quiz.mjs', 'markdown.mjs', 'data.json', 'version.json'])
    await cp(path.join(ROOT, 'app', name), path.join(destination, name));
  for (const dir of ['knowledge', 'generated', 'questions', 'examples', 'exam', 'docs', 'templates']) {
    for (const file of await filesUnder(path.join(ROOT, dir))) {
      if (!/\.(md|json)$/.test(file)) continue;
      const target = path.join(destination, path.relative(ROOT, file));
      await mkdir(path.dirname(target), { recursive: true });
      await cp(file, target);
    }
  }
  // Some knowledge files link back to the project README and approved plan;
  // the app footer links the changelog.
  for (const name of ['README.md', 'PLAN.md', 'STATUS.md', 'CHANGELOG.md'])
    await cp(path.join(ROOT, name), path.join(destination, name));
  await writeFile(path.join(destination, '.nojekyll'), '');
  // Verify document links still resolve in the deployment output.
  for (const file of (await filesUnder(destination)).filter(p => p.endsWith('.md'))) {
    const text = await readFile(file, 'utf8');
    for (const [, href] of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      if (/^(https?:|#|mailto:)/.test(href)) continue;
      const target = path.resolve(path.dirname(file), href.split('#')[0]);
      if (!target.startsWith(destination + path.sep)) throw new Error(`Link leaves site: ${href}`);
      await readFile(target);
    }
  }
  return destination;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await buildSite();
  console.log('Static site built in _site/.');
}

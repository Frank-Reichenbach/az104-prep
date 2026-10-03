import { cp, mkdir, rm, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, filesUnder } from './content.mjs';
import { hashFiles, renderServiceWorker } from './sw.mjs';
import { SITE_URL, jsonLd, llmsTxt, robotsTxt, sitemapXml } from './seo.mjs';

export async function buildSite(destination = path.join(ROOT, '_site')) {
  // Output only an explicit content allowlist, never the whole repository.
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });
  for (const name of ['index.html', 'style.css', 'main.mjs', 'theme.js', 'quiz.mjs', 'markdown.mjs', 'analysis.mjs', 'vendor/chart.umd.js', 'vendor/LICENSE-chart.js.txt', 'vendor/icons.svg', 'vendor/LICENSE-lucide.txt', 'data.json', 'version.json', 'manifest.webmanifest'])
    { await mkdir(path.dirname(path.join(destination, name)), { recursive: true }); await cp(path.join(ROOT, 'app', name), path.join(destination, name)); }
  for (const file of await filesUnder(path.join(ROOT, 'app', 'icons'))) {
    const target = path.join(destination, path.relative(path.join(ROOT, 'app'), file));
    await mkdir(path.dirname(target), { recursive: true });
    await cp(file, target);
  }
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
  // Fill the absolute-URL placeholders and add crawler/agent discovery files.
  const html = (await readFile(path.join(destination, 'index.html'), 'utf8')).replaceAll('%SITE_URL%', SITE_URL).replace('%JSON_LD%', () => jsonLd());
  await writeFile(path.join(destination, 'index.html'), html);
  await writeFile(path.join(destination, 'robots.txt'), robotsTxt());
  await writeFile(path.join(destination, 'sitemap.xml'), await sitemapXml(destination, new Date().toISOString().slice(0, 10)));
  await writeFile(path.join(destination, 'llms.txt'), await llmsTxt(destination));
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
  // Precache every file of the site (scope-relative); the worker itself is not cached.
  const precache = (await filesUnder(destination)).map(f => path.relative(destination, f).split(path.sep).join('/')).filter(f => f !== '.nojekyll');
  const version = await hashFiles(destination, precache);
  const template = await readFile(path.join(ROOT, 'app', 'sw.js'), 'utf8');
  await writeFile(path.join(destination, 'sw.js'), renderServiceWorker(template, ['./', ...precache], version));
  return destination;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await buildSite();
  console.log('Static site built in _site/.');
}

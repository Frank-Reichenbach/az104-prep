import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { buildSite } from '../scripts/build-site.mjs';
import { filesUnder } from '../scripts/content.mjs';

test('static site output is self-contained, project-path safe, and excludes repository internals', async t => {
  const dir = await mkdtemp(path.join(tmpdir(), 'az104-site-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  await buildSite(dir);
  for (const file of ['index.html', 'style.css', 'main.mjs', 'quiz.mjs', 'data.json', '.nojekyll'])
    await access(path.join(dir, file));
  // Root-absolute URLs break under /<repository>/ on GitHub Pages.
  const html = await readFile(path.join(dir, 'index.html'), 'utf8');
  assert.doesNotMatch(html, /(?:src|href)="\/(?!\/)/);
  const files = (await filesUnder(dir)).map(f => path.relative(dir, f));
  assert.ok(files.every(f => !/^(node_modules|scripts|tests|\.git|\.github|\.claude)\b/.test(f)));
  assert.ok(files.every(f => !/(^|\/)(package\.json|pnpm-lock\.yaml|AGENTS\.md)$/.test(f)));
  await assert.rejects(access(path.join(dir, 'progress')));
});

test('site output is an installable, fully precached PWA', async t => {
  const dir = await mkdtemp(path.join(tmpdir(), 'az104-pwa-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  await buildSite(dir);
  const manifest = JSON.parse(await readFile(path.join(dir, 'manifest.webmanifest'), 'utf8'));
  for (const key of ['name', 'short_name', 'start_url', 'scope', 'display', 'theme_color', 'background_color'])
    assert.ok(manifest[key], `manifest.${key}`);
  assert.equal(manifest.start_url, './');
  assert.ok(manifest.icons.some(i => i.sizes === '192x192') && manifest.icons.some(i => i.sizes === '512x512'));
  assert.ok(manifest.icons.some(i => i.purpose === 'maskable'));
  for (const icon of manifest.icons) {
    assert.doesNotMatch(icon.src, /^\//, 'icon paths must be relative');
    await access(path.join(dir, icon.src));
  }
  const html = await readFile(path.join(dir, 'index.html'), 'utf8');
  assert.match(html, /rel="manifest"/);
  assert.match(html, /name="theme-color"/);
  // Every shipped file except the worker and .nojekyll must be precached.
  const sw = await readFile(path.join(dir, 'sw.js'), 'utf8');
  assert.doesNotMatch(sw, /__VERSION__|__PRECACHE__/);
  const list = JSON.parse(sw.match(/JSON\.parse\('(.*)'\)/)[1]);
  const files = (await filesUnder(dir)).map(f => path.relative(dir, f).split(path.sep).join('/'));
  for (const file of files.filter(f => f !== 'sw.js' && f !== '.nojekyll')) assert.ok(list.includes(file), `${file} not precached`);
  assert.ok(list.includes('./'));
  assert.ok(list.every(f => !f.startsWith('/')), 'precache paths must be relative');
});

test('site output exposes crawler and agent discovery files', async t => {
  const dir = await mkdtemp(path.join(tmpdir(), 'az104-seo-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  await buildSite(dir);
  const html = await readFile(path.join(dir, 'index.html'), 'utf8');
  assert.doesNotMatch(html, /%SITE_URL%|%JSON_LD%/);
  const base = html.match(/<link rel="canonical" href="([^"]+)"/)[1];
  assert.match(base, /^https:\/\/.+\/$/);
  const ld = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(ld['@type'], 'Course');
  assert.equal(ld.url, base);
  const robots = await readFile(path.join(dir, 'robots.txt'), 'utf8');
  assert.ok(robots.includes(`Sitemap: ${base}sitemap.xml`));
  // Every URL in sitemap.xml and llms.txt must resolve to a shipped file.
  const sitemap = await readFile(path.join(dir, 'sitemap.xml'), 'utf8');
  const llms = await readFile(path.join(dir, 'llms.txt'), 'utf8');
  const urls = [...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]), ...[...llms.matchAll(/\]\((https:[^)]+)\)/g)].map(m => m[1])];
  assert.ok(urls.length > 10);
  for (const url of urls) {
    assert.ok(url.startsWith(base), url);
    const rel = url.slice(base.length);
    await access(path.join(dir, rel || 'index.html'));
  }
  assert.match(llms, /^# AZ-104 Practice/);
  const sw = await readFile(path.join(dir, 'sw.js'), 'utf8');
  for (const f of ['robots.txt', 'sitemap.xml', 'llms.txt']) assert.ok(sw.includes(f), `${f} not precached`);
});

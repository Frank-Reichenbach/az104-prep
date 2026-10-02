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

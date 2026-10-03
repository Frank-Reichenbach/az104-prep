import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { hashFiles, renderServiceWorker } from '../scripts/sw.mjs';

test('cache version is deterministic and changes with content', async t => {
  const dir = await mkdtemp(path.join(tmpdir(), 'az104-sw-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  await writeFile(path.join(dir, 'a.txt'), 'one');
  await writeFile(path.join(dir, 'b.txt'), 'two');
  const first = await hashFiles(dir, ['a.txt', 'b.txt']);
  assert.equal(await hashFiles(dir, ['b.txt', 'a.txt']), first);
  await writeFile(path.join(dir, 'b.txt'), 'changed');
  assert.notEqual(await hashFiles(dir, ['a.txt', 'b.txt']), first);
});

test('service worker template is filled and survives special characters', () => {
  const template = "const VERSION = '__VERSION__';\nconst PRECACHE = JSON.parse('__PRECACHE__');";
  const out = renderServiceWorker(template, ['./', "it's$&.md"], 'abc');
  assert.match(out, /VERSION = 'abc'/);
  const list = JSON.parse(out.match(/JSON\.parse\('(.*)'\)/)[1].replace(/\\'/g, "'"));
  assert.deepEqual(list, ["./", "it's$&.md"]);
  assert.throws(() => renderServiceWorker('nothing', [], 'x'));
});

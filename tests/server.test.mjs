import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { once } from 'node:events';
import { createStudyServer } from '../scripts/serve.mjs';

test('local server serves the study app and sources but does not expose repository internals', async t => {
  const server = createStudyServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const response = await fetch(base);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /AZ-104 Practice/);
  assert.match(response.headers.get('content-security-policy'), /default-src 'self'/);
  assert.doesNotMatch(html, /<script(?![^>]*\ssrc=)/, 'inline scripts violate the CSP');
  const theme = await fetch(base + '/theme.js');
  assert.equal(theme.status, 200);
  assert.match(theme.headers.get('content-type'), /text\/javascript/);
  const bank = await (await fetch(base + '/data.json')).json();
  assert.ok(bank.questions.length > 0);
  assert.ok(bank.coverage.total >= bank.coverage.covered);
  const md = await fetch(base + '/knowledge/storage/blob-storage/containers.md');
  assert.equal(md.status, 200);
  assert.match(md.headers.get('content-type'), /text\/plain/);
  assert.equal((await fetch(base + '/markdown.mjs')).status, 200);
  const manifest = await fetch(base + '/manifest.webmanifest');
  assert.match(manifest.headers.get('content-type'), /application\/manifest\+json/);
  assert.match((await fetch(base + '/icons/icon-192.png')).headers.get('content-type'), /image\/png/);
  const worker = await fetch(base + '/sw.js');
  assert.match(worker.headers.get('content-type'), /text\/javascript/);
  assert.doesNotMatch(await worker.text(), /__VERSION__|__PRECACHE__/);
  assert.equal((await fetch(base + '/icons/../package.json')).status, 404);
  assert.equal((await fetch(base + '/README.md')).status, 200);
  for (const target of ['/.git/config', '/package.json', '/%2e%2e/package.json', '/knowledge/%2e%2e/AGENTS.md', '/missing', '/%ZZ']) {
    assert.equal((await fetch(base + target)).status, 404, target);
  }
  assert.equal((await fetch(base, { method: 'POST' })).status, 405);
  const head = await fetch(base, { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  // The footer version must match package.json and the changelog must be reachable.
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  assert.deepEqual(await (await fetch(base + '/version.json')).json(), { version: pkg.version });
  const changelog = await fetch(base + '/CHANGELOG.md');
  assert.equal(changelog.status, 200);
  assert.match(await changelog.text(), /^# Changelog/);
});

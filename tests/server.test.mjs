import test from 'node:test';
import assert from 'node:assert/strict';
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
  assert.match(await response.text(), /AZ-104 Practice/);
  assert.match(response.headers.get('content-security-policy'), /default-src 'self'/);
  const bank = await (await fetch(base + '/data.json')).json();
  assert.ok(bank.questions.length > 0);
  assert.ok(bank.coverage.total >= bank.coverage.covered);
  const md = await fetch(base + '/knowledge/storage/blob-storage/containers.md');
  assert.equal(md.status, 200);
  assert.match(md.headers.get('content-type'), /text\/plain/);
  for (const target of ['/.git/config', '/package.json', '/%2e%2e/package.json', '/knowledge/%2e%2e/AGENTS.md', '/missing', '/%ZZ']) {
    assert.equal((await fetch(base + target)).status, 404, target);
  }
  assert.equal((await fetch(base, { method: 'POST' })).status, 405);
  const head = await fetch(base, { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
});

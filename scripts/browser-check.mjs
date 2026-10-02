import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { once } from 'node:events';
import { createStudyServer } from './serve.mjs';
import { buildSite } from './build-site.mjs';
import { ROOT } from './content.mjs';

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const profile = await mkdtemp(path.join(os.tmpdir(), 'az104-browser-'));
const browserPath = process.env.BROWSER_BIN || (process.platform === 'darwin'
  ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome');
const args = ['--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-background-networking',
  '--disable-sync', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'];
if (process.platform === 'linux') args.unshift('--no-sandbox');
const browser = spawn(browserPath, args, { stdio: 'ignore' });
let browserError;
browser.on('error', error => { browserError = error; });
const servers = [];
let socket;

try {
  let port;
  for (let i = 0; i < 150; i++) {
    if (browserError) throw browserError;
    try { port = (await readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; break; }
    catch { await pause(100); }
  }
  if (!port) throw new Error('Chrome did not start a debugging session within 15 seconds.');
  const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  socket = new WebSocket(pages.find(p => p.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let sequence = 0;
  const pending = new Map();
  const exceptions = [];
  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    if (data.method === 'Runtime.exceptionThrown') exceptions.push(data.params.exceptionDetails.text);
    if (!data.id) return;
    const request = pending.get(data.id); if (!request) return;
    pending.delete(data.id); clearTimeout(request.timer);
    if (data.error) request.reject(new Error(data.error.message)); else request.resolve(data.result);
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Browser command timed out: ${method}`)); }, 15000);
    pending.set(id, { resolve, reject, timer }); socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true, replMode: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  const waitFor = async expression => {
    for (let i = 0; i < 150; i++) { if (await evaluate(expression)) return; await pause(100); }
    throw new Error(`Browser condition timed out: ${expression}`);
  };
  await call('Runtime.enable');
  await call('Page.enable');
  const externalURL = process.argv.includes('--url') ? process.argv[process.argv.indexOf('--url') + 1] : null;
  const targets = [];
  if (externalURL) targets.push(externalURL);
  else {
    await buildSite();
    for (const [root, options] of [[ROOT, {}], [path.join(ROOT, '_site'), { staticSite: true, basePath: '/az104-prep/' }]]) {
      const server = createStudyServer(root, options); servers.push(server);
      server.listen(0, '127.0.0.1'); await once(server, 'listening');
      targets.push(`http://127.0.0.1:${server.address().port}${options.basePath || '/'}`);
    }
  }
  for (const target of targets) {
    await call('Page.navigate', { url: target });
    await waitFor(`location.href === ${JSON.stringify(target)} && document.readyState === 'complete'`);
    await waitFor('document.getElementById("setup") && !document.getElementById("setup").hidden');
    await evaluate(`window.testBank = await (await fetch(new URL('./data.json', location.href))).json();
      window.testAnswers = [];
      document.getElementById('topic').value = 'weighted';
      document.getElementById('mode').value = 'test'; document.getElementById('count').value = '100';
      document.getElementById('start-form').requestSubmit();`);
    const state = await evaluate(`({position: document.getElementById('position').textContent, topic: document.getElementById('question-topic').textContent})`);
    assert.match(state.position, /Question 1 of/);
    assert.ok(state.topic.includes(' › '), 'Question includes domain and topic context');
    // Invalid submissions must not advance; valid ones must not need Next.
    await evaluate(`document.getElementById('answer-form').requestSubmit()`);
    assert.equal(await evaluate(`document.getElementById('position').textContent`), state.position);
    let answered = 0;
    let multiSeen = false;
    while (await evaluate(`document.getElementById('results').hidden`)) {
      if (answered > 100) throw new Error('Test did not finish.');
      const result = await evaluate(`(() => {
        const q = testBank.questions.find(q => q.prompt === document.getElementById('prompt').textContent);
        let chosen = [...q.correct];
        if (${answered} === 0 || q.select > 1) chosen[0] = q.options.find(o => !q.correct.includes(o.id)).id;
        if (!window.testAnswers) window.testAnswers = [];
        testAnswers.push({ q, chosen });
        for (const input of document.querySelectorAll('#choices input')) input.checked = chosen.includes(input.value);
        document.getElementById('answer-form').requestSubmit();
        return { select: q.select, topic: document.getElementById('question-topic').textContent, nextHidden: document.getElementById('next').hidden };
      })()`);
      multiSeen ||= result.select > 1;
      assert.ok(result.nextHidden);
      assert.ok(result.topic.length > 0);
      answered++;
    }
    assert.ok(multiSeen, 'Multiple-answer questions exercised');
    const mix = await evaluate(`testBank.domains.map(d => ({
      id: d.id, weight: (d.weight[0] + d.weight[1]) / 2,
      actual: testAnswers.filter(a => testBank.topics.find(t => t.id === a.q.topic).domain === d.id).length
    }))`);
    const totalWeight = mix.reduce((sum, d) => sum + d.weight, 0);
    for (const d of mix) assert.ok(Math.abs(d.actual - answered * d.weight / totalWeight) < 1,
      `${d.id} weighted question count`);
    const reviews = await evaluate(`[...document.querySelectorAll('#review details')].map((detail, i) => {
      const a = testAnswers[i]; const correct = a.q.correct.every(id => a.chosen.includes(id));
      return { open: detail.open, correct, count: detail.querySelectorAll('.explanation').length,
        expected: new Set([...a.q.correct, ...a.chosen]).size,
        displayed: [...detail.querySelectorAll('.explanation')].map(p => p.dataset.optionId).sort(),
        expectedIds: [...new Set([...a.q.correct, ...a.chosen])].sort() };
    })`);
    for (const r of reviews) {
      assert.equal(r.open, !r.correct); assert.equal(r.count, r.expected);
      assert.deepEqual(r.displayed, r.expectedIds);
    }
    assert.ok(reviews.some(r => r.correct), 'Correct results remain collapsed');
    assert.ok(reviews.some(r => !r.correct), 'Wrong results open by default');
    const linkStatuses = await evaluate(`await Promise.all([...document.querySelectorAll('nav a, #review a')]
      .filter(a => a.origin === location.origin).map(async a => ({url: a.href, status: (await fetch(a.href)).status})))`);
    for (const link of linkStatuses) assert.equal(link.status, 200, link.url);
    await evaluate(`document.getElementById('again').click(); document.getElementById('mode').value = 'practice';
      document.getElementById('count').value = '1'; document.getElementById('start-form').requestSubmit();
      window.practiceQ = testBank.questions.find(q => q.prompt === document.getElementById('prompt').textContent);
      for (const input of document.querySelectorAll('#choices input')) input.checked = practiceQ.correct.includes(input.value);
      document.getElementById('answer-form').requestSubmit();`);
    assert.equal(await evaluate(`document.getElementById('results').hidden`), true);
    assert.equal(await evaluate(`document.getElementById('next').hidden`), false);
    assert.equal(await evaluate(`document.querySelectorAll('#feedback .explanation').length`), await evaluate('practiceQ.options.length'));
    await evaluate(`document.getElementById('next').click()`);
    assert.equal(await evaluate(`document.getElementById('results').hidden`), false);
    const recorded = await evaluate(`JSON.parse(localStorage.getItem('az104-progress-v1')).attempts.length`);
    assert.equal(recorded, answered + 1);
    await call('Page.reload');
    await waitFor('document.getElementById("setup") && !document.getElementById("setup").hidden');
    assert.match(await evaluate(`document.getElementById('progress').textContent`), new RegExp(`^${recorded} recorded answers`));
    console.log(`Browser verified ${target}: direct test navigation, context, compact/open results, preparation feedback, links, and persistent progress.`);
  }
  assert.deepEqual(exceptions, []);
} finally {
  socket?.close();
  for (const server of servers) { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
  const stopped = browser.exitCode !== null || browserError ? Promise.resolve() : once(browser, 'exit');
  browser.kill(); await stopped;
  await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
}

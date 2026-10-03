import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
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
  const dialogs = [];
  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    if (data.method === 'Runtime.exceptionThrown') exceptions.push(data.params.exceptionDetails.text);
    if (data.method === 'Page.javascriptDialogOpening') dialogs.push(data.params);
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
  const key = async (name, code, value) => {
    for (const type of ['keyDown', 'keyUp']) await call('Input.dispatchKeyEvent', {
      type, key: name, code, windowsVirtualKeyCode: value, nativeVirtualKeyCode: value,
      ...(type === 'keyDown' && ['Enter', ' '].includes(name)
        ? { text: name === 'Enter' ? '\r' : ' ', unmodifiedText: name === 'Enter' ? '\r' : ' ' } : {})
    });
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
  let transferFile, transferProgress;
  for (const [targetIndex, target] of targets.entries()) {
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

    // Exercise native keyboard focus, answer selection, and form submission.
    await evaluate(`window.testBank = await (await fetch(new URL('./data.json', location.href))).json();
      document.getElementById('count').value = '1';
      document.getElementById('mode').value = 'test';
      document.getElementById('missed').focus();`);
    await key('Tab', 'Tab', 9);
    assert.equal(await evaluate(`document.activeElement === document.querySelector('#start-form button[type="submit"]')`), true);
    await key('Enter', 'Enter', 13);
    await waitFor(`!document.getElementById('session').hidden`);
    const correctIDs = await evaluate(`testBank.questions.find(q => q.prompt === document.getElementById('prompt').textContent).correct`);
    for (const id of correctIDs) {
      await evaluate(`[...document.querySelectorAll('#choices input')].find(input => input.value === ${JSON.stringify(id)}).focus()`);
      await key(' ', 'Space', 32);
    }
    for (let i = 0; i < 10 && !(await evaluate(`document.activeElement.id === 'submit-answer'`)); i++)
      await key('Tab', 'Tab', 9);
    assert.equal(await evaluate(`document.activeElement.id`), 'submit-answer');
    await key('Enter', 'Enter', 13);
    await waitFor(`!document.getElementById('results').hidden`);
    assert.match(await evaluate(`document.getElementById('result-score').textContent`), /^1\/1 correct/);
    // The session results embed the test-vs-history chart, and the analysis page is reachable.
    await waitFor(`document.querySelector('#result-analysis canvas') && document.querySelector('#result-analysis table')`);
    await evaluate(`location.hash = '#/analysis'`);
    await waitFor(`!document.getElementById('analysis').hidden`);
    assert.equal(await evaluate(`document.activeElement.id`), 'analysis-title');
    await evaluate(`location.hash = ''`);
    await waitFor(`!document.getElementById('results').hidden`);
    const expectedCount = recorded + 1;

    // Download through the real Export button, then import that file through
    // the native file input and confirmation dialog into fresh browser storage.
    const downloadDir = path.join(profile, `downloads-${targetIndex}`);
    await mkdir(downloadDir);
    await call('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadDir });
    await evaluate(`document.getElementById('again').click(); document.getElementById('export').click()`);
    const exportFile = path.join(downloadDir, 'az104-progress.json');
    let exported;
    for (let i = 0; i < 150; i++) {
      try { exported = JSON.parse(await readFile(exportFile, 'utf8')); break; }
      catch { await pause(100); }
    }
    assert.equal(exported?.version, 1, 'Downloaded a valid progress file');
    assert.equal(exported.attempts.length, expectedCount);
    assert.deepEqual(exported, await evaluate(`JSON.parse(localStorage.getItem('az104-progress-v1'))`));
    transferFile ??= exportFile;
    transferProgress ??= exported;
    await evaluate(`localStorage.removeItem('az104-progress-v1')`);
    await call('Page.reload');
    await waitFor(`document.getElementById('setup') && !document.getElementById('setup').hidden
      && document.getElementById('progress').textContent.startsWith('0 recorded answers')`);
    assert.match(await evaluate(`document.getElementById('progress').textContent`), /^0 recorded answers/);
    const { root } = await call('DOM.getDocument');
    const { nodeId } = await call('DOM.querySelector', { nodeId: root.nodeId, selector: '#import' });
    const dialogCount = dialogs.length;
    await call('DOM.setFileInputFiles', { nodeId, files: [transferFile] });
    for (let i = 0; i < 150 && dialogs.length === dialogCount; i++) await pause(100);
    assert.equal(dialogs.length, dialogCount + 1, 'Import asks before replacing progress');
    assert.equal(dialogs.at(-1).type, 'confirm');
    assert.match(dialogs.at(-1).message, /Replace current progress/);
    await call('Page.handleJavaScriptDialog', { accept: true });
    await waitFor(`document.getElementById('progress').textContent.startsWith('${transferProgress.attempts.length} recorded answers')`);
    assert.deepEqual(await evaluate(`JSON.parse(localStorage.getItem('az104-progress-v1'))`), transferProgress);
    await call('Page.reload');
    await waitFor(`document.getElementById('setup') && !document.getElementById('setup').hidden`);
    assert.match(await evaluate(`document.getElementById('progress').textContent`),
      new RegExp(`^${transferProgress.attempts.length} recorded answers`));
    // Theme preference cycles system → light → dark and updates theme-color.
    await evaluate(`localStorage.removeItem('az104-theme')`);
    await call('Page.reload');
    await waitFor(`document.getElementById('setup') && !document.getElementById('setup').hidden`);
    const themes = [];
    for (let i = 0; i < 3; i++) {
      await evaluate(`document.getElementById('theme-toggle').click()`);
      themes.push(await evaluate(`({ pref: document.documentElement.dataset.themePref, theme: document.documentElement.dataset.theme,
        color: document.querySelector('meta[name="theme-color"]').content, stored: localStorage.getItem('az104-theme') })`));
    }
    assert.deepEqual(themes.map(t => t.pref), ['light', 'dark', 'system']);
    assert.deepEqual(themes.map(t => t.stored), ['light', 'dark', null]);
    assert.equal(themes[0].color, '#f0f4f6'); assert.equal(themes[1].color, '#0f1a22');
    assert.equal(themes[1].theme, 'dark');

    // PWA: the worker precaches the site; the app must then work with the network off.
    assert.equal(await evaluate(`(await fetch(new URL('./manifest.webmanifest', location.href))).ok`), true);
    await waitFor(`document.getElementById('offline').textContent.includes('Available offline')`);
    await call('Network.enable');
    await call('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0 });
    try {
      await call('Page.reload');
      await waitFor(`document.getElementById('setup') && !document.getElementById('setup').hidden`);
      assert.match(await evaluate(`document.getElementById('coverage').textContent`), /\d/);
      await evaluate(`location.hash = '#/doc/knowledge/index.md'`);
      await waitFor(`!document.getElementById('doc').hidden && document.getElementById('doc-body').textContent.length > 100`);
    } finally {
      await call('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
    }
    console.log(`Browser verified ${target}: test/preparation flows, context/results, links, keyboard operation, progress export/import with persistence, theme cycle, and offline use.`);
  }
  assert.deepEqual(exceptions, []);
} finally {
  socket?.close();
  for (const server of servers) { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
  const stopped = browser.exitCode !== null || browserError ? Promise.resolve() : once(browser, 'exit');
  browser.kill(); await stopped;
  await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
}

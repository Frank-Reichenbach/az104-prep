import { renderMarkdown, resolveDoc, isDocPath, slugify } from './markdown.mjs';
import { makeQuiz, score, familyStatus, reviewFamilies, isUnsure, parseProgress } from './quiz.mjs';

const $ = id => document.getElementById(id);
const STORAGE = 'az104-progress-v1';
let bank, attempts = [], active = [], position = 0, answers = [], mode = 'practice', submitted = false, storageWritable = true;
function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function applyTheme(theme, persist = false) {
  document.documentElement.dataset.theme = theme;
  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  $('theme-toggle').setAttribute('aria-label', label); $('theme-toggle').title = label;
  if (persist) { try { localStorage.setItem('az104-theme', theme); } catch { /* preference stays session-only */ } }
}
$('theme-toggle').addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true));
applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
function message(text = '') { $('message').textContent = text; }
let view = 'setup';
function show(id) { view = id; for (const name of ['setup', 'session', 'results', 'doc']) $(name).hidden = name !== id; }
function save() {
  if (!storageWritable) { message('Existing unreadable progress was preserved. Export new answers to save them; automatic storage is disabled for this session.'); return; }
  try { localStorage.setItem(STORAGE, JSON.stringify({ version: 1, attempts })); }
  catch { message('Browser storage is unavailable or full. Export progress to preserve this session.'); }
}
function summarize() {
  const map = new Map(bank.questions.map(q => [q.id, q]));
  const correct = attempts.filter(a => !isUnsure(a) && score(map.get(a.id), a.selected)).length;
  const status = [...familyStatus(attempts, bank.questions).values()];
  const count = kind => status.filter(s => s === kind).length;
  const families = new Set(bank.questions.map(q => q.family)).size;
  $('progress').textContent = `${attempts.length} recorded answers · ${correct} correct · Current state of ${families} families: ${count('wrong')} wrong · ${count('unsure')} unsure · ${families - status.length} not yet answered`;
}
function reference(href, text) {
  const link = el('a', text); link.href = href; link.target = '_blank'; link.rel = 'noopener'; return link;
}
function topicContext(q) {
  const topic = bank.topics.find(t => t.id === q.topic);
  if (!topic) return q.topic;
  return `${topic.domain[0].toUpperCase()}${topic.domain.slice(1)} › ${topic.title}`;
}
function explain(q, selected, compact = false, unsure = false) {
  const box = el('div');
  box.append(unsure ? el('p', 'Marked as unsure — saved for later review. This does not count as correct.', 'border-l-4 border-notice-line pl-3.5')
    : el('p', score(q, selected) ? 'Correct answer set.' : 'Incorrect answer set.', `border-l-4 pl-3.5 ${score(q, selected) ? 'border-good' : 'border-bad'}`));
  for (const option of q.options) {
    const good = q.correct.includes(option.id);
    if (compact && !selected.includes(option.id) && !good) continue;
    const p = el('p', undefined, `explanation my-3 border-l-4 pb-1.5 pl-3.5 ${good ? 'border-good' : 'border-bad'}`);
    p.dataset.optionId = option.id;
    p.append(el('strong', `${good ? 'Correct' : 'Incorrect'} option${selected.includes(option.id) ? ' · selected' : ''}: ${option.text} `), document.createTextNode(option.explanation));
    box.append(p);
  }
  const links = el('p'); const study = el('a', 'Study this topic'); study.href = `#/doc/${q.knowledge.replace(/^\.\//, '')}`; links.append(study);
  q.sources.forEach((url, i) => links.append(document.createTextNode(' · '), reference(url, `Microsoft source ${i + 1}`)));
  box.append(links, el('p', `Evidence checked ${q.verified} · ${q.id}`, 'text-[.86rem] text-soft'));
  return box;
}
function renderQuestion() {
  const q = active[position]; submitted = false;
  $('position').textContent = `${mode} · Question ${position + 1} of ${active.length}`;
  $('question-topic').textContent = topicContext(q);
  $('prompt').textContent = q.prompt;
  $('instruction').textContent = `Select ${q.select} answer${q.select === 1 ? '' : 's'}.`;
  $('choices').replaceChildren($('instruction'));
  q.options.forEach((option, i) => {
    const label = el('label', undefined, 'choice my-3 flex cursor-pointer gap-3 rounded-md border border-edge p-4 font-normal has-checked:border-brand has-checked:bg-selected');
    const input = document.createElement('input'); input.type = q.select === 1 ? 'radio' : 'checkbox';
    input.className = 'mt-1.5 shrink-0'; input.name = 'answer'; input.value = option.id;
    label.append(input, el('span', `${String.fromCharCode(65 + i)}. ${option.text}`));
    $('choices').append(label);
  });
  $('choices').disabled = false; $('submit-answer').hidden = false; $('unsure-answer').hidden = false;
  $('submit-answer').textContent = mode === 'practice' ? 'Check answer' : 'Submit answer';
  $('feedback').replaceChildren(); $('next').hidden = true;
  $('prompt').focus();
}
function finish() {
  const ok = a => !a.unsure && score(a.q, a.selected);
  const correct = answers.filter(ok).length, unsure = answers.filter(a => a.unsure).length;
  $('result-score').textContent = answers.length
    ? `${correct}/${answers.length} correct (${Math.round(correct / answers.length * 100)}%) · ${answers.length - correct - unsure} wrong · ${unsure} unsure · ${answers.length}/${active.length} planned questions answered`
    : 'No questions answered in this session.';
  $('review').replaceChildren();
  answers.forEach((a, i) => {
    const details = el('details', undefined, 'border-t border-line py-4');
    details.open = !ok(a);
    details.append(el('summary', `${i + 1}. ${a.unsure ? 'Unsure' : ok(a) ? 'Correct' : 'Review'} — ${a.q.prompt}`, 'cursor-pointer font-semibold'),
      el('p', topicContext(a.q), 'text-[.86rem] text-soft'), explain(a.q, a.selected, true, a.unsure));
    $('review').append(details);
  });
  show('results'); $('result-title').focus();
}

$('start-form').addEventListener('submit', event => {
  event.preventDefault(); message();
  try {
    active = makeQuiz(bank.questions, { topic: $('topic').value, count: Number($('count').value),
      domains: bank.domains, topics: bank.topics,
      missed: $('missed').value === 'none' ? null : reviewFamilies(attempts, bank.questions, $('missed').value) });
    if (!active.length) { message('No question families match this selection. Change the topic or the review filter.'); return; }
    if (active.length < Number($('count').value)) message(`This selection has ${active.length} available families; the session uses all of them.`);
    mode = $('mode').value; position = 0; answers = []; show('session'); renderQuestion();
  } catch (error) { message(error.message); }
});
function record(q, selected, unsure = false) {
  message(); submitted = true; answers.push({ q, selected, unsure });
  attempts.push({ id: q.id, revision: q.revision, selected, ...(unsure && { unsure: true }), at: new Date().toISOString() });
  attempts = attempts.slice(-10000); save();
  if (mode === 'test') { advance(); return; }
  $('choices').disabled = true; $('submit-answer').hidden = true; $('unsure-answer').hidden = true;
  $('feedback').append(explain(q, selected, false, unsure));
  $('next').hidden = false; $('next').textContent = position + 1 === active.length ? 'View results' : 'Next question';
  $('next').focus();
}
$('answer-form').addEventListener('submit', event => {
  event.preventDefault(); if (submitted) return;
  const q = active[position];
  const selected = [...$('choices').querySelectorAll('input:checked')].map(input => input.value);
  if (selected.length !== q.select) { message(`Select exactly ${q.select} answer${q.select === 1 ? '' : 's'} before submitting, or choose "I'm unsure".`); return; }
  record(q, selected);
});
$('unsure-answer').addEventListener('click', () => { if (!submitted) record(active[position], [], true); });
document.addEventListener('keydown', event => {
  if (view !== 'session' || submitted || event.key.toLowerCase() !== 'u' || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.target.closest?.('input, select, textarea')) return;
  event.preventDefault(); $('unsure-answer').click();
});
function advance() { if (++position < active.length) renderQuestion(); else finish(); }
$('next').addEventListener('click', advance);
$('end').addEventListener('click', () => { if (confirm('End this session? Submitted answers are saved; unanswered questions are not scored.')) finish(); });
$('again').addEventListener('click', () => { message(); summarize(); show('setup'); $('topic').focus(); });
$('export').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify({ version: 1, attempts }, null, 2)], { type: 'application/json' }));
  const a = el('a'); a.href = url; a.download = 'az104-progress.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$('import-button').addEventListener('click', () => $('import').click());
$('import').addEventListener('change', async event => {
  const file = event.target.files[0]; if (!file) return;
  try {
    if (file.size > 5_000_000) throw new Error('Progress file exceeds the 5 MB limit.');
    const result = parseProgress(JSON.parse(await file.text()), bank.questions);
    if (!confirm(`Replace current progress with ${result.attempts.length} answers? ${result.skipped} unknown or outdated answers will be skipped.`)) return;
    message(); attempts = result.attempts; save(); summarize();
  } catch (error) { message(`Import failed: ${error.message}`); }
  finally { event.target.value = ''; }
});

// Markdown viewer: #/doc/<path>[#anchor]. Documents are fetched from the same origin and rendered as DOM nodes.
const DOC_ROUTE = /^#\/doc\/([^#]+)(?:#(.*))?$/;
let docReturn = 'setup';
async function route() {
  const m = DOC_ROUTE.exec(decodeURIComponent(location.hash));
  if (!m) { if (view === 'doc') show(docReturn); return; }
  const [, path, anchor] = m;
  if (view !== 'doc') docReturn = view;
  show('doc');
  const body = $('doc-body'), raw = new URL(path, new URL('.', import.meta.url)).href;
  $('doc-raw').href = raw;
  if (body.dataset.path !== path) {
    body.dataset.path = path; body.replaceChildren(el('p', 'Loading…'));
    try {
      if (!isDocPath(path)) throw new Error('This document is not available.');
      const response = await fetch(raw);
      if (!response.ok) throw new Error(`Document not found (${response.status}).`);
      const text = await response.text();
      if (body.dataset.path !== path) return; // a newer navigation won
      const link = href => {
        if (/^https?:/.test(href)) return { href, external: true };
        if (href.startsWith('#')) return { href: `#/doc/${path}#${href.slice(1)}` };
        const [file, frag] = href.split('#');
        const target = resolveDoc(path, file);
        if (!target) return { href: new URL(file, new URL(path, new URL('.', import.meta.url))).href, external: true };
        return target.endsWith('.md') ? { href: `#/doc/${target}${frag ? '#' + frag : ''}` } : { href: new URL(target, new URL('.', import.meta.url)).href, external: true };
      };
      body.replaceChildren(renderMarkdown(text, link));
      document.title = `${body.querySelector('h1')?.textContent ?? path} · AZ-104 Practice`;
    } catch (error) { body.dataset.path = ''; body.replaceChildren(el('p', error.message, 'bg-warn p-3 text-warn-ink')); }
  }
  const target = anchor && document.getElementById(slugify(anchor)) || (anchor && document.getElementById(anchor));
  if (target) target.scrollIntoView(); else { window.scrollTo(0, 0); body.focus({ preventScroll: true }); }
}
window.addEventListener('hashchange', route);
// The version is informational; a failed lookup must not block the quiz.
try {
  const { version } = await (await fetch(new URL('./version.json', import.meta.url))).json();
  if (typeof version === 'string' && /^\d+\.\d+\.\d+/.test(version)) $('version').textContent = `Version ${version}`;
} catch { $('version').textContent = ''; }

try {
  const response = await fetch(new URL('./data.json', import.meta.url));
  if (!response.ok) throw new Error('Question data could not be loaded. Run pnpm run build.');
  bank = await response.json();
  if (bank.schemaVersion !== 1 || !Array.isArray(bank.questions)) throw new Error('Unsupported question bank.');
  bank.topics.forEach(topic => {
    const domain = bank.domains.find(d => d.id === topic.domain);
    const option = el('option', `${domain.title} › ${topic.title}`); option.value = topic.id; $('topic').append(option);
  });
  $('coverage').textContent = `${bank.questions.length} questions · ${new Set(bank.questions.map(q => q.family)).size} families · ${bank.coverage.covered}/${bank.coverage.total} objectives documented`;
  try {
    const saved = localStorage.getItem(STORAGE);
    if (saved) {
      const result = parseProgress(JSON.parse(saved), bank.questions); attempts = result.attempts;
      if (result.skipped) message(`${result.skipped} answers from unknown or changed question revisions were excluded.`);
    }
  } catch { storageWritable = false; message('Saved progress could not be read and will not be overwritten. New answers can be exported; automatic storage is disabled for this session.'); }
  summarize(); show('setup');
} catch (error) { message(error.message); $('coverage').textContent = 'Question bank unavailable.'; }
await route(); // deep links such as #/doc/knowledge/index.md work even if the question bank failed to load

import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';

export const ROOT = path.resolve(import.meta.dirname, '..');
export const readJSON = async file => JSON.parse(await readFile(path.join(ROOT, file), 'utf8'));
export async function filesUnder(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const groups = await Promise.all(entries.map(e => e.isDirectory()
    ? filesUnder(path.join(dir, e.name)) : [path.join(dir, e.name)]));
  return groups.flat().sort();
}

function assert(condition, message) { if (!condition) throw new Error(message); }
function nonempty(value) { return typeof value === 'string' && value.trim().length > 0; }
function validDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
function unique(values, label) {
  assert(values.every(nonempty) && new Set(values).size === values.length, `Invalid/duplicate ${label}`);
}

export function validateQuestion(q, topics, objectives) {
  assert(q && typeof q === 'object', 'Question must be an object');
  for (const key of ['id', 'family', 'topic', 'prompt', 'knowledge']) assert(nonempty(q[key]), `Missing ${key}`);
  assert(/^[a-z0-9-]+$/.test(q.id), `Invalid question ID ${q.id}`);
  assert(Number.isInteger(q.revision) && q.revision > 0, `${q.id}: invalid revision`);
  const topic = topics.find(t => t.id === q.topic);
  assert(topic, `${q.id}: unknown topic`);
  assert(q.knowledge === topic.path, `${q.id}: incorrect knowledge path`);
  assert(Array.isArray(q.objectives) && q.objectives.length > 0, `${q.id}: no objectives`);
  unique(q.objectives, 'question objectives');
  assert(q.objectives.every(id => objectives.has(id) && topic.objectives.includes(id)), `${q.id}: invalid objective mapping`);
  assert(['foundation', 'applied', 'troubleshooting'].includes(q.difficulty), `${q.id}: invalid difficulty`);
  assert(validDate(q.verified), `${q.id}: invalid verification date`);
  assert(Array.isArray(q.options) && q.options.length >= 4, `${q.id}: requires at least four options`);
  assert(q.options.every(o => o && nonempty(o.id) && nonempty(o.text) && nonempty(o.explanation)), `${q.id}: incomplete option`);
  unique(q.options.map(o => o.id), `${q.id} option IDs`);
  unique(q.options.map(o => o.text), `${q.id} option texts`);
  assert(Array.isArray(q.correct), `${q.id}: missing correct answers`);
  unique(q.correct, `${q.id} correct answers`);
  assert(Number.isInteger(q.select) && q.select > 0 && q.select < q.options.length
    && q.correct.length === q.select, `${q.id}: answer count mismatch`);
  assert(q.correct.every(id => q.options.some(o => o.id === id)), `${q.id}: unknown answer`);
  assert(Array.isArray(q.sources) && q.sources.length > 0, `${q.id}: no sources`);
  assert(q.sources.every(source => {
    try { const u = new URL(source); return u.protocol === 'https:' && u.hostname === 'learn.microsoft.com'; }
    catch { return false; }
  }), `${q.id}: sources must be Microsoft Learn HTTPS URLs`);
}

export async function loadContent() {
  const outline = await readJSON('exam/objectives.json');
  const topics = await readJSON('exam/topics.json');
  const objectives = outline.domains.flatMap(d => d.groups.flatMap(g => g.objectives));
  unique(objectives.map(o => o.id), 'objective IDs');
  unique(topics.map(t => t.id), 'topic IDs');
  const objectiveIDs = new Set(objectives.map(o => o.id));
  for (const topic of topics) {
    assert(nonempty(topic.title) && validDate(topic.verified), `${topic.id}: invalid metadata`);
    assert(['documented', 'lab-verified'].includes(topic.status), `${topic.id}: invalid status`);
    const domain = outline.domains.find(d => d.id === topic.domain);
    assert(domain, `${topic.id}: unknown domain`);
    const domainIDs = new Set(domain.groups.flatMap(g => g.objectives.map(o => o.id)));
    assert(topic.objectives.length > 0 && topic.objectives.every(id => domainIDs.has(id)), `${topic.id}: invalid objective mapping`);
    assert(/^knowledge\/[a-z0-9/-]+\.md$/.test(topic.path) && !topic.path.includes('..'), `${topic.id}: unsafe path`);
    await access(path.join(ROOT, topic.path));
    const md = await readFile(path.join(ROOT, topic.path), 'utf8');
    assert(md.includes(topic.id) && md.includes(topic.verified), `${topic.id}: metadata differs from Markdown`);
  }
  const questions = [];
  for (const file of await filesUnder(path.join(ROOT, 'questions'))) {
    if (!file.endsWith('.json')) continue;
    const bank = JSON.parse(await readFile(file, 'utf8'));
    assert(bank.schemaVersion === 1 && Array.isArray(bank.questions), `${file}: unsupported format`);
    for (const q of bank.questions) { validateQuestion(q, topics, objectiveIDs); questions.push(q); }
  }
  unique(questions.map(q => q.id), 'question IDs');
  const families = new Map();
  for (const q of questions) {
    assert(!families.has(q.family) || families.get(q.family) === q.topic, `${q.id}: family spans topics`);
    families.set(q.family, q.topic);
  }
  for (const topic of topics) {
    const count = new Set(questions.filter(q => q.topic === topic.id).map(q => q.family)).size;
    assert(count >= 3, `${topic.id}: documented topic needs at least three question families`);
    assert(topic.objectives.every(id => questions.some(q => q.topic === topic.id && q.objectives.includes(id))), `${topic.id}: objective has no questions`);
  }
  return { outline, topics, objectives, questions };
}

export async function validateLinks() {
  const roots = ['exam', 'knowledge', 'docs', 'templates', 'generated'];
  const files = (await Promise.all(roots.map(dir => filesUnder(path.join(ROOT, dir))))).flat();
  files.push(...['README.md', 'PLAN.md', 'STATUS.md', 'AGENTS.md'].map(p => path.join(ROOT, p)));
  for (const file of files.filter(f => f.endsWith('.md'))) {
    const content = await readFile(file, 'utf8');
    for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1];
      if (/^(https?:|#|mailto:)/.test(target)) continue;
      const resolved = path.resolve(path.dirname(file), target.split('#')[0]);
      assert(resolved.startsWith(ROOT + path.sep), `${file}: link leaves repository`);
      try { await access(resolved); } catch { throw new Error(`${path.relative(ROOT, file)}: broken link ${target}`); }
    }
  }
}

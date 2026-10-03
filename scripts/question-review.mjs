import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { ROOT, filesUnder } from './content.mjs';

const canonical = value => Array.isArray(value) ? value.map(canonical)
  : value && typeof value === 'object'
    ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])]))
    : value;
export const questionHash = value => createHash('sha256')
  .update(JSON.stringify(canonical(value))).digest('hex');
const contentHash = question => questionHash(Object.fromEntries(
  Object.entries(question).filter(([key]) => key !== 'verified')));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const ledgerPath = process.argv[2] || path.join(ROOT, 'docs/reviews/question-bank-refresh/progress.json');
const ledger = JSON.parse(await readFile(ledgerPath, 'utf8'));
assert(ledger.schemaVersion === 1, 'Unsupported review ledger version');
const topics = JSON.parse(await readFile(path.join(ROOT, 'exam/topics.json'), 'utf8'));
const questions = new Map();
for (const file of await filesUnder(path.join(ROOT, 'questions'))) {
  if (!file.endsWith('.json')) continue;
  for (const question of JSON.parse(await readFile(file, 'utf8')).questions)
    questions.set(question.id, { question, file: path.relative(ROOT, file) });
}
const seenQuestions = new Set();
const seenTopics = new Set();
let reviewed = 0, revised = 0, kept = 0;
for (const topic of ledger.topics) {
  assert(!seenTopics.has(topic.id) && topics.some(t => t.id === topic.id), `Invalid topic ${topic.id}`);
  seenTopics.add(topic.id);
  assert(['pending', 'in-progress', 'complete'].includes(topic.status), `Invalid status ${topic.id}`);
  if (topic.status === 'complete') {
    assert(topic.report && /^\d{4}-\d{2}-\d{2}$/.test(topic.verified), `Missing evidence ${topic.id}`);
    await readFile(path.join(ROOT, topic.report));
  }
  for (const entry of topic.questions) {
    assert(!seenQuestions.has(entry.id), `Duplicate ledger question ${entry.id}`);
    seenQuestions.add(entry.id);
    const current = questions.get(entry.id);
    assert(current && current.file === entry.file && current.question.topic === topic.id,
      `Question moved, missing, or not recorded correctly: ${entry.id}`);
    assert(['pending', 'kept', 'revised'].includes(entry.decision), `Invalid decision ${entry.id}`);
    if (entry.decision === 'pending') {
      assert(topic.status !== 'complete', `Incomplete question ${entry.id} in completed topic`);
      continue;
    }
    const q = current.question;
    assert(q.family === entry.family, `Family changed without ledger update: ${entry.id}`);
    assert(entry.baselineOptionIds.every(id => q.options.some(option => option.id === id)),
      `Stable option ID missing: ${entry.id}`);
    assert(q.revision === entry.reviewedRevision && questionHash(q) === entry.reviewedHash,
      `Review stale; recheck changed question ${entry.id}`);
    if (entry.decision === 'kept') {
      assert(q.revision === entry.baselineRevision && contentHash(q) === entry.baselineContentHash,
        `A kept question has substantive edits: ${entry.id}`);
      kept++;
    } else {
      assert(q.revision > entry.baselineRevision, `Revised question needs revision increment: ${entry.id}`);
      revised++;
    }
    reviewed++;
  }
}
assert(seenQuestions.size === questions.size && [...questions.keys()].every(id => seenQuestions.has(id)),
  'Review ledger does not cover the current bank; reconcile added/removed IDs before resuming');
assert(seenTopics.size === topics.length, 'Review ledger does not cover every topic');
const complete = ledger.topics.filter(t => t.status === 'complete').length;
console.log(`Reviewed ${reviewed}/${questions.size} questions: ${revised} revised, ${kept} kept. Topics ${complete}/${topics.length} complete.`);
const next = ledger.topics.find(t => t.status !== 'complete');
console.log(next ? `Next: ${next.id} (${next.title}; ${next.status})` : 'Review complete; check publication status.');
console.log(`Branch: ${ledger.branch}; merged: ${ledger.publication.merged}; deployed: ${ledger.publication.deployed}`);

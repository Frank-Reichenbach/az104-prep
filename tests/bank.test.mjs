import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ROOT, loadContent, validateLinks } from '../scripts/content.mjs';
import { score } from '../app/quiz.mjs';

const { topics, objectives, questions } = await loadContent();
const bank = JSON.parse(await readFile(path.join(ROOT, 'app/data.json'), 'utf8'));

test('generated app data matches the authored question bank', () => {
  assert.deepEqual(bank.questions, questions);
  assert.deepEqual(bank.topics, topics);
  assert.equal(bank.coverage.total, objectives.length);
});

test('every question is answerable only by its declared correct option IDs', () => {
  for (const q of questions) {
    assert.equal(score(q, q.correct), true, q.id);
    for (const option of q.options.filter(o => !q.correct.includes(o.id)))
      assert.equal(score(q, [option.id]), false, `${q.id}/${option.id}`);
    assert.equal(score(q, q.options.map(o => o.id)), false, q.id);
  }
});

test('variants of one family share topic and answer count', () => {
  const families = Map.groupBy(questions, q => q.family);
  for (const [family, variants] of families) {
    for (const v of variants) {
      assert.equal(v.topic, variants[0].topic, family);
      assert.equal(v.select, variants[0].select, family);
    }
  }
});

test('every exam domain has questions and every topic file is referenced by its questions', () => {
  const topicDomains = new Map(topics.map(t => [t.id, t.domain]));
  for (const d of bank.domains)
    assert.ok(questions.some(q => topicDomains.get(q.topic) === d.id), `${d.id} has no questions`);
  for (const t of topics) assert.ok(questions.every(q => q.topic !== t.id || q.knowledge === t.path));
});

test('internal Markdown links resolve', async () => {
  await validateLinks();
});

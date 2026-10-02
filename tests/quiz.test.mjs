import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { makeQuiz, score, shuffle, parseProgress, missedFamilies, familyStatus, reviewFamilies } from '../app/quiz.mjs';

const { questions } = JSON.parse(await readFile(new URL('../questions/storage/blob-storage.json', import.meta.url), 'utf8'));
const single = questions.find(q => q.select === 1);
const multi = questions.find(q => q.select === 2);
const record = (q, selected, at = '2026-10-01T12:00:00.000Z') => ({ id: q.id, revision: q.revision, selected, at });

test('multiple-answer grading requires the entire set and rejects extras or duplicate IDs', () => {
  assert.equal(score(multi, [...multi.correct].reverse()), true);
  assert.equal(score(multi, multi.correct.slice(0, 1)), false);
  assert.equal(score(multi, [...multi.correct, multi.options.find(o => !multi.correct.includes(o.id)).id]), false);
  assert.equal(score(multi, [multi.correct[0], multi.correct[0]]), false);
});

test('correct option IDs survive shuffling without mutating the source', () => {
  const before = JSON.stringify(questions);
  const quiz = makeQuiz(questions, { count: 100 }, () => 0.2);
  for (const q of quiz) assert.equal(score(q, q.correct), true);
  assert.equal(JSON.stringify(questions), before);
  assert.deepEqual(shuffle([1, 2, 3], () => 0), [2, 3, 1]);
});

test('quiz length is bounded by unique families, and only one reviewed variant is included', () => {
  const quiz = makeQuiz(questions, { count: 100 });
  assert.equal(quiz.length, new Set(questions.map(q => q.family)).size);
  assert.equal(new Set(quiz.map(q => q.family)).size, quiz.length);
  assert.equal(quiz.filter(q => q.family === 'st-life-prefix').length, 1);
});

test('topic and missed filters are applied together; empty review is explicit', () => {
  const missed = new Set([single.family]);
  assert.equal(makeQuiz(questions, { topic: single.topic, missed }).length, 1);
  assert.equal(makeQuiz(questions, { topic: 'storage.blobs.lifecycle', missed }).length, 0);
  assert.equal(makeQuiz(questions, { missed: new Set() }).length, 0);
  assert.throws(() => makeQuiz(questions, { count: -1 }));
  assert.throws(() => makeQuiz(questions, { count: 1.5 }));
});

test('mixed sessions approximate normalized domain ranges without duplicate families', async () => {
  const bank = JSON.parse(await readFile(new URL('../app/data.json', import.meta.url), 'utf8'));
  const before = JSON.stringify(bank);
  const quiz = makeQuiz(bank.questions, { topic: 'weighted', count: 100,
    domains: bank.domains, topics: bank.topics }, () => 0.4);
  assert.equal(quiz.length, 100);
  assert.equal(new Set(quiz.map(q => q.family)).size, 100);
  const domainFor = new Map(bank.topics.map(t => [t.id, t.domain]));
  const total = bank.domains.reduce((sum, d) => sum + (d.weight[0] + d.weight[1]) / 2, 0);
  for (const d of bank.domains) {
    const actual = quiz.filter(q => domainFor.get(q.topic) === d.id).length;
    const target = 100 * (d.weight[0] + d.weight[1]) / 2 / total;
    assert.ok(Math.abs(actual - target) < 1, `${d.id}: ${actual} differs from ${target}`);
  }
  assert.equal(JSON.stringify(bank), before);
});

test('mixed missed review fills available capacity even when a domain is scarce', () => {
  const pool = Array.from({ length: 6 }, (_, i) => ({ ...single, id: `case-${i}`,
    family: `family-${i}`, topic: i === 0 ? 'high.topic' : 'low.topic' }));
  pool.push({ ...pool[0], id: 'reviewed-variant' });
  const options = { topic: 'weighted', count: 20,
    domains: [{ id: 'high', weight: [80, 90] }, { id: 'low', weight: [10, 20] }],
    topics: [{ id: 'high.topic', domain: 'high' }, { id: 'low.topic', domain: 'low' }],
    missed: new Set(['family-0', 'family-1', 'family-2']) };
  const quiz = makeQuiz(pool, options, () => 0.2);
  assert.equal(quiz.length, 3);
  assert.deepEqual(new Set(quiz.map(q => q.family)), options.missed);
  assert.equal(makeQuiz(pool, { ...options, missed: new Set() }).length, 0);
  assert.throws(() => makeQuiz(pool, { ...options, topics: [] }), /Missing exam domain/);
  assert.throws(() => makeQuiz(pool, { ...options, domains: [] }), /valid exam domain weights/);
});

test('extra variants do not increase a family\'s chance in weighted selection', () => {
  const pool = [{ ...single, family: 'one-version' },
    ...Array.from({ length: 21 }, (_, i) => ({ ...single, id: `variant-${i}`, family: 'many-versions' }))];
  let seed = 104;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32; };
  let chosen = 0;
  for (let i = 0; i < 1000; i++) {
    const [q] = makeQuiz(pool, { topic: 'weighted', count: 1,
      domains: [{ id: 'storage', weight: [15, 20] }],
      topics: [{ id: single.topic, domain: 'storage' }] }, random);
    chosen += q.family === 'many-versions';
  }
  assert.ok(chosen > 400 && chosen < 600, `Expected similar family likelihood, got ${chosen}/1000`);
});

test('missed review uses latest family result, including across variants and unordered history', () => {
  const variants = questions.filter(q => q.family === 'st-life-prefix');
  const wrong = variants[0].options.find(o => !variants[0].correct.includes(o.id)).id;
  const older = record(variants[0], [wrong], '2026-10-01T10:00:00.000Z');
  const newer = record(variants[1], variants[1].correct, '2026-10-01T11:00:00.000Z');
  assert.equal(missedFamilies([older], questions).has(variants[0].family), true);
  assert.equal(missedFamilies([newer, older], questions).size, 0);
});

test('import keeps valid answers, discards stale IDs/revisions, and ignores claimed scores', () => {
  const input = { version: 1, attempts: [
    { ...record(single, single.correct), correct: false },
    { ...record(single, single.correct), id: 'retired-question' },
    { ...record(single, single.correct), revision: 999 }
  ] };
  const result = parseProgress(input, questions);
  assert.equal(result.skipped, 2);
  assert.equal(result.attempts.length, 1);
  assert.equal(Object.hasOwn(result.attempts[0], 'correct'), false);
  assert.equal(score(single, result.attempts[0].selected), true);
});

test('import rejects malformed records rather than corrupting current progress', () => {
  for (const attempt of [
    { ...record(single, single.correct), selected: ['not-an-option'] },
    { ...record(single, single.correct), selected: [] },
    { ...record(single, single.correct), at: 'yesterday' },
    { ...record(multi, multi.correct), selected: [multi.correct[0], multi.correct[0]] },
    null
  ]) assert.throws(() => parseProgress({ version: 1, attempts: [attempt] }, questions));
  assert.throws(() => parseProgress({ version: 2, attempts: [] }, questions));
  assert.throws(() => parseProgress({ version: 1, attempts: Array(10001).fill(record(single, single.correct)) }, questions));
});

test('unsure attempts are tracked per family and cleared by a later correct answer', () => {
  const unsure = { ...record(single, [], '2026-10-01T12:00:00.000Z'), unsure: true };
  assert.equal(familyStatus([unsure], questions).get(single.family), 'unsure');
  assert.equal(reviewFamilies([unsure], questions, 'unsure').has(single.family), true);
  assert.equal(missedFamilies([unsure], questions).has(single.family), false);
  assert.equal(reviewFamilies([unsure], questions, 'both').has(single.family), true);
  const fixed = [unsure, record(single, single.correct, '2026-10-02T12:00:00.000Z')];
  assert.equal(familyStatus(fixed, questions).get(single.family), 'correct');
  assert.equal(reviewFamilies(fixed, questions, 'both').size, 0);
});

test('progress import accepts unsure attempts and old exports, rejects inconsistent ones', () => {
  const unsure = { ...record(single, []), unsure: true };
  assert.equal(parseProgress({ version: 1, attempts: [unsure] }, questions).attempts[0].unsure, true);
  assert.equal(parseProgress({ version: 1, attempts: [record(single, single.correct)] }, questions).attempts[0].unsure, undefined);
  assert.throws(() => parseProgress({ version: 1, attempts: [{ ...unsure, selected: single.correct }] }, questions));
  assert.throws(() => parseProgress({ version: 1, attempts: [{ ...unsure, unsure: 'yes' }] }, questions));
  assert.throws(() => parseProgress({ version: 1, attempts: [record(single, [])] }, questions));
});

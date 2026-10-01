import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { makeQuiz, score, shuffle, parseProgress, missedFamilies } from '../app/quiz.mjs';

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

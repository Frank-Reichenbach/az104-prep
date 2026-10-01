import test from 'node:test';
import assert from 'node:assert/strict';
import { loadContent, validateQuestion } from '../scripts/content.mjs';

const { topics, objectives, questions } = await loadContent();
const ids = new Set(objectives.map(o => o.id));

test('published inventory includes all five domains and 82 task bullets', () => {
  assert.equal(objectives.length, 82);
  assert.equal(new Set(objectives.map(o => o.id)).size, 82);
});

test('question validation rejects unanswerable or unsupported scored content', () => {
  const mutations = [
    q => { q.select = 2; },
    q => { q.correct = ['missing']; },
    q => { q.options[0].explanation = ''; },
    q => { q.options[1].id = q.options[0].id; },
    q => { q.sources = []; },
    q => { q.sources = ['https://example.com/advice']; },
    q => { q.knowledge = '../outside.md'; },
    q => { q.objectives = ['not-an-objective']; },
    q => { q.verified = '2026-02-30'; }
  ];
  for (const mutate of mutations) {
    const q = structuredClone(questions[0]); mutate(q);
    assert.throws(() => validateQuestion(q, topics, ids));
  }
});

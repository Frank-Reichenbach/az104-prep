export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function score(question, selected) {
  const ids = new Set(selected);
  return selected.length === ids.size && ids.size === question.correct.length
    && question.correct.every(id => ids.has(id));
}

export function makeQuiz(questions, { topic = 'all', count = 10, missed = null } = {}, random = Math.random) {
  if (!Number.isInteger(count) || count < 1) throw new Error('Choose a positive whole-number quiz length.');
  const pool = questions.filter(q => (topic === 'all' || q.topic === topic)
    && (!missed || missed.has(q.family)));
  const families = new Map();
  for (const q of shuffle(pool, random)) if (!families.has(q.family)) families.set(q.family, q);
  return shuffle([...families.values()], random).slice(0, count)
    .map(q => ({ ...q, options: shuffle(q.options, random) }));
}

export function missedFamilies(attempts, questions) {
  const bank = new Map(questions.map(q => [q.id, q]));
  const latest = new Map();
  for (const attempt of attempts) {
    const q = bank.get(attempt.id);
    if (!q || attempt.revision !== q.revision) continue;
    const previous = latest.get(q.family);
    if (!previous || attempt.at >= previous.at) latest.set(q.family, { ...attempt, q });
  }
  return new Set([...latest.entries()].filter(([, a]) => !score(a.q, a.selected)).map(([family]) => family));
}

export function parseProgress(input, questions) {
  if (!input || input.version !== 1 || !Array.isArray(input.attempts) || input.attempts.length > 10000)
    throw new Error('Expected a version 1 progress export with at most 10,000 attempts.');
  const bank = new Map(questions.map(q => [q.id, q]));
  const attempts = [];
  let skipped = 0;
  for (const a of input.attempts) {
    if (!a || typeof a.id !== 'string' || !Number.isInteger(a.revision)
      || !Array.isArray(a.selected) || !a.selected.every(id => typeof id === 'string')
      || typeof a.at !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(a.at) || !Number.isFinite(Date.parse(a.at)))
      throw new Error('An attempt has an invalid ID, revision, selection, or timestamp.');
    const q = bank.get(a.id);
    if (!q || q.revision !== a.revision) { skipped++; continue; }
    if (a.selected.length !== q.select || new Set(a.selected).size !== a.selected.length
      || a.selected.some(id => !q.options.some(o => o.id === id)))
      throw new Error(`Invalid answer selection for ${q.id}.`);
    attempts.push({ id: a.id, revision: a.revision, selected: [...a.selected], at: new Date(a.at).toISOString() });
  }
  return { attempts, skipped };
}

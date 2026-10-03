// AZ-104 format: Microsoft publishes no fixed question count ("typically 40-60"), and 100 minutes for
// associate exams without labs (120 with labs). 50 questions / 100 minutes = 2 minutes per question.
// https://learn.microsoft.com/credentials/support/exam-duration-exam-experience
export const EXAM_DEFAULTS = { count: 50, minutesPerQuestion: 2 };
export const PRACTICE_DEFAULT_COUNT = 10;
export const examMinutes = count => Math.max(1, Math.round(count * EXAM_DEFAULTS.minutesPerQuestion));

export function formatClock(totalSeconds) {
  const s = Math.max(0, Math.ceil(totalSeconds));
  const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
  const two = n => String(n).padStart(2, '0');
  return h ? `${h}:${two(m)}:${two(sec)}` : `${two(m)}:${two(sec)}`;
}

// Display-only split of a question prompt: scenario sentences plus the final sentence (the task).
// Joining the parts with a single space always reproduces the prompt; otherwise it is not split.
export function splitPrompt(prompt) {
  const parts = prompt.split(/(?<=[.!?])\s+(?=[A-Z`"'(])/);
  if (parts.length < 2 || parts.join(' ') !== prompt) return { scenario: [], task: prompt };
  return { scenario: parts.slice(0, -1), task: parts.at(-1) };
}
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

export function makeQuiz(questions, { topic = 'all', count = 10, missed = null, domains = [], topics = [] } = {}, random = Math.random) {
  if (!Number.isInteger(count) || count < 1) throw new Error('Choose a positive whole-number quiz length.');
  const pool = questions.filter(q => (topic === 'all' || topic === 'weighted' || q.topic === topic)
    && (!missed || missed.has(q.family)));
  const families = new Map();
  for (const q of shuffle(pool, random)) if (!families.has(q.family)) families.set(q.family, q);
  // Shuffle unique families before allocating; extra variants must not make
  // their family more likely to occupy an early slot in a domain bucket.
  let selected = shuffle([...families.values()], random);
  if (topic === 'weighted') {
    if (!domains.length || new Set(domains.map(d => d.id)).size !== domains.length
      || domains.some(d => !Array.isArray(d.weight) || d.weight.length !== 2
        || d.weight.some(w => !Number.isFinite(w) || w <= 0) || d.weight[0] > d.weight[1]))
      throw new Error('Mixed sessions require valid exam domain weights.');
    const topicDomains = new Map(topics.map(t => [t.id, t.domain]));
    const buckets = shuffle(domains.map(d => ({ id: d.id, weight: (d.weight[0] + d.weight[1]) / 2,
      questions: [], selected: 0 })), random);
    for (const q of selected) {
      const bucket = buckets.find(b => b.id === topicDomains.get(q.topic));
      if (!bucket) throw new Error(`Missing exam domain for ${q.id}.`);
      bucket.questions.push(q);
    }
    const available = buckets.filter(b => b.questions.length);
    const totalWeight = available.reduce((sum, b) => sum + b.weight, 0);
    const size = Math.min(count, selected.length);
    selected = [];
    // Allocate whole questions by the largest gap from the normalized target.
    // Exhausted domains are skipped, so a restricted/missed pool still fills.
    while (selected.length < size) {
      const candidates = available.filter(b => b.selected < b.questions.length);
      candidates.sort((a, b) => (size * b.weight / totalWeight - b.selected)
        - (size * a.weight / totalWeight - a.selected));
      const bucket = candidates[0];
      selected.push(bucket.questions[bucket.selected++]);
    }
  }
  return shuffle(selected, random).slice(0, count)
    .map(q => ({ ...q, options: shuffle(q.options, random) }));
}

export const isUnsure = attempt => attempt.unsure === true;

// Latest attempt per family (same revision only) -> 'correct' | 'wrong' | 'unsure'.
export function familyStatus(attempts, questions) {
  const bank = new Map(questions.map(q => [q.id, q]));
  const latest = new Map();
  for (const attempt of attempts) {
    const q = bank.get(attempt.id);
    if (!q || attempt.revision !== q.revision) continue;
    const previous = latest.get(q.family);
    if (!previous || attempt.at >= previous.at) latest.set(q.family, { ...attempt, q });
  }
  return new Map([...latest.entries()].map(([family, a]) =>
    [family, isUnsure(a) ? 'unsure' : score(a.q, a.selected) ? 'correct' : 'wrong']));
}

// kind: 'wrong' | 'unsure' | 'both'
export function reviewFamilies(attempts, questions, kind = 'wrong') {
  const wanted = kind === 'both' ? ['wrong', 'unsure'] : [kind];
  return new Set([...familyStatus(attempts, questions)].filter(([, s]) => wanted.includes(s)).map(([family]) => family));
}

export const missedFamilies = (attempts, questions) => reviewFamilies(attempts, questions, 'wrong');

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
    if (a.unsure !== undefined && a.unsure !== true) throw new Error('An attempt has an invalid unsure flag.');
    const q = bank.get(a.id);
    if (!q || q.revision !== a.revision) { skipped++; continue; }
    if (a.unsure) {
      if (a.selected.length) throw new Error(`Unsure answer for ${q.id} must not include selections.`);
      attempts.push({ id: a.id, revision: a.revision, selected: [], unsure: true, at: new Date(a.at).toISOString() });
      continue;
    }
    if (a.selected.length !== q.select || new Set(a.selected).size !== a.selected.length
      || a.selected.some(id => !q.options.some(o => o.id === id)))
      throw new Error(`Invalid answer selection for ${q.id}.`);
    attempts.push({ id: a.id, revision: a.revision, selected: [...a.selected], at: new Date(a.at).toISOString() });
  }
  return { attempts, skipped };
}

// Per-domain and per-topic results from the latest attempt of each family (same revision only).
// An "unsure" answer counts as answered but not correct. `rate` is null until something was answered.
export function topicStats(attempts, questions, topics, domains) {
  const status = familyStatus(attempts, questions);
  const topicOf = new Map(topics.map(t => [t.id, t]));
  const seen = new Set();
  const unit = (id, title, domain) => ({ id, title, domain, answered: 0, correct: 0, rate: null });
  const byTopic = new Map(topics.map(t => [t.id, unit(t.id, t.title, t.domain)]));
  const byDomain = new Map(domains.map(d => [d.id, unit(d.id, d.title, d.id)]));
  for (const q of questions) {
    if (seen.has(q.family) || !status.has(q.family)) continue;
    seen.add(q.family);
    const topic = topicOf.get(q.topic);
    if (!topic) continue;
    const good = status.get(q.family) === 'correct';
    for (const u of [byTopic.get(topic.id), byDomain.get(topic.domain)]) {
      if (!u) continue;
      u.answered++; if (good) u.correct++;
    }
  }
  const finish = u => ({ ...u, rate: u.answered ? u.correct / u.answered : null });
  return { byDomain: [...byDomain.values()].map(finish), byTopic: [...byTopic.values()].map(finish) };
}

// Joins a test's stats with the earlier learning state. `delta` is in percentage points and stays
// null when either side has fewer than `minAnswers` answers, so tiny samples do not look like trends.
export function compareStats(session, baseline, minAnswers = 3) {
  const before = new Map(baseline.map(u => [u.id, u]));
  return session.filter(u => u.answered > 0).map(u => {
    const base = before.get(u.id);
    const enough = base && base.answered >= minAnswers && u.answered >= minAnswers;
    return { ...u, baseline: base?.rate ?? null, baselineAnswered: base?.answered ?? 0,
      delta: enough ? Math.round((u.rate - base.rate) * 100) : null };
  });
}

// Weakest first: lowest hit rate; ties broken by the larger sample.
export function weakest(units, minAnswers = 3) {
  return units.filter(u => u.answered >= minAnswers)
    .sort((a, b) => a.rate - b.rate || b.answered - a.answered || a.title.localeCompare(b.title));
}

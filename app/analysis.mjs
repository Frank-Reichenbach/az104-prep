import { topicStats, compareStats, weakest } from './quiz.mjs';

// Analysis charts (Chart.js, vendored in ./vendor and loaded on first use).
// mode 'compare': this test vs. the learning state before it (session results).
// mode 'weakest': the weakest areas of the whole study history (analysis page).
const MIN_ANSWERS = 3;
const mounted = new Map(); // root element -> { options, charts }
let chartLoad;

function loadChart() {
  if (window.Chart) return Promise.resolve(window.Chart);
  chartLoad ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL('./vendor/chart.umd.js', import.meta.url).href;
    script.onload = () => resolve(window.Chart);
    script.onerror = () => { chartLoad = undefined; reject(new Error('The chart library could not be loaded.')); };
    document.head.append(script);
  });
  return chartLoad;
}

const token = (name, fallback) => getComputedStyle(document.documentElement).getPropertyValue(`--color-${name}`).trim() || fallback;
const palette = () => ({ ink: token('ink', '#182d3d'), soft: token('soft', '#4f626e'), line: token('line', '#d4dfe5'),
  brand: token('brand', '#086b80'), edge: token('edge', '#bdcdd5'), bad: token('bad', '#a24824') });

function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
const pct = rate => rate === null ? '–' : `${Math.round(rate * 100)}%`;
const shorten = (text, max = 34) => text.length > max ? `${text.slice(0, max - 1)}…` : text;
const signed = delta => delta === null ? 'not enough data' : delta > 0 ? `▲ +${delta} pp` : delta < 0 ? `▼ ${delta} pp` : '– no change';

// Rows for the current scope: domains, or the topics of one domain.
function rowsFor({ bank, attempts, baselineCount, mode }, scope) {
  const level = stats => scope === 'domains' ? stats.byDomain : stats.byTopic.filter(t => t.domain === scope);
  if (mode === 'compare') {
    const session = level(topicStats(attempts.slice(baselineCount), bank.questions, bank.topics, bank.domains));
    const baseline = level(topicStats(attempts.slice(0, baselineCount), bank.questions, bank.topics, bank.domains));
    return compareStats(session, baseline, MIN_ANSWERS);
  }
  return weakest(level(topicStats(attempts, bank.questions, bank.topics, bank.domains)), MIN_ANSWERS).slice(0, 15);
}

function table(mode, rows) {
  const t = el('table', undefined, 'my-2 w-full border-collapse text-[.86rem]');
  const head = mode === 'compare' ? ['Area', 'This test', 'Before', 'Change'] : ['Area', 'Answered', 'Correct', 'Error rate'];
  const tr = el('tr'); head.forEach(h => { const th = el('th', h, 'border-b border-line p-1.5 text-left'); th.scope = 'col'; tr.append(th); });
  t.append(el('thead')); t.tHead.append(tr);
  const body = el('tbody');
  for (const r of rows) {
    const cells = mode === 'compare'
      ? [r.title, `${pct(r.rate)} (${r.correct}/${r.answered})`, r.baseline === null ? 'no earlier answers' : `${pct(r.baseline)} (${r.baselineAnswered})`, signed(r.delta)]
      : [r.title, r.answered, r.correct, pct(1 - r.rate)];
    const row = el('tr'); cells.forEach((c, i) => row.append(el(i ? 'td' : 'th', String(c), 'border-b border-line p-1.5 text-left'))); body.append(row);
  }
  t.append(body);
  return t;
}

function datasets(mode, rows, colors) {
  if (mode === 'weakest')
    return [{ label: 'Error rate (%)', data: rows.map(r => Math.round((1 - r.rate) * 100)), backgroundColor: colors.bad, borderRadius: 3 }];
  const sets = [{ label: 'This test (% correct)', data: rows.map(r => Math.round(r.rate * 100)), backgroundColor: colors.brand, borderRadius: 3 }];
  if (rows.some(r => r.baseline !== null))
    sets.unshift({ label: 'Before this test (% correct)', data: rows.map(r => r.baseline === null ? null : Math.round(r.baseline * 100)), backgroundColor: colors.edge, borderRadius: 3 });
  return sets;
}

async function draw(root) {
  const state = mounted.get(root); if (!state) return;
  const { options, ui } = state, { mode } = options;
  const rows = rowsFor(options, ui.select.value);
  state.chart?.destroy(); state.chart = null;
  ui.table.replaceChildren(); ui.canvasBox.hidden = rows.length === 0; ui.details.hidden = rows.length === 0;
  ui.empty.hidden = rows.length > 0;
  if (!rows.length) {
    ui.empty.textContent = mode === 'compare' ? 'No answers in this selection to chart.'
      : `Not enough answers yet. A topic needs at least ${MIN_ANSWERS} answered question families before it appears here; practise a few sessions first.`;
    ui.summary.textContent = ''; return;
  }
  ui.table.append(table(mode, rows));
  ui.details.open = mode === 'compare'; // the change column is the point of the comparison
  ui.summary.textContent = mode === 'compare'
    ? rows.map(r => `${r.title}: ${pct(r.rate)} in this test${r.baseline === null ? '' : `, ${pct(r.baseline)} before, ${signed(r.delta)}`}.`).join(' ')
    : `Weakest areas: ${rows.slice(0, 5).map(r => `${r.title} ${pct(1 - r.rate)} error rate`).join('; ')}.`;
  ui.canvas.setAttribute('aria-label', `${mode === 'compare' ? 'Hit rate per area: this test compared with earlier answers' : 'Error rate of the weakest areas'}. A data table follows.`);
  ui.canvasBox.style.height = `${Math.max(180, rows.length * (mode === 'compare' ? 58 : 34) + 70)}px`;
  let Chart;
  try { Chart = await loadChart(); } catch (error) { ui.empty.hidden = false; ui.empty.textContent = `${error.message} The data table below still shows the values.`; ui.canvasBox.hidden = true; ui.details.open = true; return; }
  if (state.chart || !mounted.has(root)) return;
  const colors = palette();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  state.chart = new Chart(ui.canvas, {
    type: 'bar',
    data: { labels: rows.map(r => shorten(r.title)), datasets: datasets(mode, rows, colors) },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false, animation: reduced ? false : undefined,
      scales: {
        x: { min: 0, max: 100, ticks: { color: colors.soft, callback: v => `${v}%` }, grid: { color: colors.line } },
        y: { ticks: { color: colors.ink }, grid: { display: false } },
      },
      plugins: {
        legend: { display: mode === 'compare', labels: { color: colors.ink } },
        tooltip: { callbacks: { label: c => `${c.dataset.label}: ${c.parsed.x}%` } },
      },
    },
  });
}

// Builds (or rebuilds) the analysis UI inside `root`.
// options: { bank, attempts, mode: 'compare' | 'weakest', baselineCount (compare only: attempts before the test) }
export function renderAnalysis(root, options) {
  unmount(root);
  const id = `${root.id || 'analysis'}-scope`;
  const label = el('label', 'Show', 'mr-2 font-semibold'); label.htmlFor = id;
  const select = el('select', undefined, 'field inline-block w-auto max-w-full'); select.id = id;
  select.append(new Option('All exam domains', 'domains'));
  for (const d of options.bank.domains) select.append(new Option(`Topics in ${d.title}`, d.id));
  const canvas = el('canvas'); canvas.setAttribute('role', 'img');
  const canvasBox = el('div', undefined, 'relative my-3'); canvasBox.append(canvas);
  const summary = el('p', undefined, 'sr-only'); summary.setAttribute('role', 'status');
  const empty = el('p', undefined, 'my-3 bg-notice p-3'); empty.hidden = true;
  const tableBox = el('div');
  const details = el('details'); details.append(el('summary', 'Show the data as a table', 'cursor-pointer text-[.86rem]'), tableBox);
  root.replaceChildren(el('div', undefined, 'my-3'), canvasBox, summary, empty, details);
  root.firstChild.append(label, select);
  const ui = { select, canvas, canvasBox, summary, empty, details, table: tableBox };
  mounted.set(root, { options, ui, chart: null });
  select.addEventListener('change', () => draw(root));
  return draw(root);
}

export function unmount(root) {
  mounted.get(root)?.chart?.destroy();
  mounted.delete(root);
}

// Charts take their colours at draw time, so redraw when the theme switches.
new MutationObserver(() => { for (const root of mounted.keys()) if (root.offsetParent !== null) draw(root); })
  .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

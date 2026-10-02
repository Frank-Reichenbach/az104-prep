// Minimal, dependency-free Markdown viewer for the repository's own documents.
// Builds DOM nodes with textContent only; raw HTML in source is never interpreted.

const DOC_PATH = /^(?:(?:knowledge|generated|questions|examples|exam|docs|templates)\/[a-zA-Z0-9_/-]+|README|PLAN|STATUS|CHANGELOG)\.(?:md|json)$/;

export function isDocPath(path) { return DOC_PATH.test(path); }

// Resolve a link relative to the current document. Returns a doc path, or null if outside the allowlist.
export function resolveDoc(from, href) {
  const parts = from.split('/').slice(0, -1);
  for (const seg of href.split('/')) {
    if (seg === '..') parts.pop();
    else if (seg !== '.' && seg !== '') parts.push(seg);
  }
  const path = parts.join('/');
  return isDocPath(path) ? path : null;
}

export function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

// Inline tokens: code, link, strong, em, text.
export function parseInline(text) {
  const out = [];
  const re = /`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|(?<![\w*])\*([^*\s][^*]*)\*(?![\w*])|(?<![\w_])_([^_\s][^_]*)_(?![\w_])/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ type: 'text', text: text.slice(last, m.index) });
    if (m[1] !== undefined) out.push({ type: 'code', text: m[1] });
    else if (m[2] !== undefined) out.push({ type: 'link', text: m[2], href: m[3] });
    else if (m[4] !== undefined) out.push({ type: 'strong', text: m[4] });
    else out.push({ type: 'em', text: m[5] ?? m[6] });
    last = re.lastIndex;
  }
  if (last < text.length) out.push({ type: 'text', text: text.slice(last) });
  return out;
}

const splitRow = line => line.trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map(c => c.trim().replace(/\\\|/g, '|'));
const isTableSep = line => /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(line) && line.includes('-');
const LIST = /^(\s*)([-*+]|\d+\.)\s+(.*)$/;

// Block tokens from source lines.
export function parseBlocks(source) {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const blocks = [];
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const fence = line.match(/^(\s*)(```|~~~)\s*(\S*)/);
    if (fence) {
      const body = []; i++;
      while (i < lines.length && !lines[i].trim().startsWith(fence[2])) {
        body.push(lines[i].startsWith(fence[1]) ? lines[i].slice(fence[1].length) : lines[i]); i++;
      }
      i++; blocks.push({ type: 'code', lang: fence[3], text: body.join('\n') }); continue;
    }
    if (line.trim().startsWith('<!--')) { while (i < lines.length && !lines[i].includes('-->')) i++; i++; continue; }
    const heading = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (heading) { blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] }); i++; continue; }
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) { blocks.push({ type: 'hr' }); i++; continue; }
    if (line.includes('|') && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const head = splitRow(line), rows = []; i += 2;
      while (i < lines.length && lines[i].trim() && lines[i].includes('|')) rows.push(splitRow(lines[i++]));
      blocks.push({ type: 'table', head, rows }); continue;
    }
    if (/^\s*>/.test(line)) {
      const body = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) body.push(lines[i++].replace(/^\s*>\s?/, ''));
      blocks.push({ type: 'quote', blocks: parseBlocks(body.join('\n')) }); continue;
    }
    if (LIST.test(line)) {
      const items = [], base = line.match(LIST)[1].length, ordered = /\d/.test(line.match(LIST)[2]);
      while (i < lines.length) {
        const m = lines[i].match(LIST);
        if (m && m[1].length === base) {
          items.push({ text: m[3], children: [] }); i++;
        } else if (m && m[1].length > base && items.length) {
          const sub = [];
          while (i < lines.length && (LIST.test(lines[i]) ? lines[i].match(LIST)[1].length > base : /^\s+\S/.test(lines[i]) && !lines[i].match(LIST))) sub.push(lines[i++]);
          const nested = sub.filter(l => LIST.test(l));
          if (nested.length) items.at(-1).children.push(...parseBlocks(nested.join('\n')));
          const cont = sub.filter(l => !LIST.test(l)).map(l => l.trim());
          if (cont.length) items.at(-1).text += ' ' + cont.join(' ');
        } else if (/^\s+\S/.test(lines[i]) && !m && items.length) {
          items.at(-1).text += ' ' + lines[i++].trim();
        } else break;
      }
      blocks.push({ type: 'list', ordered, items }); continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|\s*(```|~~~)|\s*>|\s*<!--)/.test(lines[i]) && !LIST.test(lines[i]) && !(lines[i].includes('|') && isTableSep(lines[i + 1] ?? ''))) para.push(lines[i++].trim());
    if (!para.length) { para.push(lines[i++]); }
    blocks.push({ type: 'paragraph', text: para.join(' ') });
  }
  return blocks;
}

// Render to DOM. `link(href)` maps a markdown href to { href, external } for the host app.
export function renderMarkdown(source, link, doc = document) {
  const make = (tag, className) => { const n = doc.createElement(tag); if (className) n.className = className; return n; };
  const inline = (parent, text) => {
    for (const t of parseInline(text)) {
      if (t.type === 'text') parent.append(doc.createTextNode(t.text));
      else if (t.type === 'link') {
        const a = make('a'); a.append(...inlineNodes(t.text)); const target = link(t.href);
        if (target) { a.href = target.href; if (target.external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } }
        parent.append(a);
      } else { const n = make(t.type); n.append(...inlineNodes(t.text, t.type !== 'code')); parent.append(n); }
    }
  };
  const inlineNodes = (text, parse = true) => {
    if (!parse) return [doc.createTextNode(text)];
    const holder = make('span'); inline(holder, text); return [...holder.childNodes];
  };
  const build = (blocks, parent) => {
    for (const b of blocks) {
      let n;
      if (b.type === 'heading') { n = make(`h${b.level}`); n.id = slugify(b.text.replace(/[`*_]/g, '')); inline(n, b.text); }
      else if (b.type === 'paragraph') { n = make('p'); inline(n, b.text); }
      else if (b.type === 'hr') n = make('hr');
      else if (b.type === 'code') { n = make('pre'); const c = make('code'); c.textContent = b.text; n.append(c); }
      else if (b.type === 'quote') { n = make('blockquote'); build(b.blocks, n); }
      else if (b.type === 'list') {
        n = make(b.ordered ? 'ol' : 'ul');
        for (const item of b.items) { const li = make('li'); inline(li, item.text); build(item.children, li); n.append(li); }
      } else if (b.type === 'table') {
        const wrap = make('div', 'md-table'); n = make('table'); const tr = make('tr');
        for (const h of b.head) { const th = make('th'); inline(th, h); tr.append(th); }
        const thead = make('thead'); thead.append(tr); const tbody = make('tbody');
        for (const row of b.rows) { const r = make('tr'); for (const c of row) { const td = make('td'); inline(td, c); r.append(td); } tbody.append(r); }
        n.append(thead, tbody); wrap.append(n); n = wrap;
      }
      parent.append(n);
    }
  };
  const root = doc.createDocumentFragment();
  build(parseBlocks(source), root);
  return root;
}

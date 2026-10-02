import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBlocks, parseInline, resolveDoc, slugify, isDocPath } from '../app/markdown.mjs';

test('resolveDoc resolves relative links inside the allowlist only', () => {
  assert.equal(resolveDoc('knowledge/index.md', 'identity/index.md'), 'knowledge/identity/index.md');
  assert.equal(resolveDoc('knowledge/identity/index.md', '../../exam/coverage.md'), 'exam/coverage.md');
  assert.equal(resolveDoc('knowledge/identity/index.md', '../../README.md'), 'README.md');
  assert.equal(resolveDoc('knowledge/index.md', '../../../etc/passwd.md'), null);
  assert.equal(resolveDoc('knowledge/index.md', '../package.json'), null);
  assert.ok(isDocPath('generated/questions.md'));
});

test('blocks: headings, tables, nested lists, code and comments', () => {
  const blocks = parseBlocks('<!-- Generated -->\n# Title\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\n- one\n  - nested\n- two\n\n```bash\naz x <y>\n```\n');
  assert.deepEqual(blocks.map(b => b.type), ['heading', 'table', 'list', 'code']);
  assert.equal(blocks[1].rows[0][1], '2');
  assert.equal(blocks[2].items.length, 2);
  assert.equal(blocks[2].items[0].children[0].items[0].text, 'nested');
  assert.equal(blocks[3].text, 'az x <y>');
});

test('inline tokens and slugs', () => {
  assert.deepEqual(parseInline('a `b` [c](d.md) **e**').map(t => t.type), ['text', 'code', 'text', 'link', 'text', 'strong']);
  assert.equal(slugify('Blob Storage: Tiers'), 'blob-storage-tiers');
});

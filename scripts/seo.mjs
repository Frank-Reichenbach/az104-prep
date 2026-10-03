// Discovery files for search engines and AI agents, generated at site build time.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { filesUnder } from './content.mjs';

// Public base URL; override with SITE_URL when the site is served elsewhere.
export const SITE_URL = (process.env.SITE_URL || 'https://vergissberlin.github.io/education-az104/').replace(/\/?$/, '/');

const DOMAINS = ['identity', 'storage', 'compute', 'networking', 'monitoring'];
const escapeXml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function title(file) {
  const text = await readFile(file, 'utf8');
  return text.match(/^#\s+(.+)$/m)?.[1].trim() ?? path.basename(file);
}

export const robotsTxt = () => `# Public study material: all crawlers, including AI agents, are welcome.
User-agent: *
Allow: /

Sitemap: ${SITE_URL}sitemap.xml
`;

// Lists the app root plus the raw Markdown knowledge files (stable URLs, no hash routing).
export async function sitemapXml(siteDir, lastmod) {
  const urls = [SITE_URL];
  for (const file of (await filesUnder(path.join(siteDir, 'knowledge'))).filter(f => f.endsWith('.md')).sort())
    urls.push(SITE_URL + path.relative(siteDir, file).split(path.sep).join('/'));
  const entries = urls.map(u => `  <url><loc>${escapeXml(u)}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

// llms.txt convention: H1, blockquote summary, then sections of links.
export async function llmsTxt(siteDir) {
  const domains = [];
  for (const d of DOMAINS) {
    const rel = `knowledge/${d}/index.md`;
    domains.push(`- [${await title(path.join(siteDir, rel))}](${SITE_URL}${rel})`);
  }
  return `# AZ-104 Practice

> Free, offline-capable study material for the Microsoft Azure Administrator exam (AZ-104): a knowledge base of Markdown topic guides and original multiple-choice practice questions with per-option rationales. Content follows the April 17, 2026 exam outline. Not affiliated with Microsoft; questions are original, not exam dumps.

## Knowledge base (raw Markdown)
${domains.join('\n')}

## Exam coverage and sources
- [Objective coverage checklist](${SITE_URL}exam/coverage.md): stable objective IDs and their guides and questions
- [Question format](${SITE_URL}docs/question-format.md): schema of the question bank
- [Research method](${SITE_URL}docs/research.md): how claims are verified against Microsoft Learn

## Practice questions
- [All questions as Markdown](${SITE_URL}generated/questions.md)
- [Answer key with rationales](${SITE_URL}generated/answers.md)
- [Question bank as JSON](${SITE_URL}data.json)

## Notes
- The interactive app at ${SITE_URL} is client-rendered; use the raw Markdown and JSON links above for machine reading.
- Study history stays in the learner's browser; there is no backend or account.
`;
}

export function jsonLd() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'AZ-104 Practice: Microsoft Azure Administrator study guide and practice questions',
    description: 'Free knowledge base and original multiple-choice practice questions for the Microsoft AZ-104 Azure Administrator exam.',
    url: SITE_URL,
    inLanguage: 'en',
    isAccessibleForFree: true,
    educationalLevel: 'Intermediate',
    teaches: ['Manage Azure identities and governance', 'Implement and manage storage', 'Deploy and manage Azure compute resources', 'Implement and manage virtual networking', 'Monitor and maintain Azure resources'],
    about: { '@type': 'Thing', name: 'Microsoft Certified: Azure Administrator Associate (AZ-104)' },
    provider: { '@type': 'Organization', name: 'AZ-104 Practice', url: SITE_URL },
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT0S' }
  });
}

import http from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './content.mjs';
import { hashFiles, renderServiceWorker } from './sw.mjs';

const assets = new Set(['/index.html', '/style.css', '/main.mjs', '/theme.js', '/quiz.mjs', '/markdown.mjs', '/data.json', '/version.json', '/manifest.webmanifest', '/sw.js']);
const mime = {
  '.html': 'text/html', '.css': 'text/css', '.mjs': 'text/javascript', '.js': 'text/javascript', '.json': 'application/json', '.md': 'text/plain',
  '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml',
};

export function createStudyServer(root = ROOT, { basePath = '/', staticSite = false } = {}) {
  return http.createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    try {
      let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      if (!pathname.startsWith(basePath)) { res.writeHead(404); res.end('Not found'); return; }
      pathname = '/' + pathname.slice(basePath.length);
      if (pathname === '/') pathname = '/index.html';
      let file;
      if (assets.has(pathname) || /^\/icons\/[a-z0-9-]+\.(png|svg)$/.test(pathname)) file = path.join(root, staticSite ? '' : 'app', pathname.slice(1));
      else if (/^\/(README|PLAN|STATUS|CHANGELOG)\.md$/.test(pathname)) file = path.join(root, pathname.slice(1));
      else if (/^\/(knowledge|generated|questions|examples|exam|docs|templates)\/[a-zA-Z0-9_/-]+\.(md|json)$/.test(pathname)) file = path.join(root, pathname.slice(1));
      else { res.writeHead(404); res.end('Not found'); return; }
      const actual = await realpath(file);
      if (!actual.startsWith(root + path.sep) || actual !== path.resolve(file)) { res.writeHead(404); res.end('Not found'); return; }
      let body = await readFile(actual);
      // Dev mode serves the worker template; fill it with the core app files (documents are cached on first use).
      if (!staticSite && pathname === '/sw.js') {
        const core = ['./', ...[...assets].filter(a => a !== '/sw.js').map(a => a.slice(1))];
        body = renderServiceWorker(body.toString('utf8'), core, await hashFiles(path.join(root, 'app'), core.slice(1)));
      }
      res.setHeader('Content-Type', `${mime[path.extname(actual)]}; charset=utf-8`);
      res.writeHead(200);
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch { res.writeHead(404); res.end('Not found'); }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const server = createStudyServer();
  server.on('error', error => { console.error(`Cannot start local server: ${error.message}`); process.exitCode = 1; });
  server.listen(8080, '127.0.0.1', () => console.log('AZ-104 practice: http://127.0.0.1:8080 (Ctrl+C to stop)'));
}

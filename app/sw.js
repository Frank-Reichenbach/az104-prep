// Offline support: precache the whole site and serve it cache-first.
// The build (scripts/sw.mjs) replaces the two placeholders below.
const VERSION = '__VERSION__';
const PRECACHE = JSON.parse('__PRECACHE__');
const CACHE = `az104-${VERSION}`;
const scope = self.registration.scope;

self.addEventListener('install', event => {
  // Do not skipWaiting automatically: a running quiz session must not be swapped mid-way.
  // cache: 'reload' bypasses the browser HTTP cache, so the new version never stores stale copies.
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(PRECACHE.map(async path => {
      const response = await fetch(new URL(path, scope).href, { cache: 'reload' });
      if (!response.ok) throw new Error(`Precache failed: ${path} (${response.status})`);
      await cache.put(new URL(path, scope).href, response);
    }));
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('az104-') && key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin || !url.href.startsWith(scope)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // Navigations fall back to the app shell; queries and hashes never matter here.
    const cached = await cache.match(request, { ignoreSearch: true })
      || (request.mode === 'navigate' ? await cache.match(new URL('index.html', scope).href) : undefined);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) cache.put(request, response.clone());
      return response;
    } catch {
      return new Response('Offline and not cached.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
  })());
});

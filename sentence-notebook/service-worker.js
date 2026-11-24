'use strict';

const scope = self.registration.scope;
const prefix = 'sentence-notebook-english:' + scope;
const cacheName = prefix + 'v1';
const home = new URL('./', scope).href;
const index = new URL('index.html', scope).href;
const assets = new Set(['manifest.webmanifest', 'icon.svg'].map(path => new URL(path, scope).href));

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll([home, ...assets]);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(prefix) && key !== cacheName).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  url.search = '';
  const isHome = url.href === home || url.href === index;
  if (!isHome && !assets.has(url.href)) return;

  const key = isHome ? home : url.href;
  event.respondWith((async () => {
    try {
      const latest = await fetch(event.request, { cache: 'no-cache' });
      if (latest.ok) {
        await caches.open(cacheName).then(cache => cache.put(key, latest.clone())).catch(() => {});
      }
      return latest;
    } catch (error) {
      const cache = await caches.open(cacheName);
      const saved = await cache.match(key);
      if (saved) return saved;
      throw error;
    }
  })());
});

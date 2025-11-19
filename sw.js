const CACHE_NAME = 'mood-pwa-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/db.js',
  '/manifest.json',
  // CDN files like Chart.js are not cached here; you can add local fallback if desired
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
  // Try network first, fallback to cache
  evt.respondWith(
    fetch(evt.request).catch(() => caches.match(evt.request)).then(resp => resp || caches.match('/'))
  );
});

const CACHE_NAME = 'chapter-81-v1';
const assetsToCache = [
  './',
  './index.html',
  './red hibi.jpg',
  './c81.png'
];

// Install Service Worker and cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Fetch assets from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

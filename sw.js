const CACHE_NAME = 'chapter-81-v2';
const urlsToCache = [
  './',
  './index.html',
  './blog-data.js',
  './manifest.json',
  './c81.png',
  './red hibi.jpg',
  './resources/terms.pdf',
  './resources/shipping.pdf',
  './resources/store.pdf',
  './resources/digital.pdf',
  './resources/privacy.pdf',
  './resources/disclaimer.pdf',
  './resources/cancelschedule.pdf',
  './resources/fees.pdf'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Instead of cache.addAll (which crashes everything if one file fails),
      // we cache files individually so one mistake won't break the rest of the app.
      return Promise.all(
        urlsToCache.map(url => {
          return cache.add(url).catch(err => {
            console.warn('Failed to cache:', url, err);
          });
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

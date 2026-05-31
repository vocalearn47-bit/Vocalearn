const CACHE_NAME = 'vocalearn-admin-v1';

const ASSETS = [
  '/Vocalearn/admin',
  '/Vocalearn/manifest.json'
];

// حدث التثبيت
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// حدث التفعيل
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Cache First Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

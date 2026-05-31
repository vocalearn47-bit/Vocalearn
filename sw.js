const CACHE_NAME = 'vocalearn-admin-v1';

const ASSETS = [
  'admin.html',
  'manifest.json'
];

// حدث التثبيت: فتح الكاش وتخزين الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// حدث الاعتراض: Cache First Strategy
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

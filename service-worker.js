/* ============================
   SERVICE WORKER — OFFLINE CACHE
   ============================ */

const CACHE_NAME = "mfd-cache-v1";

const FILES_TO_CACHE = [
  "index.html",

  "css/bezel.css",
  "css/crt.css",
  "css/buttons.css",
  "css/illumination.css",
  "css/scaling.css",
  "css/pages/wx.css",

  "js/core.js",
  "js/illumination.js",
  "js/modes.js",
  "js/brightness.js",
  "js/scaling.js",
  "js/pages/wx.js",

  "manifest.json"
];

// Install SW + cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Serve from cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Activate + clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

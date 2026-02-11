/**
 * Service Worker pour EmberAnvil
 * Gère le cache des assets et permet le fonctionnement offline
 */

const CACHE_VERSION = "v1";
const CACHE_NAME = `ember-anvil-${CACHE_VERSION}`;

// Assets à mettre en cache immédiatement
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/assets/style/main.css",
  "/assets/style/base.css",
  "/assets/bg.avif",
  "/site.webmanifest",
];

// Assets à mettre en cache dynamiquement
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;

// Maximum d'éléments dans le cache dynamique
const MAX_DYNAMIC_CACHE_SIZE = 50;

// Installation du service worker
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Precaching static assets");
      return cache.addAll(STATIC_ASSETS);
    }),
  );
  self.skipWaiting();
});

// Activation et nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== DYNAMIC_CACHE)
          .map((key) => {
            console.log("[SW] Removing old cache:", key);
            return caches.delete(key);
          }),
      );
    }),
  );
  return self.clients.claim();
});

// Limite la taille du cache dynamique
function limitCacheSize(cacheName, maxSize) {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > maxSize) {
        cache.delete(keys[0]).then(() => {
          limitCacheSize(cacheName, maxSize);
        });
      }
    });
  });
}

// Stratégie de cache: Network First avec fallback sur le cache
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ne pas mettre en cache les requêtes non-GET
  if (request.method !== "GET") {
    return;
  }

  // Ne pas mettre en cache les requêtes externes (API, etc.)
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Clone la réponse car elle ne peut être utilisée qu'une fois
        const responseClone = response.clone();

        // Mettre en cache la réponse si elle est valide
        if (response.status === 200) {
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
            limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE);
          });
        }

        return response;
      })
      .catch(() => {
        // Si le réseau échoue, essayer de récupérer depuis le cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Si l'asset n'est pas en cache et que c'est une page HTML,
          // retourner la page d'accueil en cache
          if (request.headers.get("accept").includes("text/html")) {
            return caches.match("/index.html");
          }
        });
      }),
  );
});

// Gestion des messages du client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CLEAR_CACHE") {
    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(keys.map((key) => caches.delete(key)));
      }),
    );
  }
});

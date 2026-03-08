// Service Worker para funcionalidad PWA offline
// Implementa estrategia de cache-first para assets estáticos

const CACHE_NAME = "drolean-v1"
const OFFLINE_URL = "/offline"

const STATIC_ASSETS = ["/", "/anamnesis", "/offline", "/manifest.json", "/icon-192.png", "/icon-512.png"]

// Instalar Service Worker y pre-cachear assets críticos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Pre-caching static assets")
      return cache.addAll(STATIC_ASSETS)
    }),
  )
  self.skipWaiting()
})

// Activar Service Worker y limpiar caches antiguos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Estrategia de fetch: Network First con Cache Fallback
self.addEventListener("fetch", (event) => {
  // Solo cachear GET requests
  if (event.request.method !== "GET") return

  // Skip para APIs externas
  if (event.request.url.includes("supabase.co")) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar response para guardar en cache
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
      .catch(() => {
        // Si falla el fetch, intentar servir desde cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          // Si no hay cache y es navegación, mostrar página offline
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL)
          }

          return new Response("Network error", { status: 408 })
        })
      }),
  )
})

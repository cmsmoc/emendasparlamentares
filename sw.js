const CACHE_NAME = 'cms-portal-cache-v1';
const ASSETS = [
  'index.html',
  'style.css',
  'app.js',
  'icon.svg',
  'manifest.json'
];

// Instalação do Service Worker e caching inicial
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching inicial de assets estáticos');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativação do Service Worker e limpeza de caches antigos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removendo cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptação de requisições de rede
self.addEventListener('fetch', (e) => {
  // Ignorar requisições para a API do Google Sheets ou APIs externas
  if (e.request.url.includes('google') || e.request.url.includes('ipapi') || e.request.url.includes('ipify')) {
    return; // Deixar a requisição ir direto para a rede
  }

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Retorna o cache imediatamente e atualiza em segundo plano (Stale-While-Revalidate)
        fetch(e.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, networkResponse);
            });
          }
        }).catch(() => {
          // Falha silenciosa de rede ao atualizar em segundo plano (está offline)
        });
        return cachedResponse;
      }
      // Se não estiver em cache, faz o fetch normal
      return fetch(e.request);
    })
  );
});

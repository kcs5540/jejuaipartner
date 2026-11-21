// 제주AI파트너 Service Worker (네트워크 우선, 캐시 백업)
const CACHE_NAME = 'jejuaipartner-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // 항상 최신 네트워크 요청을 우선하여 신규 포트폴리오/수정사항이 즉시 반영되도록 함
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

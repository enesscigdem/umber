// Web Push handling, imported into the generated service worker.
self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch { data = { body: event.data && event.data.text() }; }
  const title = data.title || 'Umber';
  event.waitUntil(self.registration.showNotification(title, {
    body: data.body || 'Bugünkü çalışman seni bekliyor.',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: 'umber-daily',
    data: { url: data.url || './' },
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (all.length) return all[0].focus();
    return self.clients.openWindow(event.notification.data && event.notification.data.url || './');
  })());
});

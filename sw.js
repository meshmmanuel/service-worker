// Service Worker Toolbox
importScripts('js/lib/sw-toolbox/sw-toolbox.js');
// Files to precache
const precacheFiles = [
    './',
    './index.html'
];
toolbox.precache(precacheFiles);

// Install and Activate events
self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

// Fetch events
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});

self.addEventListener('push', (event) => {
    console.log('Push message received', event);
    const title = 'New article on bitsofco.de';
    event.waitUntil(
        self.registration.showNotification(title, {
            body: 'Click to read the latest article',
            icon: './img/icon128.png',
            tag: 'new-article'
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag', event.notification.tag);
    event.notification.close();
    const url = './latest.html?notification=true';
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(windowClients) {
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === url && 'focus' in client) return client.focus()
            }
            if (clients.openWindow) return clients.openWindow(url)
        })
    );
});

// self.addEventListener('fetch', function (event) {
//     console.log(event);
// });

// self.addEventListener('install', function (event) {
//     event.waitUntil(
//         caches.open('v1').then(function (cache) {
//             return cache.addAll([
//                 '/index.html'
//             ]);
//         })
//     );
// });

// self.addEventListener('message', (event) => {
//     if (event.data && event.data.type === 'SKIP_WAITING') {
//         self.skipWaiting();
//     }
// });
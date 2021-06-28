const CACHE_NAME = 'chatroom-pwa'
const urlsToCache = [
    'index.html',
    'offline.html'
]

const self = this

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened Cache')
                return cache.addAll(urlsToCache)
            })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
})

self.addEventListener('activate', event => {
    let cacheWhiteList = ['chatroom-pwa']
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if(!cacheWhiteList.includes(cacheName)){
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})
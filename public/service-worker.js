const urls = [
  '/',
  '/index.html',
  '/manifest.json',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('item-cache-v1')
      .then(cache => cache.addAll(urls)))
})

self.addEventListener('fetch', event => {

  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open('item-data-cache-v1').then(cache => {
        return fetch(event.request)
          .then(res => {
            if (res.status === 200) {
              cache.put(event.request.url, res.clone())
            }
            return res
          })
          .catch(err => cache.match(event.request))
      })
    )
    return
  }


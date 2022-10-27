const version = 'v3';
const url_prefix = 'http://localhost:8888/carlos/curso-pwa-master-front/ejemplos/cache/';

// Instalación: Creamos una caché para nuestro SW y cacheamos todos los assets.
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(version)
      .then(function (cache) {
        return cache.addAll([
          'index.html',
          'contact.html',
          'about.html',
          'manifest.json',
          'sw.js',
          'app.js',
          'app.css',
        ]);
      })
  );
});

// Activación: eliminamos cachés de otros SW
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (key) {
          return key !== version;
        }).map(function (key) {
          return caches.delete(key);
        }))
      })
  );
});


urls_cacheFirst = [
  url_prefix + 'index.html',
  url_prefix + 'contact.html',
  url_prefix + 'about.html',
  url_prefix + 'manifest.json',
  url_prefix + 'app.css',
  url_prefix + 'sw.js',
];

urls_networkFirst = [
  url_prefix + 'app.js',
];

// Fetch: buscamos el recurso en la cache, si no está en en la caché hacemos petición (excepto que estemos off-line).
self.addEventListener('fetch', function (event) {
  
  if (urls_cacheFirst.includes(event.request.url)) {
    
    event.respondWith(caches.open(version).then((cache) => {
      // Go to the cache first
      return cache.match(event.request.url).then((cachedResponse) => {
        // Return a cached response if we have one
        if (cachedResponse) {
          console.log('**********' + event.request.url  + ' se ha cogido de la caché!!!!')
          return cachedResponse;
        }

        // Otherwise, hit the network
        return fetch(event.request).then((fetchedResponse) => {
          // Add the network response to the cache for later visits
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        });
      });
    }));
    return;
  }

  if (urls_networkFirst.includes(event.request.url)) {
    // Open the cache
    event.respondWith(caches.open(version).then((cache) => {
      // Go to the network first
      return fetch(event.request.url).then((fetchedResponse) => {
        cache.put(event.request, fetchedResponse.clone());

        return fetchedResponse;
      }).catch(() => {
        // If the network is unavailable, get
        return cache.match(event.request.url);
      });
    }));
    return;
  }

  // if (event.request == ...) {
  
  event.respondWith(fetch(event.request.url));
});
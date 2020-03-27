var version = 'v1';

// Instalación: Creamos una caché para nuestro SW y cacheamos todos los assets.
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(version)
    .then(function(cache) {
      return cache.addAll([
        'index.html',
        'manifest.webmanifest',
        'sw.js',
        'app.js'
      ]);
    })
  );
});

// Activación: eliminamos cachés de otros SW
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
    .then(function(keys) {
      return Promise.all(keys.filter(function(key){
        return key !==version;
      }).map(function (key) {
        return caches.delete(key);
      }))
    })
  );
});


urls_cacheFirst = [
  //
];

urls_networkFirst = [
  //
];

// Fetch: buscamos el recurso en la cache, si no está en en la caché hacemos petición (excepto que estemos off-line).
self.addEventListener('fetch', function(event) {
  
  if(urls_cacheFirst.includes(event.request.url))
  
  
  event.respondWith( function(){
    caches.match(event.request)
    .then( cacheResponse => {
        if(cacheResponse) {
            return cacheResponse;
        } else {
            return fetch(event.request).then( fetchResponse => {
                        return caches.open('v1').then( cache => {
                                        caches.put(event.request, fetchResponse.clone()).then( () => {
                                                        return fetchResponse;
                                                      })
                                        })
                    })
        }
    });
  });

  else if(event.request == .....) {
    event.respondWith( function() {
      fetch(event.request)
      .then( fetchResponse => {
          return caches.open('v1').then( cache => {
              if(!fetchResponse.ok)
                      return cache.match(event.request)
                  else {
                      caches.put(event.request, fetchResponse.clone())
                      return fetchResponse;
                  }
              })
      })
  });

  else if(event.request == ...) {

    return fetch(event.request)
  }
  
});


importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.routing.registerRoute(
  match,
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  match,
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  match,
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  match,
  new workbox.strategies.NetworkOnly()
);

workbox.routing.registerRoute(
  match,
  new workbox.strategies.CacheOnly()
);


# Workbox

Es una librería para facilitar el trabajo con Service Workers.

## Instalación

Para "instalarla" hay que importarla en el js de nuestro SW:

```javascript
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
```

## Uso

La librería *workbox* proporicona un método workbox.routing.registerRoute() para la gestión de estrategias de cacheo aplicadas a determinadas rutas:

```javascript
workbox.routing.registerRoute( expresionRegular, estrategia );
```

Ejemplo: 

```javascript
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst()
);
```

Otro ejemplo:

```javascript
workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'css-cache',
  })
);

workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);
```

### Estrategias disponibles

- workbox.strategies.staleWhileRevalidate()
- workbox.strategies.networkFirst()
- workbox.strategies.cacheFirst()
- workbox.strategies.networkOnly()
- workbox.strategies.cacheOnly()

https://developers.google.com/web/tools/workbox/guides/route-requests?hl=es

## Ejemplos

Hay bastantes ejemplos en la propia documentación de Workbox.

https://developers.google.com/web/tools/workbox/guides/common-recipes?hl=es
const starterCache = [
  '/',
  'css/styles.css',
  'restaurant.html',
  'index.html',
  'js/main.js',
  'js/restaurant_info.js',
  'js/dbhelper.js'
];

const restCache = 'pages-cache-v1';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(restCache)
    .then(cache => {
      return cache.addAll(starterCache);
    })
  );
});

self.addEventListener('fetch', function(event) { //google's offline cookbook helped
  event.respondWith(
    caches.match(event.request)
      .then(function(response){
        if (response){
          return response;
        }
        return fetch(event.request).then(
          function(response){
            // Check for good response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Cloning response to save copy
            var responseToCache = response.clone();
            caches.open(restCache)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
    );
});

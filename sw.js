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

importScripts('https://unpkg.com/workbox-sw@0.0.2/build/importScripts/workbox-sw.dev.v0.0.2.js');
importScripts('https://unpkg.com/workbox-runtime-caching@1.3.0/build/importScripts/workbox-runtime-caching.prod.v1.3.0.js');
importScripts('https://unpkg.com/workbox-routing@1.3.0/build/importScripts/workbox-routing.prod.v1.3.0.js');

// ignore requests from browser extensions
// if(request.url.indexOf('http') === 0) {

// } 
// else{
//   const assetRoute = new workbox.routing.RegExpRoute({
  
//     //cache all requests of static assets and images of the format png, jpg, jpeg, gif, svg, webp, ico, tiff, bmp, or webp
//       regExp: new RegExp('https://(www\.)?homepage\.com/(static|images)/.*\.(png|jpg|jpeg|gif|svg|webp|ico|tiff|bmp|webp)'),
//       handler: new workbox.runtimeCaching.NetworkFirst()
//   });
  
//   const router = new workbox.routing.Router();
//   //router.addFetchListener();
//   router.registerRoutes({routes: [assetRoute]});
//   router.setDefaultHandler({
     
//       // cache all requests , and update the cache from the network in the background
//       handler: new workbox.runtimeCaching.NetworkFirst()
      
//   });
// }

if (request.url.startsWith('http')) {
  // Skip any cross-origin requests
  return;
}

const assetRoute = new workbox.routing.RegExpRoute({
  // Cache all requests for static assets and images with the following extensions
  regExp: new RegExp('https://(www\\.)?homepage\\.com/(static|images)/.*\\.(png|jpg|jpeg|gif|svg|webp|ico|tiff|bmp|webp)'),
  handler: new workbox.strategies.NetworkFirst()
});

const router = new workbox.routing.Router();
router.addFetchListener();
router.registerRoutes({routes: [assetRoute]});
router.setDefaultHandler({
  // Cache all other requests and update the cache from the network in the background
  handler: new workbox.strategies.NetworkFirst()
});

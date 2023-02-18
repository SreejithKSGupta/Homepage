importScripts('https://unpkg.com/workbox-sw@0.0.2/build/importScripts/workbox-sw.dev.v0.0.2.js');
importScripts('https://unpkg.com/workbox-runtime-caching@1.3.0/build/importScripts/workbox-runtime-caching.prod.v1.3.0.js');
importScripts('https://unpkg.com/workbox-routing@1.3.0/build/importScripts/workbox-routing.prod.v1.3.0.js');
console.log('assetRoute from outside the  public/sw.js by hari');
const assetRoute = new workbox.routing.RegExpRoute({
  
  //cache all requests of static assets and images of the format png, jpg, jpeg, gif, svg, webp, ico, tiff, bmp, or webp
    regExp: new RegExp('https://(www\.)?homepage\.com/(static|images)/.*\.(png|jpg|jpeg|gif|svg|webp|ico|tiff|bmp|webp)'),
    handler: new workbox.runtimeCaching.StaleWhileRevalidate()
});

const router = new workbox.routing.Router();
//router.addFetchListener();
router.registerRoutes({routes: [assetRoute]});
router.setDefaultHandler({
    handler:new workbox.runtimeCaching.StaleWhileRevalidate()
});
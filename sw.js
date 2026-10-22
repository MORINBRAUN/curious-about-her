// Keeps the app working offline. Bump VERSION when the app changes.
var VERSION = "cah-v3";
var FILES = ["./", "./index.html", "./manifest.json", "./icon.svg"];
self.addEventListener("install", function (e) { e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); })); self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); })); })); self.clients.claim(); });
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(function (r) { var copy = r.clone(); caches.open(VERSION).then(function (c) { c.put(e.request, copy); }); return r; }).catch(function () { return caches.match(e.request).then(function (r) { return r || caches.match("./index.html"); }); }));
});

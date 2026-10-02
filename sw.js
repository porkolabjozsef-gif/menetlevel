const C='menetlevel-1.0',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// gyorsítótárból azonnal, közben háttérben frissít (a következő indításra az új verzió él)
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;
 e.respondWith(caches.open(C).then(c=>c.match(e.request).then(r=>{const n=fetch(e.request).then(x=>{if(x.ok)c.put(e.request,x.clone());return x}).catch(()=>r);return r||n})))});

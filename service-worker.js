const pdfFiles = [
    'pdfs/analyse.pdf',
    'pdfs/demarche_creative.pdf',
    'pdfs/design.pdf',
    'pdfs/aps.pdf',
    'pdfs/apd.pdf',
    'pdfs/ape.pdf',
    'pdfs/pieces_ecrites.pdf',
    'pdfs/maquettes.pdf',
    'pdfs/visuel_3d.pdf',
    'pdfs/panneau_a0.pdf',
    'pdfs/presentation_oral.pdf'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('pdf-cache').then((cache) => {
            return cache.addAll(pdfFiles);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

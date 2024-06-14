const pdfFiles = [
    'https://firebasestorage.googleapis.com/v0/b/emie-projet.appspot.com/o/analyse.pdf?alt=media&token=361aa40c-bf98-4581-82a1-2e7e32721aeb',
    'https://firebasestorage.googleapis.com/v0/b/emie-projet.appspot.com/o/demarche_creative.pdf?alt=media&token=553580d9-abdc-4fc5-92fc-a645835e02d5',
    'https://firebasestorage.googleapis.com/v0/b/emie-projet.appspot.com/o/design.pdf?alt=media&token=870a7d1a-1dfb-443f-8b14-3c9f67666423',
    'https://firebasestorage.googleapis.com/v0/b/emie-projet.appspot.com/o/aps.pdf?alt=media&token=e69d5387-fa9f-4567-aa38-6584f7c406d3',
    'https://firebasestorage.googleapis.com/v0/b/emie-projet.appspot.com/o/ape.pdf?alt=media&token=439b90e5-337e-4a88-9751-a0e477b550ac',
    'https://firebasestorage.googleapis.com/v0/b/emie-projet.appspot.com/o/visuel_3d.pdf?alt=media&token=419572fc-44fe-4fad-b294-e286d570fa0f'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('pdf-cache').then((cache) => {
            return cache.addAll(pdfFiles.map(file => new Request(file, { cache: 'reload' })))
                .then(() => {
                    console.log('All files are cached');
                })
                .catch((error) => {
                    console.error('Failed to cache:', error);
                    pdfFiles.forEach(async (file) => {
                        try {
                            const response = await fetch(new Request(file, { cache: 'reload' }));
                            if (!response.ok) {
                                console.error('Failed to fetch:', file);
                            }
                        } catch (fetchError) {
                            console.error('Fetch error:', file, fetchError);
                        }
                    });
                });
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

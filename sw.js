self.addEventListener('fetch', function(event) {
    console.log(event);
    event.respondWith(
        new Response('Hello <b>World</b>!')
    )
});
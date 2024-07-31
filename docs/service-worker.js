self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function (e) {
      throw e;
    })
  );
});

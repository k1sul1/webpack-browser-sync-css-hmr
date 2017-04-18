;(function (socket) {
  var UPDATE_STYLES_EVENT = 'styles:update';
  var styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .filter(link => (link.host !== window.location.host))
    .map(link => {
      link.originalHref = link.href;
      return link;
    });

  socket.on(UPDATE_STYLES_EVENT, function () {
    styles.forEach(function(style) {
      setTimeout(function() { // Wait a bit so file is actually written
        const href = style.originalHref;

        style.href = href.concat((href.indexOf('?') ? '?' : '&').concat(
          'cachebuster='.concat(Date.now())
        ));
      }, 1000);
    });
  });
})(window.___browserSync___.socket);

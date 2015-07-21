(function(window) {
  function animateAlongPath(object, path, duration = 7.5, delay = 0) {
    let counter = { value: 0 };
    TweenLite.to(counter, duration, {
      value: path.getTotalLength(),
      repeat: -1,
      ease: Linear.easeNone,
      delay: delay,
      onUpdate: function() {
        let coords = path.getPointAtLength(counter.value);
        TweenLite.set(object, { x: coords.x, y: coords.y, rotationZ: 0.01 });
      },
      onComplete: animateAlongPath,
      onCompleteParams: [object, path, duration, delay]
    });
  }

  function onScrollToElement(elem, visibility, callback) {
    var $elem = $(elem);

    if ($elem.length == 0) {
      return;
    }

    var checkVisibility = function() {
      var $viewport = $(this);
      if ($elem.data('scrolled')) {
        return;
      }

      var elemThreshold = $elem.offset().top + $elem.outerHeight() * visibility;
      var viewportBottom = $viewport.scrollTop() + $viewport.height();

      if (viewportBottom > elemThreshold) {
        callback();
        $elem.data('scrolled', true);
      }
    }

    $(window).scroll(checkVisibility);
    checkVisibility();
  }

  window.animationHelpers = window.animationHelpers || {};
  window.animationHelpers.animateAlongPath = animateAlongPath;
  window.animationHelpers.onScrollToElement = onScrollToElement;
})(window)

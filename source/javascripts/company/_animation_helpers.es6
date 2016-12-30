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

  window.animationHelpers = window.animationHelpers || {};
  window.animationHelpers.animateAlongPath = animateAlongPath;
})(window)

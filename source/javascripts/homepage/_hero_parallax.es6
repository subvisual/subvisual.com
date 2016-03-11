(function(window) {
  let translations = {};
  let svg;

  function translateLayer(id, hDistance, vDistance, factor) {
    const hDistanceScaled = hDistance / factor;
    const vDistanceScaled = vDistance / factor;

    let counter = { value: 0 };
    const precision = 40.0;
    TweenLite.killTweensOf(id);

    const currentTranslation = translations[id] || {};
    const x = currentTranslation.x || 0;
    const y = currentTranslation.y || 0;
    const finalX = hDistanceScaled;
    const finalY = vDistanceScaled;
    const stepX = (finalX - x) / precision;
    const stepY = (finalY - y) / precision;

    TweenLite.to(counter, 0.8, {
      value: precision,
      onUpdate: function() {
        const currentX = x + stepX * counter.value;
        const currentY = y + stepY * counter.value;
        svg
          .find(id)[0]
          .setAttribute('transform', 'translate(' + currentX + ', ' + currentY + ')');
        translations[id] = { x: currentX, y: currentY };
      }
    });
  }

  function parallax(e) {
    var amountMovedX = e.pageX;
    var amountMovedY = e.pageY;
    var hDistance = (window.innerWidth/2) - amountMovedX;
    var vDistance = (window.innerHeight/2) - amountMovedY;

    translateLayer('#distance-3x', hDistance, vDistance, -85);
    translateLayer('#distance-2x', hDistance, vDistance, -65);
    translateLayer('#distance-1x', hDistance, vDistance, 65);
  }

  function init(svgElement, mouseMoveTarget) {
    svg = $(svgElement);
    mouseMoveTarget.addEventListener('mousemove', parallax, false);
  }

  window.homepage = window.homepage || {};
  window.homepage.parallax = init;
})(window);

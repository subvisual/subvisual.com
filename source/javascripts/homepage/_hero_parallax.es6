$('#HomepageHero').load(function() {
  var translations = {};
  var svg = $('#HomepageHero').contents();

  function translateLayer(id, hDistance, vDistance, factor) {
    var hDistanceScaled = hDistance / factor;
    var vDistanceScaled = vDistance / factor;

    var counter = { value: 0 };
    var precision = 40.0;
    TweenLite.killTweensOf(id);

    var thisTranslations = translations[id] || {};
    var x = thisTranslations.x || 0;
    var y = thisTranslations.y || 0;
    var finalX = hDistanceScaled;
    var finalY = vDistanceScaled;
    var stepX = (finalX - x) / precision;
    var stepY = (finalY - y) / precision;

    TweenLite.to(counter, 0.8, {
      value: precision,
      onUpdate: function() {
        var currentX = x + stepX * counter.value;
        var currentY = y + stepY * counter.value;
        svg.find(id)[0].setAttribute('transform', 'translate(' + currentX + ', ' + currentY + ')');
        translations[id] = { x: currentX, y: currentY };
      }
    });
  }

  function parallax(e) {
    var amountMovedX = e.pageX;
    var amountMovedY = e.pageY;
    var hDistance = (window.innerWidth/2) - amountMovedX;
    var vDistance = (window.innerHeight/2) - amountMovedY;

    translateLayer("#lines", hDistance, vDistance, 85);
    translateLayer("#distance-3x", hDistance, vDistance, 45);
    translateLayer("#distance-2x", hDistance, vDistance, -65);
    translateLayer("#distance-1x", hDistance, vDistance, 85);
  }

  if (svg) {
    $(svg.find('svg'))[0].addEventListener("mousemove", parallax, false);
  }
});

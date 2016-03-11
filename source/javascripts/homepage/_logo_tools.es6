(function(window) {
  function findSVG() {
    return $('#LogoTools').contents();
  }

  function startAnimation() {
    var isOverLogo = false;
    var svg = findSVG();
    var svgName = svg.find('.Logo-name');

    function pathLength() {
      return this.getTotalLength();
    }

    var objects = {
      '#LogoTools-hammer': { angle: 10, delay: 0 },
      '#LogoTools-brush': { angle: 10,  delay: 0.3 },
      '#LogoTools-wrench': { angle: 10, delay: 0.6 },
      '#LogoTools-ruler': { angle: 5,   delay: 0.9 },
    }

    function animateAllTools() {
      Object.keys(objects).forEach(function(key) {
        animation(key, objects[key]);
      });
    }

    function animateSingleTool(tool) {
      var options = $.extend({}, objects[tool]);
      options.delay = 0;
      animation(tool, options);
    }

    function animation(tool, options) {
      var $tool = svg.find(tool);
      if ($tool.data('animating')) {
        return;
      }
      $tool.data('animating', true);
      var callback = function() {
        $tool.data('animating', false);
      }
      var delay = options.delay || 0;
      var direction = options.direction || 1;
      var angle = options.angle || 10;

      TweenLite.set($tool, { rotation: 0, transformOrigin: 'center' });
      TweenLite.to($tool, 0.2, { rotation:  angle * direction, delay: delay });
      TweenLite.to($tool, 0.4, { rotation: -angle * direction, delay: delay + 0.2 });
      TweenLite.to($tool, 0.2, { rotation:      0,             delay: delay + 0.6, onComplete: callback });
    }

    function nameAnimation() {
      TweenLite.set(svgName, { fillOpacity: 0, x: 100 });
      TweenLite.to(svgName, 0.8, { x: 0, delay: 0.5 });
      TweenLite.to(svgName, 0.8, { fillOpacity: 1, delay: 0.5 });
    }

    $(svg.find('.LogoTools-tool')).on('mouseenter', function() {
      animateSingleTool('#' + this.id);
    });

    setTimeout(function() {
      window.animationHelpers.onScrollToElement('#LogoTools', 1, animateAllTools);
    }, 500);
  }

  window.customEvents.onLoad(() => findSVG()[0], startAnimation);
})(window);

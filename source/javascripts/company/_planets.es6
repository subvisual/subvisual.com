(function() {
  function animateAlongPath(object, path, duration = 7.5, delay = 0) {
    let counter = { value: 0 };
    TweenLite.to(counter, duration, {
      value: path.getTotalLength(),
      repeat: -1,
      ease: Linear.easeNone,
      delay: delay,
      onUpdate: function() {
        let coords = path.getPointAtLength(counter.value);
        TweenLite.set(object, { x: coords.x, y: coords.y });
      },
      onComplete: animateAlongPath,
      onCompleteParams: [object, path, duration, delay]
    });
  }

  function animatePlanets(svg) {
    var bigPlanetDuration = 7.5;
    // group-planets-1
    animateAlongPath(svg.querySelector("#planet-blue-with-ring"), svg.querySelector("#orbit-big-planet"), bigPlanetDuration, 2);

    // group-half-hidden
    animateAlongPath(svg.querySelector("#planet-half-hidden"), svg.querySelector("#orbit-half-hidden"));

    // big-planet, group-planets-4
    animateAlongPath(svg.querySelector("#big-planet"), svg.querySelector("#orbit-big-planet"), bigPlanetDuration);
    animateAlongPath(svg.querySelector("#group-planets-1"), svg.querySelector("#orbit-big-planet"), bigPlanetDuration, bigPlanetDuration / 2);

    // moon-1, moon-2, moon-3
    let moonsDuration = 15;
    animateAlongPath(svg.querySelector("#moon-1"), svg.querySelector("#orbit-moons-1"), moonsDuration);
    animateAlongPath(svg.querySelector("#moon-2"), svg.querySelector("#orbit-moons-1"), moonsDuration, 2.5);
    animateAlongPath(svg.querySelector("#moon-3"), svg.querySelector("#orbit-moons-1"), moonsDuration, 5);
  }

  window.company = window.company || {};
  window.company.animatePlanets = animatePlanets;
})(window);

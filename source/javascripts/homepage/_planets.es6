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

  function animatePlanets() {
    let svg = document.querySelector('#hero');

    // group-planets-1
    animateAlongPath(
      svg.querySelector('#group-planets-1'),
      svg.querySelector('#orbit-group-planets-1')
    );

    // group-planets-2
    animateAlongPath(
      svg.querySelector('#group-planets-2'),
      svg.querySelector('#orbit-group-planets-2'),
      10
    );

    // big-planet, group-planets-4
    let bigPlanetDuration = 7.5;
    animateAlongPath(
      svg.querySelector('#big-planet'),
      svg.querySelector('#orbit-big-planet'),
      bigPlanetDuration
    );
    animateAlongPath(
      svg.querySelector('#group-planets-4'),
      svg.querySelector('#orbit-big-planet'),
      bigPlanetDuration,
      bigPlanetDuration/2
    );

    // moon-5
    animateAlongPath(
      svg.querySelector('#moon-5'),
      svg.querySelector('#orbit-moons-5'),
      45
    );

    // moon-1, moon-2
    animateAlongPath(
      svg.querySelector('#moon-1'),
      svg.querySelector('#orbit-moons-1'),
      7.5
    );
    animateAlongPath(
      svg.querySelector('#moon-2'),
      svg.querySelector('#orbit-moons-1'),
      7.5,
      2.5
    );

    // moon-3, moon-4
    animateAlongPath(
      svg.querySelector('#moon-3'),
      svg.querySelector('#orbit-moons-3'),
      150
    );
    animateAlongPath(
      svg.querySelector('#moon-4'),
      svg.querySelector('#orbit-moons-4'),
      150
    );
  }

  window.homepage = window.homepage || {};
  window.homepage.animatePlanets = animatePlanets;
})(window);

(function(window) {
  const viewportWidth = 1440;
  const viewportHeight = 540;
  const lineMinWidth = 100;
  const lineMaxWidth = 500;
  const colors = ['#0ADCF2', '#EC7376', '#FCD380', '#E1EAF6', '#8DC8DC', '#4DEBC3'];
  let lines;
  let xwings;
  let destroyers;
  let speedTable = {
    get 1() {
      return getRandomInt(65, 70);
    },
    get 2() {
      return getRandomInt(50, 55);
    },
    get 3() {
      return getRandomInt(45, 50);
    },
    get 4() {
      return getRandomInt(35, 40);
    },
    get 5() {
      return getRandomInt(30, 35);
    },
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function initialPosition(width, direction) {
    if (direction === 1) {
      return -width * 1.2;
    } else {
      return viewportWidth * 1.2;
    }
  }

  function lineHeight(width) {
    if (width < lineMaxWidth/2) {
      return 1;0
    } else {
      return 2;
    }
  }

  function resetLine(direction, width, i) {
    let color = randomColor();
    return {
      attr: {
        width: width,
        height: lineHeight(width)
      },
      stroke: color,
      fill: color,
      x: initialPosition(width, direction),
      y: getY(i)
    };
  }

  function getY(i) {
    let sectionHeight = viewportHeight / groups.length;
    let vPadding = 20;
    return getRandomInt((sectionHeight * i) + vPadding, (sectionHeight * i + sectionHeight) - vPadding);
  }

  function randomDirection() {
    return Math.round(Math.random()) * 2 - 1;
  }

  function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function getSpeed(width) {
    let scaleFactor = Math.floor(width / 75);
    return speedTable[scaleFactor];
  }

  function translateX(direction, elementWidth) {
    let sign = '+';
    if (direction < 0) sign = '-';
    return `${sign}=${viewportWidth + elementWidth}`;
  }

  function animateLine(group, i, xwing) {
    let width = getRandomInt(lineMinWidth, lineMaxWidth);
    let direction = randomDirection();
    let settings = resetLine(direction, width, i);

    if (direction > 0) {
      TweenLite.set(group, { rotation: 180, scaleY: 1, transformOrigin: '50% 50%' });
    } else {
      TweenLite.set(group, { rotation: 0, scaleY: -1, transformOrigin: '50% 50%' });
    }

    TweenLite.set(group, {
      x: settings.x,
      y: settings.y
    });

    TweenLite.to(group, getSpeed(width) * 0.4, {
      x: translateX(direction, width * 1.8),
      delay: 0.8 * i,
      onComplete: animateLine,
      onCompleteParams: [group, i, xwing]
    });
  }

  function animateStarDestroyer(starDestroyer, i) {
    let direction = (i == 0) ? -1 : -1;

    TweenLite.to(starDestroyer, 500, {
      x: translateX(-1, 10),
      delay: 0.8 * i,
    });
  }

  function animateLines(svg) {
    groups = svg.querySelectorAll('.X-Wings');
    xwings = svg.querySelectorAll('.X-Wing');
    starDestroyers = svg.querySelectorAll('.StarDestroyer');

    for(let i = 0; i < groups.length; i++) {
      animateLine(groups[i], i, xwings[i]);
    };

    for(let i = 0; i < starDestroyers.length; i++) {
      animateStarDestroyer(starDestroyers[i], i);
    }
  }

  window.homepage = window.homepage || {};
  window.homepage.animateLines = animateLines;
})(window);

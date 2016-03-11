(function(window) {
  const LINE_MIN_WIDTH = 100;
  const LINE_MAX_WIDTH = 500;
  const COLORS = ['#0ADCF2', '#EC7376', '#FCD380', '#E1EAF6', '#8DC8DC', '#4DEBC3'];
  const SPEED_TABLE = {
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
  let viewportWidth;
  let viewportHeight;
  let lines;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function initialPosition(width, direction) {
    if (direction === 1) {
      return -width;
    } else {
      return viewportWidth;
    }
  }

  function lineHeight(width) {
    if (width < LINE_MAX_WIDTH / 2) {
      return 1;
    } else {
      return 2;
    }
  }

  function resetLine(direction, width, i) {
    const color = randomColor();
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
    const sectionHeight = viewportHeight / lines.length;
    const vPadding = 20;
    return getRandomInt((sectionHeight * i) + vPadding, (sectionHeight * i + sectionHeight) - vPadding);
  }

  function randomDirection() {
    return Math.round(Math.random()) * 2 - 1;
  }

  function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  function getSpeed(width) {
    const scaleFactor = Math.floor(width / 75);
    return SPEED_TABLE[scaleFactor];
  }

  function translateX(direction, elementWidth) {
    let sign = '+';
    if (direction < 0) sign = '-';
    return `${sign}=${viewportWidth + elementWidth}`;
  }

  function animateLine(el, i) {
    const width = getRandomInt(LINE_MIN_WIDTH, LINE_MAX_WIDTH);
    const direction = randomDirection();

    TweenLite.set(el, resetLine(direction, width, i));
    TweenLite.to(
      el, getSpeed(width), {
        x: translateX(direction, width),
        delay: 0.8 * i,
        onComplete: animateLine,
        onCompleteParams: [el, i]
      }
    );
  }

  function animateLines(svg) {
    lines = svg.querySelectorAll('.Line');
    viewportWidth = svg.viewBox.baseVal.width;
    viewportHeight = svg.viewBox.baseVal.height;

    for (let i = 0; i < lines.length; i++) {
      animateLine(lines[i], i);
    };
  }

  window.homepage = window.homepage || {};
  window.homepage.animateLines = animateLines;
})(window);

(function() {
  var element = $('.Buildings');

  var scene = Snap('#Page-1');
  var background = Snap('#background');

  var buildings = new Snap.set();
  var buildingWindows = new Snap.set();

  var windowsShowMatrix = 's1 1';
  var windowsHideMatrix = 's0 0';

  var buildingsShowMatrix = 's1 1 0 563';
  var buildingsHideMatrix = 's1 0 0 563';

  var windowAnimationTime = 100;

  var timeBeteweenBuldings = 175;
  var timeBeforeBackgorund = 1500;
  var backgroundAnimationTime = 1000;

  var buildingAnimationMaxTime = 400;
  var buildingAnimationMinTime = 300;

  var windowsEasing = mina.backout;
  var buildingEasing = mina.backout;
  var backgroundEasing = mina.backout;

  var buildingsNames = [{
    name: '#building1',
    windows: '#windows1'
  }, {
    name: '#building2',
    windows: '#windows2'
  }, {
    name: '#building3',
    windows: '#windows3'
  }, {
    name: '#building4',
    windows: '#windows4'
  }, {
    name: '#building5',
    windows: '#windows5'
  }, {
    name: '#building6',
    windows: '#windows6'
  }, {
    name: '#building7',
    windows: '#windows7'
  }];

  init();

  function init() {
    initBuildings();
    hideAllElements();
    startAnimation();
  }

  function initBuildings() {
    shuffle(buildingsNames);
    buildingsNames.forEach(findBuildings);
  }

  function findBuildings(building, index) {
    var object = scene.select(building.name);
    populateBuildings(object, index);
  }

  function populateBuildings(building, index) {
    buildings.push(building);
    populateWindows(building, index);
  }

  function populateWindows(building, index) {
    var buildingWindow = building.select(buildingsNames[index].windows);
    buildingWindow = buildingWindow.selectAll('g');
    buildingWindow.items.reverse();
    buildingWindows.push(buildingWindow);
  }

  function hideAllElements() {
    buildings.forEach(hideBuilding);
    buildingWindows.forEach(hideWindows);
    hideBackground();
  }

  function hideBuilding(building) {
    transformElement(building, buildingsHideMatrix);
  }

  function hideWindows(windowsGroup) {
    windowsGroup.forEach(hideWindow);
  }

  function hideWindow(buildingWindow) {
    transformElement(buildingWindow, windowsHideMatrix);
  }

  function hideBackground() {
    transformElement(background, buildingsHideMatrix);
  }

  function startAnimation() {
    element.css('visibility', 'visible');
    buildings.forEach(showBuildings);
    setTimeout(showBackground, timeBeforeBackgorund);
  }

  function showBuildings(building, index) {
    setTimeout(function() {
      animateElement(
        building,
        buildingsShowMatrix,
        getRandomInt(buildingAnimationMinTime, buildingAnimationMaxTime),
        buildingEasing,
        windowsAnimation(index)
      );
    }, timeBeteweenBuldings + timeBeteweenBuldings * index);
  }

  function windowsAnimation(windowsIndex) {
    var windowGroup = buildingWindows.items[windowsIndex];
    return function showWindows() {
      animateWindow(windowGroup[0], 0, windowGroup);
    };
  }

  function animateWindow(buildingWindow, index, windowGroup) {
    animateElement(
      buildingWindow,
      windowsShowMatrix,
      windowAnimationTime,
      windowsEasing,
      nextWindowAnimation(index, windowGroup)
    );
  }

  function nextWindowAnimation(index, windowGroup) {
    var nextWindow = getNextWindow(index, windowGroup);

    if (!nextWindow) return;

    return function() {
      animateWindow(nextWindow, index + 1, windowGroup);
    };
  }

  function getNextWindow(currentIndex, windowGroup) {
    if (currentIndex + 1 >= windowGroup.length) return;

    return windowGroup[currentIndex + 1];
  }

  function showBackground()  {
    animateElement(
      background,
      buildingsShowMatrix,
      backgroundAnimationTime,
      backgroundEasing
    );
  }

  function animateElement(element, matrix, duration, easing, callback) {
    element.animate({
      transform: matrix
    }, duration, easing, callback);
  }

  function transformElement(element, matrix) {
    element.transform(matrix);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return 0;
  }
})();

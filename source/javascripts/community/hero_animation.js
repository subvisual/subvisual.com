(function() {
  var element = $('.Buildings');

  var scene = Snap('#Page-1');
  var background = Snap('#background');

  var buildings = [];
  var buildingWindows = new Snap.set();

  var windowsShowMatrix = 's1 1';
  var windowsHideMatrix = 's0 0';

  var buildingsShowMatrix = 's1 1 0 563';
  var buildingsHideMatrix = 's1 0 0 563';

  var windowAnimationTime = 0.170;

  var timeBeteweenBuldings = 0.175;
  var timeBeforeBackgorund = 1.5;
  var backgroundAnimationTime = 1;

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

  $(document).ready(init);
  $(window).load(startAnimation);

  function init() {
    initBuildings();
    hideAllElements();
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
    buildings.push($(building.node));
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
    TweenLite.set(building, { scaleY: 0, transformOrigin: '100% 100%' });
  }

  function hideWindows(windowsGroup) {
    windowsGroup.forEach(hideWindow);
  }

  function hideWindow(buildingWindow) {
      TweenLite.set($(buildingWindow.node), { scaleY: 0, scaleX: 0, transformOrigin: '50% 50%' });
  }

  function hideBackground() {
    TweenLite.set($(background.node), { scaleY: 0, transformOrigin: '100% 100%' });
  }

  function startAnimation() {
    element.css('visibility', 'visible');
    buildings.forEach(showBuildings);
    showBackground();
  }

  function showBuildings(building, index) {
    TweenLite.to(
      building,
      getRandomInt(buildingAnimationMinTime, buildingAnimationMaxTime) / 1000,
      {
        delay: buildingDelay(index),
        scaleY: 1,
        onComplete: windowsAnimation(index),
        ease: Back.easeOut.config(1.7)
      }
    );
  }

  function buildingDelay(index) {
    return timeBeteweenBuldings + timeBeteweenBuldings * index;
  }

  function windowsAnimation(windowsIndex) {
    var windowGroup = buildingWindows.items[windowsIndex];
    return function showWindows() {
      animateWindow(windowGroup[0], 0, windowGroup);
    };
  }

  function animateWindow(buildingWindow, index, windowGroup) {
    TweenLite.to(
      $(buildingWindow.node),
      windowAnimationTime,
      {
        scaleX: 1,
        scaleY: 1,
        onComplete: nextWindowAnimation(index, windowGroup),
        ease: Back.easeOut.config(1.7)
      }
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
    TweenLite.to(
      $(background.node),
      backgroundAnimationTime,
      {
        delay: timeBeforeBackgorund,
        scaleY: 1,
        ease: Back.easeOut.config(1.7)
      }
    );
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return 0;
  }
})();

(function() {
  var element = $('.Buildings');

  var scene = $('#Page-1');
  var background = $('#background');

  var buildings = [];
  var buildingWindows = [];

  var windowAnimationTime = 0.170;

  var timeBeteweenBuldings = 0.175;
  var timeBeforeBackgorund = 1;
  var backgroundAnimationTime = 1;

  var buildingAnimationMaxTime = 400;
  var buildingAnimationMinTime = 300;

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

  function hideAllElements() {
    buildings.forEach(hideBuilding);
    buildingWindows.forEach(hideWindows);
    hideBackground();
  }

  function initBuildings() {
    buildingsNames = shuffle(buildingsNames);
    buildingsNames.forEach(findBuildings);
  }

  function findBuildings(building, index) {
    var object = scene.find(building.name);
    populateBuildings(object, index);
  }

  function populateBuildings(building, index) {
    buildings.push($(building));
    populateWindows(building, index);
  }

  function populateWindows(building, index) {
    var windowsGroup = building.find(buildingsNames[index].windows);
    windowsGroup = windowsGroup.find('g');
    windowsGroup = windowsGroup.toArray().reverse();
    buildingWindows.push(windowsGroup);
  }

  function hideBuilding(building) {
    TweenLite.set(building, { scaleY: 0, transformOrigin: '100% 100%' });
  }

  function hideWindows(windowsGroup) {
    windowsGroup.forEach(hideWindow);
  }

  function hideWindow(buildingWindow) {
    TweenLite.set($(buildingWindow), { scaleY: 0, scaleX: 0, transformOrigin: '50% 50%' });
  }

  function hideBackground() {
    TweenLite.set(background, { scaleY: 0, transformOrigin: '100% 100%' });
  }

  function startAnimation() {
    element.css('visibility', 'visible');
    buildings.forEach(showBuildings);
    showBackground();
  }

  function showBuildings(building, index) {
    TweenLite.to(
      building,
      getRandomAnimationTime(buildingAnimationMinTime, buildingAnimationMaxTime),
      {
        delay: timeBeteweenBuldings * index,
        scaleY: 1,
        onComplete: windowsAnimation(index),
        ease: Back.easeOut.config(1.7)
      }
    );
  }

  function windowsAnimation(windowsIndex) {
    var windowGroup = buildingWindows[windowsIndex];
    return function showWindows() {
      animateWindow(windowGroup[0], 0, windowGroup);
    };
  }

  function animateWindow(buildingWindow, index, windowGroup) {
    TweenLite.to(
      $(buildingWindow),
      windowAnimationTime,
      {
        scale: 1,
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
      background,
      backgroundAnimationTime,
      {
        delay: timeBeforeBackgorund,
        scaleY: 1,
        ease: Back.easeOut.config(1.7)
      }
    );
  }

  function getRandomAnimationTime(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min) / 1000;
  }

  function shuffle(array) {
    shuffledArray = array;
    for (
      var j, x, i = shuffledArray.length; i;
      j = Math.floor(Math.random() * i),
      x = shuffledArray[--i],
      shuffledArray[i] = shuffledArray[j],
      shuffledArray[j] = x
    );
    return shuffledArray;
  }
})();

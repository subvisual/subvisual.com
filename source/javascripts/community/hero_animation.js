(function() {
  var scene = Snap('#town');
  var background = Snap('#background');

  var buildings = new Snap.set();
  var buildingWindows = new Snap.set();

  var windowsShowMatrix = 's1 1';
  var windowsHideMatrix = 's0 0';

  var buildingsShowMatrix = 's1 1 0 563';
  var buildingsHideMatrix = 's1 0 0 563';

  var buildingsNames = [
    {
      name: '#building1',
      windows: '#windows1'
    },
    {
      name: '#building2',
      windows: '#windows2'
    },
    {
      name: '#building3',
      windows: '#windows3'
    },
    {
      name: '#building4',
      windows: '#windows4'
    },
    {
      name: '#building5',
      windows: '#windows5'
    },
    {
      name: '#building6',
      windows: '#windows6'
    },
    {
      name: '#building7',
      windows: '#windows7'
    }
  ];

  init();

  function init() {
    initBuildings();
    hideAllElements();
    setTimeout(startAnimation(), 2000);
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
    buildingWindow = buildingWindow.selectAll('path');
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
    buildings.forEach(showBuildings);
    setTimeout(showBackground, 3000);
  }

  function showBuildings(building, index) {
    var diff = 700;
    setTimeout(function() {
      animateElement(building, buildingsShowMatrix, getRandomInt(500, 1000), mina.backout, windowsAnimation(index));
    }, diff + index * 300);
  }

  function windowsAnimation(windowsIndex) {
    var windowGroup = buildingWindows.items[windowsIndex];
    return function showWindows() {
      windowGroup.forEach(showWindow);
    };
  }

  function showWindow(buildingWindow, index) {
    setTimeout(animateWindow(buildingWindow), 100 * index);
  }

  function animateWindow(buildingWindow) {
    return function() {
      animateElement(buildingWindow, windowsShowMatrix, 450, mina.backout);
    };
  }

  function showBackground() {
    animateElement(background, buildingsShowMatrix, 1000, mina.backout);
  }

  function animateElement(element, matrix, duration, easing, callback) {
    element.animate({ transform: matrix }, duration, easing, callback);
  }

  function transformElement(element, matrix) {
    element.transform(matrix);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return 0;
  }
 })();

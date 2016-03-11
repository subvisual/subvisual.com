(function(window) {
  function onLoad(guardFn, callback) {
    const timerId = setInterval(function() {
      if (guardFn()) {
        callback();
        clearInterval(timerId);
      }
    }, 100);
  }

  window.customEvents = window.customEvents || {};
  window.customEvents.onLoad = onLoad;
})(window)

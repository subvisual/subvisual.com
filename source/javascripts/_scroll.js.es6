$(function() {
  let didScroll;

  function checkScroll() {
    didScroll = true;
  }

  setInterval(function() {
    if (didScroll) {
      window.subvisual.stickyElement.manageVisibility();
      window.subvisual.nav.manageBackground();
      didScroll = false;
    }
  }, 250);

  window.onscroll = checkScroll;
  setTimeout(checkScroll, 50);
});

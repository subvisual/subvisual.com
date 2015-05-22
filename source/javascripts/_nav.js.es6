$(function() {
  window.subvisual = window.subvisual || {};
  window.subvisual.nav = (function(stickyElement) {
    let lastScrollTop = 0;
    let delta = 5;
    let $element = $('.Nav');
    let elementHeight = $element.outerHeight();

    function manageBackground() {
      let currentScrollTop = $(document).scrollTop();

      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - currentScrollTop) <= delta)
        return;

      if (currentScrollTop > elementHeight) {
        setTimeout(function() {
          $element.addClass('Nav--filled');
        }, stickyElement.hideTransitionDuration);
      } else {
        $element.removeClass('Nav--filled');
      }

      lastScrollTop = currentScrollTop;
    }

    return { manageBackground };
  })(window.subvisual.stickyElement);
});

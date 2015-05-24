$(function() {
  window.subvisual = window.subvisual || {};
  window.subvisual.stickyElement = (function() {
    let lastScrollTop = 0;
    let delta = 5;
    let $element = $('.StickyElement');
    let elementHeight = $element.outerHeight();
    let hideTransitionDuration = 200;

    function manageVisibility() {
      let currentScrollTop = $(document).scrollTop();

      if(Math.abs(lastScrollTop - currentScrollTop) <= delta)
        return;

      if (hasScrolledDownPastTheElement(currentScrollTop)){
        $element.css('top', -elementHeight);
      } else {
        $element.css('top', 0);
      }

      lastScrollTop = currentScrollTop;
    }

    function hasScrolledDownPastTheElement(currentScrollTop) {
      return currentScrollTop > lastScrollTop && currentScrollTop > elementHeight;
    }

    $element.css('transition', `top ${hideTransitionDuration}ms ease-in-out`);

    return {
      manageVisibility,
      hideTransitionDuration
    };
  })();
});

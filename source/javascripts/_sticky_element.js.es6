$(function() {
  window.subvisual = window.subvisual || {};
  window.subvisual.stickyElement = (function() {
    let lastScrollTop = 0;
    let delta = 5;
    let $element = $('.StickyElementContainer-element');
    let $elementContainer = $element.closest('.StickyElementContainer');
    let elementHeight = $element.outerHeight();

    function manageVisibility() {
      let currentScrollTop = $(document).scrollTop();

      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - currentScrollTop) <= delta)
        return;

      // If they scrolled down and are past the element, add class .is-hidden.
      if (currentScrollTop > lastScrollTop && currentScrollTop > elementHeight){
        // Scroll Down
        $elementContainer.addClass('is-hidden');
        $element.css('top', -elementHeight);
      } else {
        // Scroll Up
        if(currentScrollTop + $(window).height() < $(document).height()) {
          $elementContainer.removeClass('is-hidden');
          $element.css('top', 0);
        }
      }

      lastScrollTop = currentScrollTop;
    }

    $elementContainer.css('padding-top', elementHeight);

    return { manageVisibility };
  })();
});

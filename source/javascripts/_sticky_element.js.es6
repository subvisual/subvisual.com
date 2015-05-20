$(function() {
  let didScroll;
  let lastScrollTop = 0;
  let delta = 5;
  let $element = $('.StickyElementContainer-element');
  let $elementContainer = $element.closest('.StickyElementContainer');
  let elementHeight = $element.outerHeight();

  function hasScrolled() {
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

  function checkScroll() {
    didScroll = true;
  }

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  $elementContainer.css('padding-top', elementHeight);

  window.onscroll = checkScroll;
  setTimeout(checkScroll, 50);
});

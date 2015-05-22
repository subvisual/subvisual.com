$(function() {
  window.subvisual = window.subvisual || {};
  window.subvisual.nav = (function() {
    let lastScrollTop = 0;
    let delta = 5;
    let $element = $('.Nav');
    let elementHeight = $element.outerHeight();

    function manageBackground() {
      let currentScrollTop = $(document).scrollTop();

      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - currentScrollTop) <= delta)
        return;

      // If the scroll down and are past the element, add class .is-hidden.
      if (currentScrollTop > elementHeight){
        $element.addClass('Nav--filled');
      } else {
        $element.removeClass('Nav--filled');
      }

      lastScrollTop = currentScrollTop;
    }

    return { manageBackground };
  })();
});

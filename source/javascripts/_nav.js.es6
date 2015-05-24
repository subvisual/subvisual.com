$(function() {
  window.subvisual = window.subvisual || {};
  window.subvisual.nav = (function(stickyElement) {
    let lastScrollTop = 0;
    let delta = 5;
    let $element = $('.Nav');
    let elementHeight = $element.outerHeight();

    function chooseAdequateLogo() {
      if ($element.hasClass('Nav--light') && !$element.hasClass('Nav--filled')) {
        showMonoLogo();
      } else {
        showColoredLogo();
      }
    }

    function showMonoLogo() {
      $element.find('.Nav-logo[data-mono]').removeClass('is-hidden');
      $element.find('.Nav-logo:not([data-mono])').addClass('is-hidden');
    }

    function showColoredLogo() {
      $element.find('.Nav-logo[data-mono]').addClass('is-hidden');
      $element.find('.Nav-logo:not([data-mono])').removeClass('is-hidden');
    }

    function manageBackground() {
      let currentScrollTop = $(document).scrollTop();

      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - currentScrollTop) <= delta)
        return;

      if (currentScrollTop > elementHeight) {
        setTimeout(function() {
          $element.addClass('Nav--filled');
          showColoredLogo();
        }, stickyElement.hideTransitionDuration);
      } else {
        $element.removeClass('Nav--filled');
        chooseAdequateLogo();
      }

      lastScrollTop = currentScrollTop;
    }

    chooseAdequateLogo();

    return { manageBackground };
  })(window.subvisual.stickyElement);
});

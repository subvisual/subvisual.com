$(function() {
  window.subvisual = window.subvisual || {};
  window.subvisual.site = (function() {
    function update($viewport) {
      let $showcase = $('#animate-showcase');
      if (!$showcase.hasClass('is-animatable') && $viewport.scrollTop() > $showcase.offset().top - ($showcase.outerHeight() / 2)) {
        $showcase.addClass('is-animatable');
      }
    }

    return { update };
  })();
});

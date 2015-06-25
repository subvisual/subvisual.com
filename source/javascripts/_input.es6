$(function() {
  $.fn.inputify = function() {
    let $elements = $(this);

    $elements.on('focusin', function(e) {
      $target = $(e.target);
      $(this).addClass('InputText--active');
    });

    $elements.on('focusout', function() {
      if ($(this).find('.InputText-input').val() == "") {
        $(this).addClass('InputText--animateOut');
      } else {
        $(this).addClass('InputText--filled');
      }
    });

    $elements.each(function() {
      this.addEventListener("animationend", function(e) {
        if (e.animationName == 'labelToPlaceholder' || e.animationName == 'labelToPlaceholderLarge') {
          $(this).removeClass('InputText--active');
          $(this).removeClass('InputText--filled');
          $(this).removeClass('InputText--animateOut');
        }
      }, false);
    });
  }

  $('.InputText').inputify();
});

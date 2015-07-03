$(function() {
  $.fn.inputify = function() {
    let $elements = $(this);

    $elements.on('focusin', function(e) {
      $(this).removeClass('InputText--animateOut');
      $(this).addClass('is-active');
    });

    $elements.on('focusout', function() {
      if ($(this).find('.InputText-input').val() == "") {
        $(this).addClass('InputText--animateOut');
      } else {
        $(this).removeClass('is-active');
        $(this).addClass('InputText--filled');
      }
    });

    $elements.each(function() {
      this.addEventListener("animationend", function(e) {
        if (e.animationName == 'labelToPlaceholder' || e.animationName == 'labelToPlaceholderLarge') {
          $(this).removeClass('is-active');
          $(this).removeClass('InputText--filled');
          $(this).removeClass('InputText--animateOut');
        }
      }, false);
    });
  }

  $.fn.radioify = function() {
    let $elements = $(this);

    $elements.on('focusin', function(e) {
      let $radioButton = $(e.target);
      if (!$radioButton.filter(':checked').val()) {
        $radioButton.prop("checked", true);
      }
    });
  }

  $('.InputText').inputify();
  $('.Radio').radioify();
});

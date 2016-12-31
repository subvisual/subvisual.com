$(function() {
  $('.CollapsedSection').on('click', '.CollapsedSection-header', function() {
    $(this).parent().toggleClass('CollapsedSection--open');
  });
});

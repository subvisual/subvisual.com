$(function() {
  var tabletBreakpoint = 768;
  var faqSection = $('#faq');
  var faqLearnMoreSection = $('#faq-learn');
  var faqSectionHeight = faqSection.height();

  var hideLearnMore = function() {
    faqLearnMoreSection.hide();
  };

  var showLearnMore = function() {
    faqLearnMoreSection.css({
      visibility: 'visible'
    });
  };

  var hideSection = function() {
    faqSection.css({
      height: 0,
      visibility: 'hidden'
    });
  };

  var showSection = function() {
    faqSection.css({
      visibility: 'visible',
      height: 'auto'
    });
  };

  if ($(window).width() > tabletBreakpoint) {
    showSection();
    hideLearnMore();
    return;
  }

  showLearnMore();
  hideSection();
  $('.hidden-section-trigger').on('click', function() {
    $.Velocity(faqLearnMoreSection, {
      opacity: 0,
      height: 0,
      complete: function() {
        $.Velocity(faqSection, {
          height: faqSectionHeight
        }, {
          complete: showSection
        });
      }
    });
  });
});

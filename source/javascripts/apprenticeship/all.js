//= require jquery
//= require velocity/velocity
//= require gsap/src/minified/TweenLite.min
//= require gsap/src/minified/plugins/CSSPlugin.min
//= require blue

//= require apprenticeship/_faq
//= require apprenticeship/_collapsed_section
//= require apprenticeship/_links

$(function() {
  var el = $('.Panel-balloonWrapper');

  var documentWidth = $('body').width();

  var x = 0;

  function up(xDistance, cb) {
    x -= xDistance;

    $.Velocity(el, {
      translateX: x,
      translateY: -200,
    }, {
      duration: 10000,
      complete: cb
    }, 'easeOut');
  }

  function down(xDistance, cb) {
    x -= xDistance;

    $.Velocity(el, {
      translateX: x,
      translateY: 0
    }, {
      duration: 10000,
      complete: cb
    }, 'easeInSine');
  }

  up(documentWidth / 4, function() {
    down(documentWidth / 4, function() {
      up(documentWidth / 2);
    });
  });
});

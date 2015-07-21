$(function() {
  var animating = false;

  function onAnimationFinished() {
    animating = false;
  }

  function logoSetup() {
    $('.LogoTransparency-piece').each(function() {
      TweenLite.set('.LogoTransparency-piece', { strokeDasharray: this.getTotalLength(), strokeDashoffset: this.getTotalLength()  });
    });
  }

  function logoAnimation() {
    if (animating) {
      return;
    }
    animating = true;
    logoSetup();
    $('.LogoTransparency-piece').each(function() {
      TweenLite.to('.LogoTransparency-piece', 0.8, { strokeDashoffset: 0, onComplete: onAnimationFinished });
    });
  }

  logoSetup();
  $('#LogoTransparency').on('mouseenter', logoAnimation);
  setTimeout(function() {
    window.animationHelpers.onScrollToElement('#LogoTransparency', 1, logoAnimation);
  }, 500);
});

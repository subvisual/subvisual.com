(function() {
  let durationUp = 1;

  function animateFlight() {
    let origamiParts = Snap.selectAll('#crane > path');

    origamiParts.forEach(function(el, i) {
      let pathAnimation = el.animate(
        { d: el.attr('d2') }, durationUp
      );

      /* Get the animation controller */
      let pathAnimationCtrl = pathAnimation.anims[Object.keys(pathAnimation.anims)[0]];

      /* Pause the animation right away */
      pathAnimationCtrl.pause();

      let tweenerObj = { progress: 0 };

      TweenMax.to(tweenerObj, durationUp, {
        progress: 1,
        ease: Sine.easeInOut,
        onUpdate: function() {
          pathAnimationCtrl.status(tweenerObj.progress);
          pathAnimationCtrl.update();
        },
        yoyo: true,
        repeat: -1
      });
    });
  }

  function animateShadow() {
    let shadowGround = document.querySelector('#shadow-ground');

    TweenMax.to(shadowGround, durationUp, {
      attr: { cx: "365.5", rx: "172.5" },
      fill: '#DFDFDF',
      fillOpacity: "0.4",
      ease: Sine.easeInOut,
      yoyo: true,
      repeat: -1
    });
  }

  function animateOrigami() {
    animateFlight();
    animateShadow();
  }

  window.work = window.work || {};
  window.work.animateOrigami = animateOrigami;
})(window);

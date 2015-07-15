$(function() {
  let svg = document.getElementById("easymoney-hero");
  let svgPaths = svg.querySelectorAll(".JourneyPath");

  [].forEach.call(svgPaths, function(journeyPath, x) {
    let [origin, destiny] = Array.prototype.slice.call(journeyPath.querySelectorAll('.Point'));
    let path = journeyPath.querySelector('.Path');
    let pathLength = path.getTotalLength();
    let strokeWidth = path.getAttribute("stroke-width");
    if (strokeWidth == null) strokeWidth = 1;
    let strokeDashOffset = (/Firefox/i.test(navigator.userAgent)) ? pathLength / strokeWidth : pathLength;

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = strokeDashOffset;

    let journeyStartingTime = 0.8 * x;
    let pathStartingTime = journeyStartingTime + 0.3;
    let pointAnimationDur = 0.8;
    let journeyDur = 1;

    TweenLite.set([origin, destiny], { opacity: 0, scale: 0.5 });

    TweenLite.to(origin, pointAnimationDur, {
      opacity: 1,
      scale: 1,
      ease: Elastic.easeOut.config(1.5, 0.5),
      delay: journeyStartingTime
    });
    TweenLite.to(path, journeyDur, {
      opacity: 1,
      strokeDashoffset: 0,
      delay: pathStartingTime
    });
    TweenLite.to(destiny, pointAnimationDur, {
      opacity: 1,
      scale: 1,
      ease: Elastic.easeOut.config(1.5, 0.5),
      delay: pathStartingTime + journeyDur
    });
  });
});

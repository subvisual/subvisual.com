import _random from "lodash/random"
import _round from "lodash/round"
import _uniqueId from "lodash/uniqueId"

export const generateAnimation = ({ delay, duration, startYAt, endYAt }) => ({
  name: _uniqueId("planet-animation-"),
  delay: delay || 0,
  duration: duration || _round(_random(0.8, 1.8), 2),
  startYAt: startYAt || 0,
  endYAt: endYAt || _random(-20, 20),
})

export const buildAnimationStyles = ({ delay, duration, name }) => ({
  animationName: name,
  animationDelay: `${delay}s`,
  animationDuration: `${duration}s`,
})

export default { generateAnimation, buildAnimationStyles }

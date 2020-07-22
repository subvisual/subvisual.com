import React from "react"
import PropTypes from "prop-types"

const AnimationStyle = ({ hovering, name, startYAt, endYAt }) => {
  if (!hovering) return null

  return (
    <style>
      {`@keyframes ${name} {
      0% {
        transform: translateY(${startYAt}px);
        -moz-transform: translateY(${startYAt}px)) rotate(-0.01deg);
      }

      100% {
        transform: translateY(${endYAt}px);
        -moz-transform: translateY(${endYAt}px) rotate(0.01deg);
      }
    }`}
    </style>
  )
}

AnimationStyle.propTypes = {
  hovering: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  startYAt: PropTypes.number.isRequired,
  endYAt: PropTypes.number.isRequired,
}

export default AnimationStyle

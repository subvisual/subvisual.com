import React from "react"
import PropTypes from "prop-types"

const HoveringAnimationStyle = ({ amplitude, hovering, name }) => {
  if (!hovering) return null

  return (
    <style>
      {`@keyframes ${name} {
      0% {
        transform: translateY(0);
        -moz-transform: translateY(0)) rotate(-0.01deg);
      }

      100% {
        transform: translateY(${amplitude}px);
        -moz-transform: translateY(${amplitude}px) rotate(0.01deg);
      }
    }`}
    </style>
  )
}

HoveringAnimationStyle.propTypes = {
  amplitude: PropTypes.number.isRequired,
  hovering: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
}

export default HoveringAnimationStyle

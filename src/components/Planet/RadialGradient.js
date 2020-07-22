import React from "react"
import PropTypes from "prop-types"

import colorCodes from "../colors"

const PlanetRadialGradient = ({ color, id }) => {
  const colorCode = colorCodes[color]

  return (
    <radialGradient
      id={id}
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="rotate(127.684 38.403 29.669) scale(81.6467 85.3669)"
    >
      <stop stopColor={colorCode} stopOpacity=".6" />
      <stop offset="1" stopColor={colorCode} />
    </radialGradient>
  )
}

PlanetRadialGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default PlanetRadialGradient

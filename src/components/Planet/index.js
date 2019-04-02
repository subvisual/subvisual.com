import React from "react"
import PropTypes from "prop-types"

import "./index.module.css"

const Planet = ({ color, size }) => (
  <div
    style={{ transform: `scale(${size / 100})` }}
    styleName={`root ${color}`}
  />
)

Planet.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}

export default Planet

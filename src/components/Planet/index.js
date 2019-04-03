import React from "react"
import PropTypes from "prop-types"

import "./index.module.css"

const Planet = ({ color, hovering, size }) => (
  <div
    style={{ transform: `scale(${size / 100})` }}
    styleName={`root ${color} ${hovering ? "hovering" : ""}`}
  />
)

Planet.propTypes = {
  color: PropTypes.string.isRequired,
  hovering: PropTypes.bool,
  size: PropTypes.number.isRequired,
}

Planet.propTypes = {
  hovering: false,
}

export default Planet

import React from "react"
import PropTypes from "prop-types"
import Color from "color"

import colorCodes from "../colors"

import "./index.module.css"

const gradientStyle = ({ color, size }) => {
  const end = colorCodes[color]
  const radius = size * 0.83
  const start = Color(end)
    .fade(0.4)
    .rgb()

  return `radial-gradient(${radius}px at 83% 15%, ${start} 0%, ${end} 100%)`
}

const Planet = props => {
  const { size } = props
  const rootStyle = {
    width: `${size}px`,
    height: `${size}px`,
  }
  const planetStyle = {
    background: gradientStyle(props),
  }

  return (
    <div style={rootStyle} styleName="root">
      <div style={planetStyle} styleName="planet" />
    </div>
  )
}

Planet.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}

export default Planet

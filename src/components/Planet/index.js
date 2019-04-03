import _ from "lodash"
import React, { Component } from "react"
import PropTypes from "prop-types"
import Color from "color"
import uuid from "uuid/v4"

import colorCodes from "../colors"

import "./index.module.css"

class Planet extends Component {
  constructor(props) {
    super(props)

    this.hoveringAmplitude = _.random(-10, 10)
    this.hoveringAnimationName = `planet-${uuid()}-hovering`
    this.hoveringAnimationDelay = _.random(0, 3)
    this.hoveringAnimationDuration = _.round(_.random(0.8, 1.8), 2)
  }

  get radialGradient() {
    const { color, size } = this.props
    const radius = Math.round(size * 0.83)
    const end = colorCodes[color]
    const start = Color(end)
      .fade(0.4)
      .rgb()
      .toString()

    return `radial-gradient(${radius}px at 83% 15%, ${start} 0%, ${end} 100%)`
  }

  get rootStyle() {
    const { hovering, size } = this.props
    const style = {
      width: `${size}px`,
      height: `${size}px`,
    }

    if (!hovering) return style

    return {
      ...style,
      animationName: this.hoveringAnimationName,
      nimationDelay: `${this.hoveringAnimationDelay}s`,
      animationDuration: `${this.hoveringAnimationDuration}s`,
      animationTimingFunction: "ease-in-out",
      animationDirection: "alternate",
      animationIterationCount: "infinite",
    }
  }

  render() {
    return (
      <>
        <style>
          {`@keyframes ${this.hoveringAnimationName} {
            0% {
              transform: translateY(0);
              -moz-transform: translateY(0)) rotate(-0.01deg);
            }

            100% {
              transform: translateY(${this.hoveringAmplitude}px);
              -moz-transform: translateY(${
                this.hoveringAmplitude
              }px) rotate(0.01deg);
            }
          }`}
        </style>
        <div style={this.rootStyle} styleName="root">
          <div styleName="background" />
          <div styleName="planet" style={{ background: this.radialGradient }} />
        </div>
      </>
    )
  }
}

Planet.propTypes = {
  color: PropTypes.string.isRequired,
  hovering: PropTypes.bool,
  size: PropTypes.number.isRequired,
}

Planet.defaultProps = {
  hovering: false,
}

export default Planet

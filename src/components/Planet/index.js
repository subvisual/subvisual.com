import _ from "lodash"
import React, { Component } from "react"
import PropTypes from "prop-types"
import uuid from "uuid/v4"

import colorCodes from "../colors"

import "./index.module.css"

class Planet extends Component {
  constructor(props) {
    super(props)

    this.hoveringAmplitude = _.random(-20, 20)
    this.hoveringAnimationName = this.hoveringAnimationDelay = _.random(0, 3)
    this.hoveringAnimationDuration = _.round(_.random(0.8, 1.8), 2)
  }

  getRootStyle = ({ animationName }) => {
    const { hovering } = this.props

    if (!hovering) return {}

    return {
      animationName,
      animationDelay: `${this.hoveringAnimationDelay}s`,
      animationDuration: `${this.hoveringAnimationDuration}s`,
      animationTimingFunction: "ease-in-out",
      animationDirection: "alternate",
      animationIterationCount: "infinite",
    }
  }

  renderRadialGradient = ({ id }) => {
    const color = colorCodes[this.props.color]

    return (
      <radialGradient
        id={id}
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(127.684 38.403 29.669) scale(81.6467 85.3669)"
      >
        <stop stopColor={color} stopOpacity=".6" />
        <stop offset="1" stopColor={color} />
      </radialGradient>
    )
  }

  render() {
    const planetUUID = uuid()
    const animationName = `planet-${planetUUID}-hovering`
    const radialID = `planet-${planetUUID}-radial`
    const rootStyle = this.getRootStyle({ animationName })

    return (
      <>
        <style>
          {`@keyframes ${animationName} {
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
        <div style={rootStyle} styleName="root">
          <div styleName="background" />
          <svg
            viewBox="0 0 104 104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            styleName="planet"
          >
            <circle cx="52" cy="52" r="50" fill={`url(#${radialID})`} />
            <defs>{this.renderRadialGradient({ id: radialID })}</defs>
          </svg>
        </div>
      </>
    )
  }
}

Planet.propTypes = {
  color: PropTypes.string.isRequired,
  hovering: PropTypes.bool,
}

Planet.defaultProps = {
  hovering: false,
}

export default Planet

import _ from "lodash"
import React, { Component } from "react"
import PropTypes from "prop-types"

import ViewableMonitor from "../ViewableMonitor"
import colorCodes from "../colors"

import "./index.module.css"
class Planet extends Component {
  constructor(props) {
    super(props)

    this.hoveringAmplitude = _.random(props.hoveringMin, props.hoveringMax)
    this.hoveringAnimationDuration = _.round(_.random(0.8, 1.8), 2)
  }

  getRootStyle = ({ animationName }) => {
    const { hovering } = this.props

    if (!hovering) return {}

    return {
      animationName,
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
        id="planet_paint"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(-27.95005 34.65125 -36.59612 -29.5188 46.68 8.266)"
      >
        <stop stopColor="#689DFD" />
        <stop offset="1" stopColor="#045CFC" />
      </radialGradient>
    )
  }

  render() {
    const { codeName, morph, hide } = this.props
    const animationName = `planet-${codeName}-hovering`
    const radialID = `planet-${codeName}-radial`
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
        <ViewableMonitor styleName="monitor">
          {(isViewable, amount) => {
            if (!isViewable || hide) return <div />

            return (
              <div
                id={codeName}
                {...morph}
                key={`${codeName}-planet`}
                style={rootStyle}
                styleName="root"
              >
                <svg
                  viewBox="0 0 56 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  styleName="planet"
                >
                  <ellipse
                    cx="28"
                    cy="26.814"
                    rx="28"
                    ry="26.814"
                    fill="url(#planet_paint)"
                  />
                  <defs>{this.renderRadialGradient({ id: radialID })}</defs>
                </svg>
              </div>
            )
          }}
        </ViewableMonitor>
      </>
    )
  }
}

Planet.propTypes = {
  codeName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  hide: PropTypes.bool,
  hovering: PropTypes.bool,
  morph: PropTypes.func,
  hoveringMax: PropTypes.number.isRequired,
  hoveringMin: PropTypes.number.isRequired,
}

Planet.defaultProps = {
  hovering: false,
  hoveringMax: 20,
  hoveringMin: -20,
  morph: () => {},
}

export default Planet

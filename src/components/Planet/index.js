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
      <g>
        <ellipse cx="122" cy="117.254" rx="112" ry="107.254" fill="url(#paint0_radial)"/>
        <defs>
          <radialGradient
            id={id}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(196.724 43.0636) rotate(128.89) scale(178.075 188.07)"
          >
            <stop stop-color={color} stop-opacity="0.6"/>
            <stop offset="1" stop-color={color}/>
          </radialGradient>
        </defs>
      </g>
    )
  }

  render() {
    const { codeName, morph } = this.props
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
          {isViewable => {
            if (!isViewable) return <div />

            return (
              <div {...morph} style={rootStyle} styleName="root">
                <div styleName="background" />
                <svg
                  viewBox="0 0 104 104"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  styleName="planet"
                >
                  <circle cx="52" cy="50" r="50" fill={`url(#${radialID})`} />
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

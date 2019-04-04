import React from "react"
import PropTypes from "prop-types"

import Planet from "../../../Planet"
import ViewableMonitor from "../../../ViewableMonitor"

import "./index.module.css"

const Universe = ({ subvisualPlanetMorph }) => (
  <div styleName="root">
    <ViewableMonitor styleName="planet">
      {isViewable => {
        if (!isViewable) return

        return (
          <Planet
            codeName="universeSubvisualPlanet"
            morph={subvisualPlanetMorph}
            color="blue"
          />
        )
      }}
    </ViewableMonitor>
    <svg viewBox="0 0 221 224" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient
          id="paint1_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(128.89 35.113 19.253) scale(21.6022 22.8147)"
        >
          <stop stopColor="#2421AB" stopOpacity=".6" />
          <stop offset="1" stopColor="#2421AB" />
        </radialGradient>
        <radialGradient
          id="paint2_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-6.78122 8.40707 -8.87898 -7.16188 34.619 132.354)"
        >
          <stop stopColor="#2421AB" stopOpacity=".6" />
          <stop offset="1" stopColor="#2421AB" />
        </radialGradient>
        <radialGradient
          id="paint3_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(128.89 88.022 72.354) scale(15.4302 16.2962)"
        >
          <stop stopColor="#2421AB" stopOpacity=".6" />
          <stop offset="1" stopColor="#2421AB" />
        </radialGradient>
        <radialGradient
          id="paint4_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(128.89 82.842 103.967) scale(21.6022 22.8147)"
        >
          <stop stopColor="#2421AB" stopOpacity=".6" />
          <stop offset="1" stopColor="#2421AB" />
        </radialGradient>
        <radialGradient
          id="paint5_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-27.12496 33.62834 -35.51577 -28.64738 117.604 179.978)"
        >
          <stop stopColor="#2421AB" stopOpacity=".6" />
          <stop offset="1" stopColor="#2421AB" />
        </radialGradient>
        <radialGradient
          id="paint6_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-22.28121 27.62327 -29.17367 -23.53178 37.213 30.621)"
        >
          <stop stopColor="#2421AB" stopOpacity=".6" />
          <stop offset="1" stopColor="#2421AB" />
        </radialGradient>
      </defs>
      <ellipse
        cx="63.079"
        cy="13.011"
        rx="13.587"
        ry="13.011"
        fill="url(#paint1_radial)"
      />
      <ellipse
        cx="30.086"
        cy="136.854"
        rx="6.793"
        ry="6.506"
        fill="url(#paint2_radial)"
      />
      <ellipse
        cx="193.127"
        cy="55.696"
        rx="9.705"
        ry="9.294"
        fill="url(#paint3_radial)"
      />
      <ellipse
        cx="206.712"
        cy="113.76"
        rx="13.587"
        ry="13.011"
        fill="url(#paint4_radial)"
      />
      <ellipse
        cx="99.474"
        cy="197.978"
        rx="27.173"
        ry="26.022"
        fill="url(#paint5_radial)"
      />
      <ellipse
        cx="22.321"
        cy="45.407"
        rx="22.321"
        ry="21.375"
        fill="url(#paint6_radial)"
      />
    </svg>
  </div>
)

Universe.propTypes = {
  subvisualPlanetMorph: PropTypes.func,
}

Universe.defaultProps = {
  subvisualPlanetMorph: () => {},
}

export default Universe

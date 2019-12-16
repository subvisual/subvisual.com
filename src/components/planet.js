import _random from "lodash/random"
import _round from "lodash/round"
import React from "react"
import PropTypes from "prop-types"

import HoveringAnimationStyle from "./planet/hovering_animation_style"
import RadialGradient from "./planet/radial_gradient"

import styles from "./planet.module.css"

const Planet = ({
  codeName,
  morph,
  hide,
  hovering,
  hoveringMin,
  hoveringMax,
  color,
}) => {
  const hoveringAmplitude = _random(hoveringMin, hoveringMax)
  const hoveringAnimationDuration = _round(_random(0.8, 1.8), 2)
  const animationName = `planet-${codeName}-hovering`
  const radialID = `planet-${codeName}-radial`
  const style = {
    animationName,
    animationDuration: `${hoveringAnimationDuration}s`,
  }

  if (hide) return <div />

  return (
    <>
      <HoveringAnimationStyle
        amplitude={hoveringAmplitude}
        hovering={hovering}
        name={animationName}
      />

      <div
        id={codeName}
        key={`${codeName}-planet`}
        style={style}
        className={styles.root}
        {...morph}
      >
        <svg
          viewBox="0 0 104 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.planet}
        >
          <circle cx="52" cy="50" r="50" fill={`url(#${radialID})`} />
        </svg>
      </div>

      <svg>
        <defs>
          <defs>
            <RadialGradient color={color} id={radialID} />
          </defs>
        </defs>
      </svg>
    </>
  )
}

Planet.propTypes = {
  codeName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  hide: PropTypes.bool,
  hovering: PropTypes.bool,
  morph: PropTypes.func,
  hoveringMax: PropTypes.number,
  hoveringMin: PropTypes.number,
}

Planet.defaultProps = {
  hovering: false,
  hoveringMax: 20,
  hoveringMin: -20,
  morph: () => {},
}

export default Planet

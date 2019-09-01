import React from "react"
import PropTypes from "prop-types"
import _random from "lodash/random"
import _round from "lodash/round"

import HoveringAnimationStyle from "./planet/hovering_animation_style"
import RadialGradient from "./planet/radial_gradient"
import ViewableMonitor from "./planet/viewable_monitor"

import styles from "./planet.module.css"

const Planet = ({
  codeName,
  color,
  hovering,
  hoveringMin,
  hoveringMax,
  morph,
}) => {
  const hoveringAmplitude = _random(hoveringMin, hoveringMax)
  const hoveringAnimationDuration = _round(_random(0.8, 1.8), 2)
  const animationName = `planet-${codeName}-hovering`
  const radialID = `planet-${codeName}-radial`
  const style = {
    animationName,
    animationDuration: `${hoveringAnimationDuration}s`,
  }

  return (
    <>
      <HoveringAnimationStyle
        amplitude={hoveringAmplitude}
        hovering={hovering}
        name={animationName}
      />
      <ViewableMonitor>
        <div {...morph} style={style} className={styles.root}>
          <div className={styles.background} />
          <svg
            viewBox="0 0 104 104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.planet}
          >
            <circle cx="52" cy="50" r="50" fill={`url(#${radialID})`} />
            <defs>
              <RadialGradient color={color} id={radialID} />
            </defs>
          </svg>
        </div>
      </ViewableMonitor>
    </>
  )
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

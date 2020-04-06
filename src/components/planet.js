import React from "react"
import PropTypes from "prop-types"
import _uniqueId from "lodash/uniqueId"

import {
  generateAnimation,
  buildAnimationStyles,
} from "./planet/animation_utils"
import AnimationStyle from "./planet/animation_style"
import RadialGradient from "./planet/radial_gradient"
import { withMorphStyle } from "../utils/morph_utils"

import styles from "./planet.module.css"

const Planet = ({ color, hoverAnimation, hovering, morph }) => {
  const animation = generateAnimation(hoverAnimation)
  const animationStyle = buildAnimationStyles(animation)
  const [rootStyle, newMorph] = withMorphStyle(morph, animationStyle)
  const radialID = _uniqueId("planet-radial-")

  return (
    <>
      <AnimationStyle {...animation} hovering={hovering} />

      <div className={styles.root} style={rootStyle} {...newMorph}>
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
    </>
  )
}

Planet.propTypes = {
  color: PropTypes.string.isRequired,
  hoverAnimation: PropTypes.shape({
    delay: PropTypes.number,
    duration: PropTypes.number,
    endYAt: PropTypes.number,
  }),
  hovering: PropTypes.bool,
  morph: PropTypes.func,
}

Planet.defaultProps = {
  hoverAnimation: {},
  hovering: false,
  morph: () => {},
}

export default Planet

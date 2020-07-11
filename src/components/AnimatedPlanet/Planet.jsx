import React from "react"
import PropTypes from "prop-types"
import _uniqueId from "lodash/uniqueId"
import { motion } from "framer-motion"

import Background from "./Planet/Background"

import styles from "./Planet.module.scss"

const Planet = ({ animate, children, initial, transition }) => {
  const radialGradientID = _uniqueId("animated-planet-radial-gradient-")

  return (
    <motion.div
      className={styles.root}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      <svg
        className={styles.image}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
        <circle cx="50" cy="50" r="50" fill={`url(#${radialGradientID})`} />

        <defs>
          <radialGradient
            id={radialGradientID}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(127.684 38.403 29.669) scale(81.6467 85.3669)"
          >
            <stop stopColor="#045cfc" stopOpacity=".6" />
            <stop offset="1" stopColor="#045cfc" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

Planet.propTypes = {
  animate: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  initial: PropTypes.object.isRequired,
  transition: PropTypes.object,
}

Planet.Background = Background

export default Planet

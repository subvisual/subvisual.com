import React from "react"
import PropTypes from "prop-types"

import AnimatedLetters from "./title/animated_letters"

import styles from "./title.module.scss"

const HeroTitle = ({ hidden, planetMorph }) => (
  <h1 className={styles.root}>
    <span className="visuallyHidden">We nurture ideas that empower people</span>
    <span aria-hidden="true">
      <AnimatedLetters {...{ hidden, planetMorph }} />
    </span>
  </h1>
)

HeroTitle.propTypes = {
  hidden: PropTypes.bool,
  planetMorph: PropTypes.func,
}

HeroTitle.defaultProps = {
  hidden: false,
  planetMorph: () => {},
}

export default HeroTitle

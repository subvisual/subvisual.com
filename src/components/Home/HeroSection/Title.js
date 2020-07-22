import React from "react"
import PropTypes from "prop-types"

import useDetectJavascript from "src/utils/useDetectJavascript"
import AnimatedLetters from "./Title/AnimatedLetters"

import styles from "./Title.module.scss"

const HeroTitle = ({ hidden, planetMorph }) => {
  const hasJavascript = useDetectJavascript()

  if (!hasJavascript) {
    return <h1 className={styles.root}>We nurture ideas that empower people</h1>
  }

  return (
    <h1 className={styles.root}>
      <span className="visuallyHidden">
        We nurture ideas that empower people
      </span>
      <span aria-hidden="true">
        <AnimatedLetters {...{ hidden, planetMorph }} />
      </span>
    </h1>
  )
}

HeroTitle.propTypes = {
  hidden: PropTypes.bool,
  planetMorph: PropTypes.func,
}

HeroTitle.defaultProps = {
  hidden: false,
  planetMorph: () => {},
}

export default HeroTitle
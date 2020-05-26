import React from "react"

import useDetectJavascript from "src/utils/use_detect_javascript"
import AnimatedLetters from "./title/animated_letters"

import styles from "./title.module.scss"

const HeroTitle = () => {
  const hasJavascript = useDetectJavascript()

  if (!hasJavascript) {
    return <h1 className={styles.root}>Always looking for talented people</h1>
  }

  return (
    <h1 className={styles.root}>
      <span className="visuallyHidden">Always looking for talented people</span>
      <span aria-hidden="true">
        <AnimatedLetters />
      </span>
    </h1>
  )
}

export default HeroTitle

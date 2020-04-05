import React from "react"
import PropTypes from "prop-types"
import { motion } from "framer-motion"

import Planet from "../../planet"
import useDetectJavascript from "../../../utils/use_detect_javascript"

import styles from "./title.module.css"

const letterVariants = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
}

const dragVariants = {
  in: {
    opacity: 1,
    transition: {
      ease: "easeIn",
      delay: 1.5,
      delayChildren: 1.5,
      staggerChildren: 0.04,
    },
  },
  out: {
    opacity: 0,
  },
}

const Title = ({ planetMorph, hide }) => {
  const hasJavascript = useDetectJavascript()

  function renderAnimatedLetters(string) {
    return Array.from(string).map((letter, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <motion.span key={index} variants={letterVariants}>
        {letter}
      </motion.span>
    ))
  }

  function renderDotless() {
    return (
      <motion.span variants={letterVariants}>
        {hasJavascript ? <>&#305;</> : "i"}
      </motion.span>
    )
  }

  return (
    <>
      <h1 className="visuallyHidden">We nurture ideas that empower people</h1>
      <h1 className={styles.root} aria-hidden="true">
        <motion.span
          variants={dragVariants}
          animate={hide ? "out" : "in"}
          key="without-files"
        >
          {renderAnimatedLetters("We nurture")}{" "}
          <span className={styles.ideas}>
            {renderDotless()}
            {renderAnimatedLetters("deas")}
            <span className={styles.planet}>
              <Planet
                hide={hide}
                morph={planetMorph}
                color="blue"
                hoverAnimation={{
                  delay: 4.8,
                  duration: 1.5,
                  endYAt: -4,
                }}
                hovering
              />
            </span>
          </span>{" "}
          <span className={styles.glue}>
            {renderAnimatedLetters("that empower")}
          </span>{" "}
          {renderAnimatedLetters("people")}
        </motion.span>{" "}
      </h1>
    </>
  )
}

Title.propTypes = {
  planetMorph: PropTypes.func,
}

Title.defaultProps = {
  planetMorph: () => {},
}

export default Title

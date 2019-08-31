import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import Planet from "../../planet"
import useDetectJavascript from "../../../utils/use_detect_javascript"

import styles from "./title.module.css"

const Title = ({ planetMorph }) => {
  const hasJavascript = useDetectJavascript()
  const className = classnames(styles.root, {
    [styles.withTittle]: !hasJavascript,
  })

  if (!hasJavascript)
    return (
      <h1 className={className}>
        We nurture <span styleName="ideas">ideas</span>{" "}
        <span styleName="glue">that empower</span> people
      </h1>
    )

  return (
    <h1 className={className}>
      We nurture{" "}
      <span className={styles.ideas}>
        ideas
        <span className={styles.planet}>
          <Planet morph={planetMorph} codeName="heroTittle" color="blue" />
        </span>
      </span>{" "}
      <span className={styles.glue}>that empower</span> people
    </h1>
  )
}

Title.propTypes = {
  planetMorph: PropTypes.func,
}

Title.defaultProps = {
  planetMorph: () => {},
}

export default Title

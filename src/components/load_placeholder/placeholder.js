import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import styles from "./placeholder.module.css"

const Placeholder = ({ dark, delay, visible }) => {
  const className = classNames(styles.root, {
    [styles.dark]: dark,
    [styles.visible]: visible,
  })

  return <div style={{ transitionDelay: `${delay}s` }} className={className} />
}

Placeholder.propTypes = {
  dark: PropTypes.bool,
  delay: PropTypes.number,
  visible: PropTypes.bool,
}

Placeholder.defaultProps = {
  dark: false,
  delay: 0,
  visible: false,
}

export default Placeholder

import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import styles from "./Placeholder.module.css"

const Placeholder = ({ dark, delay, id, visible }) => {
  const className = classNames(styles.root, {
    [styles.dark]: dark,
    [styles.visible]: visible,
  })

  return (
    <div
      className={className}
      id={id}
      style={{ transitionDelay: `${delay}s` }}
    />
  )
}

Placeholder.propTypes = {
  dark: PropTypes.bool,
  delay: PropTypes.number,
  id: PropTypes.string,
  visible: PropTypes.bool,
}

Placeholder.defaultProps = {
  dark: false,
  delay: 0,
  visible: false,
}

export default Placeholder

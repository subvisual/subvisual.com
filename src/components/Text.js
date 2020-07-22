import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import styles from "./Text.module.css"

const Text = ({ bold, color, children, size }) => {
  const className = classNames(styles.root, styles[color], styles[size], {
    [styles.bold]: bold,
  })

  return <span className={className}>{children}</span>
}

Text.propTypes = {
  bold: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
}

Text.defaultProps = {
  bold: false,
  size: "regular",
}

export default Text

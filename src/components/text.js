import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import styles from "./text.module.css"

const Text = ({ bold, color, children, size, as, ...props }) => {
  const className = classNames(styles.root, styles[color], styles[size], {
    [styles.bold]: bold,
  })
  const AsTag = as

  return (
    <AsTag {...props} className={className}>
      {children}
    </AsTag>
  )
}

Text.propTypes = {
  bold: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
  as: PropTypes.oneOfType([
    PropTypes.oneOf(["p", "span", "a"]),
    PropTypes.func,
  ]),
}

Text.defaultProps = {
  bold: false,
  size: "regular",
  as: "span",
}

export default Text

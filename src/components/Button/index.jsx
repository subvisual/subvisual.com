import React from "react"
import PropTypes from "prop-types"

import Text from "~/src/components/Text"

import * as styles from "./index.module.scss"

function Button({ size, to, children }) {
  return (
    <a href={to} className={styles.root}>
      <Text size={size}>{children}</Text>
    </a>
  )
}

Button.propTypes = {
  size: PropTypes.string,
  to: PropTypes.string.isRequired,
}

export default Button

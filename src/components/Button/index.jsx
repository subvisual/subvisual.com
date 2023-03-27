import React from "react"
import PropTypes from "prop-types"

import Text from "~/src/components/Text"

import * as styles from "./index.module.css"

function Button({ size, to, children }) {
  return (
    <Text size={size}>
      <a href={to} className={styles.root}>
        {children}
      </a>
    </Text>
  )
}

Button.propTypes = {
  size: PropTypes.string,
  to: PropTypes.string.isRequired,
}

export default Button

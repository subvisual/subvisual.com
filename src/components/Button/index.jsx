import React from "react"
import PropTypes from "prop-types"

import Text from "~/src/components/Text"

function Button({ size, to, className, children }) {
  return (
    <a href={to} className={className}>
      <Text size={size}>{children}</Text>
    </a>
  )
}

Button.propTypes = {
  size: PropTypes.string,
  to: PropTypes.string.isRequired,
}

export default Button

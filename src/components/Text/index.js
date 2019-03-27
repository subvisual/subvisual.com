import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import "./index.css"

const Text = ({ children, darkBlue, large, small, white }) => {
  const className = classNames({
    Text: true,
    "Text--darkBlue": darkBlue,
    "Text--large": large,
    "Text--small": small,
    "Text--white": white,
  })

  return <span className={className}>{children}</span>
}

Text.propTypes = {
  darkBlue: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  white: PropTypes.bool,
}

Text.defaultProps = {
  darkBlue: false,
  large: false,
  small: false,
  white: false,
}

export default Text

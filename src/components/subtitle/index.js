import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import "./index.css"

const Subtitle = ({ children, white }) => {
  const className = classNames({
    Subtitle: true,
    "Subtitle--white": white,
  })

  return <h3 className={className}>{children}</h3>
}

Subtitle.propTypes = {
  white: PropTypes.bool,
}

Subtitle.defaultProps = {
  white: false,
}

export default Subtitle

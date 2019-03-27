import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import "./index.css"

const Title = ({ children, darkBlue }) => {
  const className = classNames({
    Title: true,
    "Title--darkBlue": darkBlue,
  })

  return <h2 className={className}>{children}</h2>
}

Title.propTypes = {
  darkBlue: PropTypes.bool,
}

Title.defaultProps = {
  darkBlue: false,
}

export default Title

import React from "react"
import PropTypes from "prop-types"

import "./index.module.css"

const Text = ({ bold, color, children, size }) => {
  const styleNames = ["root", bold ? "bold" : false, color, size]
  const styleName = styleNames.filter(Boolean).join(" ")

  return <span styleName={styleName}>{children}</span>
}

Text.propTypes = {
  bold: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
}

Text.defaultProps = {
  bold: false,
  color: "black",
  size: "regular",
}

export default Text

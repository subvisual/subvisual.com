import React from "react"
import PropTypes from "prop-types"

import "./index.module.css"

const CallToAction = ({ color, children, size }) => (
  <a href="mailto:contact@subvisual.com" styleName={`root ${color} ${size}`}>
    {children}
  </a>
)

CallToAction.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

CallToAction.defaultProps = {
  color: "blue",
  size: "regular",
}

export default CallToAction

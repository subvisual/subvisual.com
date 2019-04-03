import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "./index.module.css"

const CallToAction = ({ color, children, size }) => (
  <Link to="mailto:contact@subvisual.com" styleName={`root ${color} ${size}`}>
    {children}
  </Link>
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

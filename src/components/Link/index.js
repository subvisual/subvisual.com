import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"

import "./index.module.css"

const Link = ({ children, size, title, to }) => (
  <GatsbyLink to={to} title={title} styleName={`root ${size}`}>
    {children}
  </GatsbyLink>
)

Link.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string.isRequired,
}

Link.defaultProps = {
  size: "regular",
}

export default Link

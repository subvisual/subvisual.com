import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"

import "./index.module.css"

const Link = ({ color, faded, children, size, title, to }) => {
  const styleNames = ["root", size, color, faded ? "faded" : null]
  const styleName = styleNames.filter(Boolean).join(" ")

  return (
    <GatsbyLink to={to} title={title} styleName={styleName}>
      {children}
    </GatsbyLink>
  )
}

Link.propTypes = {
  color: PropTypes.string,
  faded: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string.isRequired,
}

Link.defaultProps = {
  color: "black",
  faded: false,
  size: "regular",
}

export default Link

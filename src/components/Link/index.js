import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"

import "./index.module.css"

const Link = ({ blank, children, color, faded, internal, size, title, to }) => {
  const styleNames = ["root", size, color, faded ? "faded" : null]
  const styleName = styleNames.filter(Boolean).join(" ")

  let attrs = {
    title,
  }

  if (blank) {
    attrs.target = "_blank"
    attrs.rel = "noopener noreferrer"
  }

  if (internal) {
    return (
      <GatsbyLink to={to} {...attrs} styleName={styleName}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={to} {...attrs} styleName={styleName}>
      {children}
    </a>
  )
}

Link.propTypes = {
  blank: PropTypes.bool,
  color: PropTypes.string,
  faded: PropTypes.bool,
  internal: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string.isRequired,
}

Link.defaultProps = {
  blank: false,
  color: "black",
  faded: false,
  internal: false,
  size: "regular",
}

export default Link

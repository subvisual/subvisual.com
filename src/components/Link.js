import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"
import classNames from "classnames"

import styles from "./Link.module.css"

const Link = ({ blank, children, faded, internal, size, title, to }) => {
  const className = classNames(styles.root, styles[size], {
    [styles.faded]: faded,
  })

  const attrs = {
    title,
  }

  if (blank) {
    attrs.target = "_blank"
    attrs.rel = "noopener noreferrer"
  }

  if (internal) {
    return (
      <GatsbyLink to={to} {...attrs} className={className}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={to} {...attrs} className={className}>
      {children}
    </a>
  )
}

Link.propTypes = {
  blank: PropTypes.bool,
  faded: PropTypes.bool,
  internal: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string.isRequired,
}

Link.defaultProps = {
  blank: false,
  faded: false,
  internal: false,
  size: "regular",
}

export default Link

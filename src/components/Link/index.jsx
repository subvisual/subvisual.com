import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"
import classNames from "classnames"

import Text from "~/src/components/Text"

import * as styles from "./index.module.css"

function Link({ blank, children, download, faded, internal, size, title, to }) {
  const className = classNames(styles.root, {
    [styles.faded]: faded,
  })

  const attrs = {
    download,
    title,
  }

  if (blank) {
    attrs.target = "_blank"
    attrs.rel = "noopener noreferrer"
  }

  if (internal) {
    return (
      <Text size={size}>
        <GatsbyLink to={to} {...attrs} className={className}>
          {children}
        </GatsbyLink>
      </Text>
    )
  }

  return (
    <Text size={size}>
      <a href={to} {...attrs} className={className}>
        {children}
      </a>
    </Text>
  )
}

Link.propTypes = {
  blank: PropTypes.bool,
  download: PropTypes.string,
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

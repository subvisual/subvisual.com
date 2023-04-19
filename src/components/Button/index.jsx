import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import Text from "~/src/components/Text"

import * as styles from "./index.module.scss"

function Button({ onClick, href, children }) {
  if (onClick) {
    return (
      <button className={styles.root} onClick={onClick} type="button">
        <Text>{children}</Text>
      </button>
    )
  }

  if (!href) return null

  return (
    <a href={href} className={classNames(styles.root, styles.link)}>
      <Text>{children}</Text>
    </a>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button

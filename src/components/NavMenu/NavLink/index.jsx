import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import Link from "~/src/components/Link"

import * as styles from "./index.module.scss"

function NavLink({ active, children, to }) {
  const className = classNames(styles.root, {
    [styles.active]: active,
  })

  return (
    <div className={className}>
      <Link to={to}>{children}</Link>
    </div>
  )
}

NavLink.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
}

export default NavLink

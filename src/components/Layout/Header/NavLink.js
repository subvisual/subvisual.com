import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import Link from "src/components/link"

import styles from "./NavLink.module.scss"

const HeaderNavLink = ({ active, blank, children, title, to }) => {
  const className = classNames(styles.root, {
    [styles.active]: active,
  })

  return (
    <span className={className}>
      <Link to={to} title={title} className={styles.link} blank={blank}>
        {children}
      </Link>
    </span>
  )
}

HeaderNavLink.propTypes = {
  active: PropTypes.bool,
  blank: PropTypes.bool,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

HeaderNavLink.defaultProps = {
  active: false,
  blank: false,
}

export default HeaderNavLink

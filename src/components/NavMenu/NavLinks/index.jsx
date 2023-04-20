import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import Button from "../../Button"
import NavLink from "../NavLink"

import * as styles from "./index.module.scss"

const PATHS = [
  { name: "Services", path: "/services/" },
  { name: "Ventures", path: "/ventures/" },
  { name: "People", path: "/people/" },
  { name: "Blog", path: "/blog/" },
]

function NavLinks({ isDesktop }) {
  return (
    <nav>
      <ul
        className={classNames(styles.root, { [styles.isDesktop]: isDesktop })}
      >
        {PATHS.map(({ name, path }) =>
          name === "Blog" ? (
            <li key={name}>
              <NavLink active to={path}>
                {name}
              </NavLink>
            </li>
          ) : (
            <li key={name}>
              <NavLink to={path}>{name}</NavLink>
            </li>
          )
        )}
        <li>
          <Button href="mailto:contact@subvisual.com">Contact Us</Button>
        </li>
      </ul>
    </nav>
  )
}

NavLinks.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
}

export default NavLinks

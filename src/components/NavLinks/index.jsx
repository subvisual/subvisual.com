import React from "react"

import Button from "../Button"
import NavLink from "../NavLink"

import * as styles from "./index.module.scss"
import { PATHS } from "../../constants"

function NavLinks() {
  return (
    <nav>
      <ul className={styles.root}>
        {PATHS.map(({ name, path }) =>
          name === "Blog" ? (
            <li>
              <NavLink active to={path}>
                {name}
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to={path}>{name}</NavLink>
            </li>
          )
        )}
        <li>
          <Button className={styles.button} to="mailto:contact@subvisual.com">
            Contact Us
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default NavLinks

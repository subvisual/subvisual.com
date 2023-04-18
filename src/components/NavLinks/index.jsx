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

export default NavLinks

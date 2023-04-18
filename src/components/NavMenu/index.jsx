import React, { useState } from "react"

import MenuClose from "./MenuClose"
import MenuOpen from "./MenuOpen"
import Button from "../Button"
import NavLink from "../NavLink"

import * as styles from "./index.module.scss"
import { PATHS } from "../../constants"

function NavMenu() {
  const [toggle, setToggle] = useState(false)

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.menu}
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? <MenuClose /> : <MenuOpen />}
      </button>
      {toggle && (
        <ul className={styles.list}>
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
          <li className={styles.link}>
            <Button href="mailto:contact@subvisual.com">Contact Us</Button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default NavMenu

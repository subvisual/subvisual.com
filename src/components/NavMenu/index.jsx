import PropTypes from "prop-types"
import React, { useState } from "react"

import MenuClose from "./MenuClose"
import MenuOpen from "./MenuOpen"
import NavLinks from "./NavLinks"

import * as styles from "./index.module.scss"

function NavMenu({ isDesktop }) {
  const [toggle, setToggle] = useState(false)

  return (
    <div className={styles.root}>
      {!isDesktop && (
        <>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <MenuClose /> : <MenuOpen />}
          </button>
          {toggle && <NavLinks />}
        </>
      )}
      {isDesktop && <NavLinks isDesktop />}
    </div>
  )
}

NavLinks.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
}

export default NavMenu

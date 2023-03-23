import React from "react"

import useWindowState from "../../hooks/useWindowState"

import Logo from "../Logo"
import NavLinks from "../NavLinks"
import NavMenu from "../NavMenu"

import * as styles from "./index.module.scss"

function Header() {
  const { scrollY, innerWidth } = useWindowState()

  const isDesktop = innerWidth > 950
  const isScrolled = scrollY > 756

  return (
    <header className={isScrolled ? styles.isScrolled : styles.root}>
      <Logo />
      {isDesktop ? <NavLinks /> : <NavMenu />}
    </header>
  )
}

export default Header

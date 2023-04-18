import React from "react"

import useDetectJavascript from "~/src/utils/use_detect_javascript"
import useWindowState from "../../hooks/useWindowState"

import Logo from "../Logo"
import NavLinks from "../NavLinks"
import NavMenu from "../NavMenu"

import * as styles from "./index.module.scss"

function Header() {
  const hasJavascript = useDetectJavascript()
  const { scrollY, innerWidth } = useWindowState()

  const isDesktop = hasJavascript ? innerWidth > 950 : 0
  const isScrolled = hasJavascript ? scrollY > 756 : 0

  return (
    <header className={isScrolled ? styles.isScrolled : styles.root}>
      <Logo />
      {isDesktop ? <NavLinks /> : <NavMenu />}
    </header>
  )
}

export default Header

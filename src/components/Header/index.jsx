import React from "react"
import classNames from "classnames"

import useDetectJavaScript from "~/src/hooks/useDetectJavaScript"
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
    <header
      className={classNames(styles.root, { [styles.isScrolled]: isScrolled })}
    >
      <Logo />
      {isDesktop ? <NavLinks /> : <NavMenu />}
    </header>
  )
}

function WrappedHeader() {
  const hasJavaScript = useDetectJavaScript()

  if (!hasJavaScript) return null

  return <Header />
}

export default WrappedHeader

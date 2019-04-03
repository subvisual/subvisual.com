import React from "react"

import Link from "../Link"
import Logo from "../Logo"

import "./Header.module.css"

const Header = () => (
  <header styleName="root">
    <div styleName="content">
      <div styleName="logo">
        <Logo />
      </div>
      <nav>
        <ul styleName="links">
          <li styleName="link-item">
            <Link
              to="https://medium.com/subvisual"
              title="Blog"
              styleName="link"
              blank
            >
              Blog
            </Link>
          </li>
          <li styleName="link-item">
            <Link
              to="mailto:contact@subvisual.com"
              title="Contact"
              styleName="link"
              blank
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

export default Header

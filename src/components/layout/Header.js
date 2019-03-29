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
            <Link to="#" title="Blog" styleName="link">
              Blog
            </Link>
          </li>
          <li styleName="link-item">
            <Link to="#" title="Contact" styleName="link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

export default Header

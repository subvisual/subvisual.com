import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Logo from "../logo"
import styles from "./header.module.css"

const Header = () => (
  <header styleName="root">
    <div styleName="content">
      <div>
        <div styleName="logo">
          <Logo />
        </div>
      </div>
      <div>
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
    </div>
  </header>
)

export default Header

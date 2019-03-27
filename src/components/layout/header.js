import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Logo from "../logo"
import "./header.css"

const Header = () => (
  <header className="Header">
    <div className="Header-content">
      <div className="Header-left">
        <Logo />
      </div>
      <div className="Header-right">
        <nav>
          <ul className="Header-links">
            <li className="Header-link">
              <Link to="#">Blog</Link>
            </li>
            <li className="Header-link">
              <Link to="#">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
)

export default Header

import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "./header.css"
import logo from "../../images/subvisual-logo-blue.svg"

const Header = () => (
  <header className="Header">
    <div className="Header-content">
      <div className="Header-left">
        <Link to="/">
          <img src={logo} alt="Subvisual" className="Header-logo" />
        </Link>
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

import React from "react"
import PropTypes from "prop-types"

import NavLink from "./Header/NavLink"

import styles from "./Header.module.scss"

const BLOG_PATH = "/blog/"

const Header = ({ currentPath, renderLogo }) => (
  <header className={styles.root}>
    <div className={styles.content}>
      <div className={styles.logo}>{renderLogo()}</div>
      <nav>
        <ul className={styles.navLinks}>
          <li className={styles.navLink}>
            <NavLink
              active={currentPath === BLOG_PATH}
              to={BLOG_PATH}
              title="Blog"
            >
              Blog
            </NavLink>
          </li>
          <li className={styles.navLink}>
            <NavLink to="mailto:contact@subvisual.com" title="Contact" blank>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  currentPath: PropTypes.string.isRequired,
  renderLogo: PropTypes.func.isRequired,
}

export default Header

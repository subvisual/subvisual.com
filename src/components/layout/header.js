import React from "react"
import PropTypes from "prop-types"

import Link from "../link"

import styles from "./header.module.css"

const Header = ({ renderLogo }) => (
  <header className={styles.root}>
    <div className={styles.content}>
      <div className={styles.logo}>{renderLogo()}</div>
      <nav>
        <ul className={styles.links}>
          <li className={styles.linkItem}>
            <Link
              to="https://medium.com/subvisual"
              title="Blog"
              className={styles.link}
              blank
            >
              Blog
            </Link>
          </li>
          <li className={styles.linkItem}>
            <Link
              to="mailto:contact@subvisual.com"
              title="Contact"
              className={styles.link}
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

Header.propTypes = {
  renderLogo: PropTypes.func.isRequired,
}

export default Header

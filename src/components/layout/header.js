import React from "react"

import Link from "../link"
import Logo from "../logo"

import styles from "./header.module.css"

const Header = () => (
  <header className={styles.root}>
    <div className={styles.content}>
      <div className={styles.logo}>
        <Logo />
      </div>
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

export default Header

import React from "react"

import NewsletterCTA from "../NewsletterCTA"
import FooterGrid from "../FooterGrid"

import * as styles from "./index.module.scss"

function Footer() {
  return (
    <footer className={styles.root}>
      <NewsletterCTA />
      <FooterGrid />
    </footer>
  )
}

export default Footer

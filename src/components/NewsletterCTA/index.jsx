import React from "react"
import Button from "../Button"

import * as styles from "./index.module.css"

function NewsletterCTA() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.text}>
          Dig <span>your</span>
          <br /> curiosity with <span>us</span>
        </p>
        <Button to="/">Subscribe our newsletter</Button>
      </div>
    </div>
  )
}

export default NewsletterCTA

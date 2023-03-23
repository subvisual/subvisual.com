import React from "react"
import Button from "../Button"

import * as styles from "./index.module.scss"

function NewsletterCTA() {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <p className={styles.text}>
          Dig <span>your</span>
          <br /> curiosity with <span>us</span>
        </p>
        <Button
          className={styles.button}
          to="mailto:contact@subvisual.com?subject=Hi%20Subvisual!%20I%20want%20to%20keep%20in%20touch"
        >
          Keep in touch with us
        </Button>
      </div>
    </div>
  )
}

export default NewsletterCTA

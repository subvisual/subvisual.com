import React from "react"

import * as styles from "./index.module.scss"

export default function SectionTitle({ children }) {
  return <h2 className={styles.root}>{children}</h2>
}

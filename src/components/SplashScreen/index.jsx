import React, { forwardRef } from "react"

import styles from "./index.module.css"

const SplashScreen = forwardRef((_props, ref) => (
  <div ref={ref} className={styles.root} />
))

export default SplashScreen

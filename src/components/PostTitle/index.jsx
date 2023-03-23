import React from "react"

import * as styles from "./index.module.scss"

function PostTitle({ children }) {
  return <h1 className={styles.root}>{children}</h1>
}

export default PostTitle

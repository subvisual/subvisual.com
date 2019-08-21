import React from "react"
import classnames from "classnames"

import styles from "./page_title.module.css"

const PageTitle = ({ children, withTittle }) => {
  const className = classnames(styles.root, { [styles.withTittle]: withTittle })

  return <h1 className={className}>{children}</h1>
}

export default PageTitle

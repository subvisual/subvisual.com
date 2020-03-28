import React from "react"
import PropTypes from "prop-types"

import styles from "./page_title.module.scss"

const PageTitle = ({ children }) => <h1 className={styles.root}>{children}</h1>

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageTitle

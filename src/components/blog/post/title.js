import React from "react"
import PropTypes from "prop-types"

import styles from "./title.module.css"

const BlogPostTitle = ({ children }) => (
  <h1 className={styles.root}>{children}</h1>
)

BlogPostTitle.propTypes = {
  children: PropTypes.node,
}

export default BlogPostTitle

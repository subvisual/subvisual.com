import React from "react"
import PropTypes from "prop-types"

import BlogPostWrapper from "./wrapper"

import styles from "./body_wrapper.module.css"

const BlogPostBodyWrapper = ({ children }) => (
  <BlogPostWrapper>
    <div className={styles.content}>{children}</div>
  </BlogPostWrapper>
)

BlogPostBodyWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BlogPostBodyWrapper

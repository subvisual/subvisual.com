import React from "react"
import PropTypes from "prop-types"

import PageWideWrapper from "../../page_wide_wrapper"

import styles from "./wrapper.module.css"

const BlogPostWrapper = ({ children, padded }) => (
  <PageWideWrapper {...{ padded }}>
    <div className={styles.content}>{children}</div>
  </PageWideWrapper>
)

BlogPostWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
}

BlogPostWrapper.defaultProps = {
  padded: false,
}

export default BlogPostWrapper

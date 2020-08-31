import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import PageWideWrapper from "~/src/components/page_wide_wrapper"

import styles from "./wrapper.module.css"

const BlogPostWrapper = ({ children, className, padded }) => {
  const contentClassName = classNames(styles.content, className)

  return (
    <PageWideWrapper {...{ padded }}>
      <div className={contentClassName}>{children}</div>
    </PageWideWrapper>
  )
}

BlogPostWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padded: PropTypes.bool,
}

BlogPostWrapper.defaultProps = {
  padded: false,
}

export default BlogPostWrapper

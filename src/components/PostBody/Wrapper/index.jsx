import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import * as styles from "./index.module.scss"

function BlogPostBodyWrapper({ className, children }) {
  const rootClassName = classNames(styles.root, className)

  return <div className={rootClassName}>{children}</div>
}

BlogPostBodyWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default BlogPostBodyWrapper

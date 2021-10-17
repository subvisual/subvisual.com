import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import * as styles from "./title.module.css"

const BlogTitle = ({ children, className }) => (
  <h1 className={classNames(styles.root, className)}>{children}</h1>
)

BlogTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default BlogTitle

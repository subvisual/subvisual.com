import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import classNames from "classnames"

import * as styles from "./cover.module.scss"

const renderFluidCover = ({ className, coverFile }) => {
  const {
    childImageSharp: { fluid },
  } = coverFile

  return <Img {...{ className, fluid }} />
}

const BlogPostHeaderCover = ({ className, cover, coverFile }) => {
  const rootClassName = classNames(styles.root, className)

  if (coverFile) {
    return renderFluidCover({ className: rootClassName, coverFile })
  }

  return (
    <div
      className={rootClassName}
      style={{ backgroundImage: `url(${cover})` }}
    />
  )
}

BlogPostHeaderCover.propTypes = {
  className: PropTypes.string,
  cover: PropTypes.string,
  coverFile: PropTypes.object,
}

export default BlogPostHeaderCover

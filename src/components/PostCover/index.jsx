import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"
import classNames from "classnames"

import * as styles from "./index.module.scss"

const renderFluidCover = ({ className, coverFile }) => (
  <GatsbyImage
    alt=""
    image={coverFile.childImageSharp.gatsbyImageData}
    className={className}
  />
)

function BlogPostHeaderCover({ className, cover, coverFile }) {
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
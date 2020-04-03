import React from "react"
import PropTypes from "prop-types"

import BodyWrapper from "./body_wrapper"

import "prismjs/themes/prism.css"
import styles from "./body.module.scss"

const PostBody = ({ html }) => (
  <BodyWrapper>
    {/* eslint-disable-next-line react/no-danger */}
    <div className={styles.root} dangerouslySetInnerHTML={{ __html: html }} />
  </BodyWrapper>
)

PostBody.propTypes = {
  html: PropTypes.string.isRequired,
}

export default PostBody

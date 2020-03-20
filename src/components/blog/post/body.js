import React from "react"
import PropTypes from "prop-types"

import BodyWrapper from "./body_wrapper"

import styles from "./body.module.scss"

const PostBody = ({ html }) => (
  <BodyWrapper>
    {/* eslint-disable react/no-danger */}
    <div className={styles.root} dangerouslySetInnerHTML={{ __html: html }} />
    {/* eslint-enable react/no-danger */}
  </BodyWrapper>
)

PostBody.propTypes = {
  html: PropTypes.string.isRequired,
}

export default PostBody

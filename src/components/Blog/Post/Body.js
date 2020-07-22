import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import useUserAgent from "src/utils/useUserAgent"
import { isChrome, isEdge, isMacOS, isSafari } from "src/utils/userAgentUtils"
import BodyWrapper from "./BodyWrapper"

import "prismjs/themes/prism.css"
import styles from "./Body.module.scss"

const PostBody = ({ html }) => {
  const userAgent = useUserAgent()
  const rootClassName = classNames(styles.root, {
    [styles.chrome]: isChrome(userAgent),
    [styles.edge]: isEdge(userAgent),
    [styles.macos]: isMacOS(userAgent),
    [styles.safari]: isSafari(userAgent),
  })

  return (
    <BodyWrapper>
      {/* eslint-disable react/no-danger */}
      <div
        className={rootClassName}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {/* eslint-enable react/no-danger */}
    </BodyWrapper>
  )
}

PostBody.propTypes = {
  html: PropTypes.string.isRequired,
}

export default PostBody

import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import useUserAgent from "~/src/utils/use_user_agent"
import {
  isChrome,
  isEdge,
  isMacOS,
  isSafari,
} from "~/src/utils/user_agent_utils"

import Wrapper from "./Wrapper"

import "prismjs/themes/prism.css"
import * as styles from "./index.module.scss"

function PostBody({ html, ...props }) {
  const userAgent = useUserAgent()
  const rootClassName = classNames(styles.root, {
    [styles.chrome]: isChrome(userAgent),
    [styles.edge]: isEdge(userAgent),
    [styles.macos]: isMacOS(userAgent),
    [styles.safari]: isSafari(userAgent),
  })

  return (
    <Wrapper {...props}>
      {/* eslint-disable react/no-danger */}
      <div
        className={rootClassName}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {/* eslint-enable react/no-danger */}
    </Wrapper>
  )
}

PostBody.propTypes = {
  html: PropTypes.string.isRequired,
}

export default PostBody

import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share"

import useDetectJavascript from "src/utils/use_detect_javascript"

import styles from "./share_links.module.scss"

const BlogPostShareLinks = ({ className, url }) => {
  const hasJavascript = useDetectJavascript()

  // react-share links do not work with JavaScript disabled
  if (!hasJavascript) return null

  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <div className={styles.content}>
        <div className={styles.title}>Share</div>
        <ul className={styles.links}>
          <li className={styles.link}>
            <FacebookShareButton url={url}>Fb</FacebookShareButton>
          </li>
          <li className={styles.link}>
            <LinkedinShareButton url={url}>In</LinkedinShareButton>
          </li>
          <li className={styles.link}>
            <TwitterShareButton url={url}>Tw</TwitterShareButton>
          </li>
        </ul>
      </div>
    </div>
  )
}

BlogPostShareLinks.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
}

export default BlogPostShareLinks

import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import * as styles from "./index.module.css"

function PageWideWrapper({ children, padded, alternative }) {
  const className = classNames(styles.root, {
    [styles.padded]: padded,
    [styles.alternative]: alternative,
  })

  return (
    <div className={className}>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

PageWideWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
  alternative: PropTypes.bool,
}

PageWideWrapper.defaultProps = {
  padded: false,
  alternative: false,
}

export default PageWideWrapper

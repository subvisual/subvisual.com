import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import * as styles from "./index.module.css"

function PageWideWrapper({ children, padded }) {
  const className = classNames(styles.root, {
    [styles.padded]: padded,
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
}

PageWideWrapper.defaultProps = {
  padded: false,
}

export default PageWideWrapper

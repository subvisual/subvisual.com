import React from "react"
import PropTypes from "prop-types"

import * as styles from "./call_to_action.module.scss"

const CallToAction = ({ color, children, size }) => {
  const className = [styles.root, styles[color], styles[size]].join(" ")

  return (
    <a href="mailto:contact@subvisual.com" className={className}>
      {children}
    </a>
  )
}

CallToAction.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

CallToAction.defaultProps = {
  color: "blue",
  size: "regular",
}

export default CallToAction

import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import classNames from "classnames"

import "./index.css"

const CallToAction = ({ children, white, large }) => {
  const className = classNames({
    CallToAction: true,
    "CallToAction--large": large,
    "CallToAction--white": white,
  })

  return (
    <Link to="#" className={className}>
      {children}
    </Link>
  )
}

CallToAction.propTypes = {
  large: PropTypes.bool,
  white: PropTypes.bool,
}

CallToAction.defaultProps = {
  large: false,
  white: false,
}

export default CallToAction

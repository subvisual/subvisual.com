import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"

import "./index.css"

const CallToAction = ({ children, white }) => {
  const className = classNames({
    CallToAction: true,
    "CallToAction--white": white,
  })

  return (
    <Link to="#" className={className}>
      {children}
    </Link>
  )
}

export default CallToAction

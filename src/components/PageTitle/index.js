import React from "react"
import classnames from "classnames"

import "./index.module.css"

const PageTitle = ({ children, withTitle }) => (
  <h1 styleName={classnames("root", { "with-title": withTitle })}>
    {children}
  </h1>
)

export default PageTitle
